import {
    createOrder, detailOrderUUID, detailOrderID
} from "../repositories/order.repo.js"

import {
    detailAppointmentUUID, updateAppointmentStatus
} from "../repositories/appointment.repo.js"

import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SK}`);

export const create = async (req) => {

    const uuid = req.params.uuid
    const appointment = await detailAppointmentUUID(uuid)

    const newOrder = {
        amount: req.body.amount,
        client_id: req.user.id,
        appointment_id: appointment.id,
        discount_id: req.body.discount_id,
        payment_method_id: req.body.payment_method_id
    }

    await createOrder(newOrder)

    const answer = {
        status: 200,
        info: {
            msg: "Thành công, vui lòng thanh toán để hoàn tất dịch vụ",
            order: newOrder
        }
    }
    return answer
}


export const checkout = async (req) => {

    const order = await detailOrderUUID(req.params.uuid)

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
                orderUUID: order.appointment.uuid
            }
        })

        const answer = {
            status: 200,
            info: {
                msg: "Thanh toán thành công",
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
        console.log(`⚠️ Xác thực chữ ki thất bại`, err.message);
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
            await updateAppointmentStatus(sessionCompleted.metadata.orderUUID, 2)
            console.log(`Checkout Session was completed!`)
            break
        case 'payment_intent.canceled':
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


export const detail = async (data) => {

    let order = null

    if (data.id) {
        order = await detailOrderID(data.id)
    }
    else {
        order = await detailOrderUUID(data.uuid)
    }

    if (order) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết đơn hàng thành công",
                order: order
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại đơn hàng",
            }
        }
        return answer
    }
}