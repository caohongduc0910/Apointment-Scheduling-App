import cron from 'node-cron'
import Stripe from 'stripe'
const stripe = new Stripe(`${process.env.STRIPE_SK}`)

import { createOrder, detailOrderUUID, deleteOrderByUUID, getOrderByAppointmentID } from "../repositories/order.repo.js"

import { detailAppointmentUUID, updateAppointmentStatus } from "../repositories/appointment.repo.js"

import { deleteDiscountByUUID, getDiscountByCode } from "../repositories/discount.repo.js";


export const create = async (req) => {

    const uuid = req.params.uuid
    const appointment = await detailAppointmentUUID(uuid)

    if (!appointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Cuộc hẹn không tồn tại",
            }
        }
        return answer
    }
    // nếu cuộc hẹn đã được thanh toán
    if (appointment.status_id >= 2) {
        const answer = {
            status: 400,
            info: {
                msg: "Đơn hàng không hợp lệ",
            }
        }
        return answer
    }

    let discount = null
    let newOrder = null
    // nếu người dùng nhập code giảm giá
    if (req.body.discount_code) {
        discount = await getDiscountByCode(req.body.discount_code)

        if (discount == null || discount.provider_id != appointment.provider_id) {
            const answer = {
                status: 400,
                info: {
                    msg: "Mã giảm giá không đúng",
                }
            }
            return answer
        }
        newOrder = {
            amount: req.body.amount,
            client_id: req.user.id,
            appointment_id: appointment.id,
            discount_id: discount.id,
            payment_method_id: req.body.payment_method_id
        }
    }
    //nếu người dùng chọn mã giảm giá hoặc không chọn gì
    else {
        newOrder = {
            amount: req.body.amount,
            client_id: req.user.id,
            appointment_id: appointment.id,
            discount_id: req.body.discount_id || null,
            payment_method_id: req.body.payment_method_id
        }
    }

    const existOrder = await getOrderByAppointmentID(appointment.id)
    if (existOrder) {
        const answer = {
            status: 200,
            info: {
                msg: "Đơn hàng đã tồn tại. Vui lòng thanh toán!",
            }
        }
        return answer
    }
    const temp = await createOrder(newOrder)
    const order = await detailOrderUUID(temp.uuid)

    const task = cron.schedule('*/15 * * * *', async () => {
        if (appointment.status_id == 1) {
            await deleteOrderByUUID(order.uuid)
            console.log("Order deleted")
            task.stop()
        }
    })

    let discountUUID = null

    if (order.discount) {
        if (order.discount.type == 0) {
            order.appointment.service.price -= order.discount.value
        }
        else {
            order.appointment.service.price -= order.appointment.service.price * order.discount.value / 100
        }
        discountUUID = order.discount.uuid
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: order.appointment.service.name,
                        description: order.appointment.service.description,
                        images: [`${order.appointment.service.image}`],
                    },
                    unit_amount: order.appointment.service.price,
                },
                quantity: order.amount,
            }],
            success_url: `http://localhost:3000/success.html`,
            cancel_url: `http://localhost:3000/cancel.html`,
            metadata: {
                appointmentUUID: uuid,
                discountUUID: discountUUID
            }
        })

        const answer = {
            status: 200,
            info: {
                msg: "Thành công, vui lòng thanh toán để hoàn tất dịch vụ",
                order: newOrder,
                stripe_link: session.url
            }
        }
        return answer
    }
    catch (error) {
        console.log(error)
        const answer = {
            status: 400,
            info: {
                msg: "Thanh toán thất bại",
            }
        }
        return answer
    }
}


export const handleWebhook = async (req) => {

    let event = req.body
    const signature = req.headers['stripe-signature']
    try {
        event = stripe.webhooks.constructEvent(
            event,
            signature,
            process.env.WEBHOOK_SC
        );
    } catch (err) {
        console.log(`⚠️ Xác thực chữ kí thất bại`, err.message);
        const answer = {
            status: 400,
            info: {
                msg: "Webhook thất bại",
            }
        }
        return answer
    }

    // Xử lý sự kiện
    switch (event.type) {
        case 'checkout.session.completed':
            const sessionCompleted = event.data.object;
            await updateAppointmentStatus(sessionCompleted.metadata.appointmentUUID, 2)
            await deleteDiscountByUUID(sessionCompleted.metadata.discountUUID)
            console.log(`Checkout Session was completed!`)
            break
        case 'payment_intent.canceled':
            await updateAppointmentStatus(sessionCompleted.metadata.appointmentUUID, 5)
            console.log(`PaymentIntent was canceled!`)
            break
        case 'payment_intent.payment_failed':
            console.log(`PaymentIntent was failed!`)
            break
        case 'payment_intent.succeeded':
            console.log(`PaymentIntent was successful!`)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    const answer = {
        status: 200,
        info: {
            msg: "Webhook thành công",
        }
    }
    return answer
}