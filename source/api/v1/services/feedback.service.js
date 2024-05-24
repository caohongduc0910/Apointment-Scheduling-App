import { detailAppointmentUUID, getAllAppointment } from "../repositories/appointment.repo.js"
import {
    createFeedback, detailFeedbackID, detailFeedbackUUID, updateFeedback,
    deleteFeedbackByUUID, getFeedbackByAppointmentID, getAllFeedback
} from "../repositories/feedback.repo.js"
import { detailServiceUUID } from "../repositories/service.repo.js"
import { getUserByUUID } from "../repositories/user.repo.js"


export const create = async (req) => {

    const uuid = req.params.uuid
    const appointment = await detailAppointmentUUID(uuid)
    const existFeedback = await getFeedbackByAppointmentID(appointment.id)

    if (existFeedback) {
        const answer = {
            status: 400,
            info: {
                msg: "Không thể đánh giá 2 lần trong 1 lượt hẹn",
            }
        }
        return answer
    }

    if (!appointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại lịch hẹn",
            }
        }
        return answer
    }

    if (appointment.status_id != 4) {
        const answer = {
            status: 400,
            info: {
                msg: "Cuộc hẹn chưa hoàn tất, không thể đánh giá",
            }
        }
        return answer
    }

    if (appointment.client_id != req.user.id) {
        const answer = {
            status: 400,
            info: {
                msg: "Không thể đánh giá cuộc hẹn của người khác",
            }
        }
        return answer
    }

    if (!appointment.service) {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại dịch vụ",
            }
        }
        return answer
    }

    const newFeedback = {
        content: req.body.content,
        image_url: `http://localhost:3000/images/${req.file.filename}`,
        rating: req.body.rating,
        client_id: req.user.id,
        appointment_id: appointment.id
    }

    await createFeedback(newFeedback)

    const answer = {
        status: 200,
        info: {
            msg: "Đánh giá thành công",
            feedback: newFeedback
        }
    }
    return answer
}


export const detail = async (data) => {
    let feedback = null

    if (data.id) {
        feedback = await detailFeedbackID(data.id)
    }
    else {
        feedback = await detailFeedbackUUID(data.uuid)
    }

    if (feedback) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết đánh giá thành công",
                feedback: feedback
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại đánh giá",
            }
        }
        return answer
    }
}


export const update = async (req) => {

    const uuid = req.params.uuid
    const existFeedback = await detailFeedbackUUID(uuid)

    if (!existFeedback) {
        const answer = {
            status: 200,
            info: {
                msg: "Không tồn tại đánh giá",
            }
        }
        return answer
    }

    const feedback = {
        content: req.body.content,
        image_url: `http://localhost:3000/images/${req.file.filename}`,
        rating: req.body.rating,
    }

    await updateFeedback(uuid, feedback)

    const answer = {
        status: 200,
        info: {
            msg: "Sửa đánh giá thành công",
            feedback: feedback
        }
    }
    return answer
}


export const deleteFeedback = async (data) => {

    const uuid = data.uuid
    const existFeedback = await detailFeedbackUUID(uuid)

    if (!existFeedback) {
        const answer = {
            status: 200,
            info: {
                msg: "Không tồn tại đánh giá",
            }
        }
        return answer
    }

    await deleteFeedbackByUUID(uuid)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa đánh giá thành công",
        }
    }
    return answer
}


export const listFeedbackClient = async (req) => {
    let appointments = []
    let feedbacks = []
    let serviceID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        if (!service) {
            const answer = {
                status: 200,
                info: {
                    msg: "Không tồn tại dịch vụ",
                }
            }
            return answer
        }

        serviceID = service.id
    }

    appointments = await getAllAppointment(serviceID, req.user.id, null)
    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đánh giá trống",
            }
        }
        return answer
    }


    for (const appointment of appointments) {
        const feedback = await getFeedbackByAppointmentID(appointment.id)
        if (feedback) {
            feedbacks.push(feedback)
        }
    }

    const info = feedbacks.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        feedbacks: feedbacks
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const listFeedbackProvider = async (req) => {
    let appointments = []
    let feedbacks = []
    let serviceID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        if (!service) {
            const answer = {
                status: 200,
                info: {
                    msg: "Không tồn tại dịch vụ",
                }
            }
            return answer
        }

        serviceID = service.id
    }

    appointments = await getAllAppointment(serviceID, null, req.user.id)
    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đánh giá trống",
            }
        }
        return answer
    }


    for (const appointment of appointments) {
        const feedback = await getFeedbackByAppointmentID(appointment.id)
        if (feedback) {
            feedbacks.push(feedback)
        }
    }

    const info = feedbacks.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        feedbacks: feedbacks
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const listFeedbackAdmin = async (req) => {

    if(!req.query.client_uuid && !req.query.service_uuid) {
        const arr = getAllFeedback()
    }

    let appointments = []
    let feedbacks = []
    let serviceID = null
    let clientID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        if (!service) {
            const answer = {
                status: 200,
                info: {
                    msg: "Không tồn tại dịch vụ",
                }
            }
            return answer
        }

        serviceID = service.id
    }

    if (req.query.client_uuid) {
        const client = await getUserByUUID(req.query.client_uuid)
        if (!client) {
            const answer = {
                status: 200,
                info: {
                    msg: "Không tồn tại người dùng",
                }
            }
            return answer
        }

        clientID = client.id
    }

    appointments = await getAllAppointment(serviceID, clientID, null)
    if (appointments.length < 1) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách đánh giá trống",
            }
        }
        return answer
    }


    for (const appointment of appointments) {
        const feedback = await getFeedbackByAppointmentID(appointment.id)
        if (feedback) {
            feedbacks.push(feedback)
        }
    }

    const info = feedbacks.length > 0 ? {
        msg: "Lấy danh sách đơn hàng thành công",
        feedbacks: feedbacks
    } : {
        msg: "Danh sách đơn hàng trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}

