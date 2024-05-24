import { createOrder, detailOrderUUID, detailOrderID, updateOrder, deleteOrderByUUID, getAllOrder } 
from "../repositories/order.repo.js"
import { detailAppointmentUUID, detailAppointmentID, updateAppointmentStatus,getAllAppointment } 
from "../repositories/appointment.repo.js"
import { detailServiceUUID } from '../repositories/service.repo.js'
import { deleteDiscountByUUID, getDiscountByCode } from "../repositories/discount.repo.js";
import { getUserByUUID, getUserDetailById } from '../repositories/user.repo.js'

import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SK}`);


export const create = async (req) => {

    const uuid = req.params.uuid
    const appointment = await detailAppointmentUUID(uuid)
    const client = await getUserDetailById(req.user.id)

    if (!appointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Cuộc hẹn không tồn tại",
            }
        }
        return answer
    }

    if(appointment.client_id != client.id) {
        const answer = {
            status: 400,
            info: {
                msg: "Không phải cuộc hẹn của mình",
            }
        }
        return answer
    }

    // nếu cuộc hẹn đã được thanh toán
    if (appointment.status_id >= 2) {
        const answer = {
            status: 400,
            info: {
                msg: "Cuộc hẹn đã được thanh toán",
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
            discount_id: req.body.discount_id || 0,
            payment_method_id: req.body.payment_method_id
        }
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
    if (!order) {
        const answer = {
            status: 400,
            info: {
                msg: "Đơn hàng không tồn tại",
            }
        }
        return answer
    }
    const appointment = await detailAppointmentID(order.appointment_id)

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
                msg: "Cuộc hẹn đã được thanh toán, không thể thanh toán",
            }
        }
        return answer
    }

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
                appointmentUUID: order.appointment.uuid,
                discountUUID: discountUUID
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


export const update = async (req) => {

    const uuid = req.params.uuid
    const existOrder = await detailOrderUUID(req.params.uuid)

    if (!existOrder) {
        const answer = {
            status: 400,
            info: {
                msg: "Đơn hàng không tồn tại",
            }
        }
        return answer
    }

    const appointment = await detailAppointmentID(existOrder.appointment_id)

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
                msg: "Cuộc hẹn đã được thanh toán, không thể cập nhật",
            }
        }
        return answer
    }

    let discount = null
    let order = null
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
        order = {
            amount: req.body.amount,
            discount_id: discount.id,
            payment_method_id: req.body.payment_method_id
        }
    }
    //nếu người dùng chọn mã giảm giá hoặc không chọn gì
    else {
        order = {
            amount: req.body.amount,
            discount_id: req.body.discount_id || 0,
            payment_method_id: req.body.payment_method_id
        }
    }


    await updateOrder(uuid, order)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật thành công, vui lòng thanh toán để hoàn tất dịch vụ",
            order: order
        }
    }
    return answer
}


export const deleteOrder = async (req) => {

    const uuid = req.params.uuid
    const existOrder = await detailOrderUUID(req.params.uuid)

    if (!existOrder) {
        const answer = {
            status: 400,
            info: {
                msg: "Đơn hàng không tồn tại",
            }
        }
        return answer
    }

    const appointment = await detailAppointmentID(existOrder.appointment_id)

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
                msg: "Cuộc hẹn đã được thanh toán, không thể xóa",
            }
        }
        return answer
    }

    await deleteOrderByUUID(uuid)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa đơn hàng thành công",
        }
    }
    return answer
}


export const listOrderClient = async (req) => {
    const userID = req.user.id
    let serviceID = null
    let arr = []
    let appointments = []

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }

    appointments = await getAllAppointment(serviceID, userID, null)

    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đơn hàng trống",
            }
        }
        return answer
    }

    for (const appointment of appointments) {
        const orders = await getAllOrderByClientID(userID, appointment.id)
        if(orders.length > 0){
            arr = [...arr, ...orders]
        }
    }

    const info = arr.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        orders: arr
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const listOrder = async (req) => {
    let serviceID = null
    let providerID = null
    let clientID = null
    let arr = []
    let appointments = []

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }

    if (req.query.client_uuid) {
        const client = await getUserByUUID(req.query.client_uuid)
        clientID = client.id
    }

    if (req.query.provider_id) {
        const provider = await getUserByUUID(req.query.provider_id)
        providerID = provider.id
    }

    appointments = await getAllAppointment(serviceID, clientID, providerID)

    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đơn hàng trống",
            }
        }
        return answer
    }

    for (const appointment of appointments) {
        const orders = await getAllOrder(appointment.id)
        if(orders.length > 0){
            arr = [...arr, ...orders]
        }
    }


    const info = arr.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        orders: arr
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const listOrderProvider = async (req) => {
    const userID = req.user.id
    let serviceID = null
    let arr = []
    let appointments = []

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }

    appointments = await getAllAppointment(serviceID, null, userID)

    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đơn hàng trống",
            }
        }
        return answer
    }

    for (const appointment of appointments) {
        const orders = await getAllOrder(appointment.id)
        if(orders.length > 0){
            arr = [...arr, ...orders]
        }
    }


    const info = arr.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        orders: arr
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}