import {
    createAppointment, 
    detailAppointmentID, 
    detailAppointmentUUID, 
    updateAppointment,
    deleteAppointment,
    getAppointmentByClientIDandServiceID,
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

import { getUserDetailById } from "../repositories/user.repo.js"

import confirmEmail from '../../../helper/sendMail.js'

export const create = async (req) => {

    const uuid = req.params.uuid
    const service = await detailServiceUUID(uuid)

    if (!service) {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại dịch vụ, đặt lịch thất bại",
            }
        }
        return answer
    }


    const appointment = await getAppointmentByClientIDandServiceID(req.user.id, service.id)
    if (appointment && appointment.status_id == 1 && appointment.time == req.body.time) {
        const answer = {
            status: 400,
            info: {
                msg: "Đã có hẹn với dịch vụ, vui lòng thanh toán trước khi đặt hẹn mới",
            }
        }
        return answer
    }

    const newAppointment = {
        name: req.body.name,
        note: req.body.note,
        time: req.body.time,
        status_id: 1,
        service_id: service.id,
        method: req.body.method,
        client_id: req.user.id,
        provider_id: service.provider_id
    }

    await createAppointment(newAppointment)

    const provider = await getUserDetailById(service.provider_id)

    const subject = "Email thông báo lịch hẹn mới"
    let link = `http://localhost:3000/api/v1/provider/appointment/detail/${appointment.uuid}`

    const html = `
    <h3> Bạn có một lịch hẹn mới: ${req.body.name}, vui lòng nhấn vào nút bên dưới để xem chi tiết </h3>
    <a href=${link}>Chi tiết</a>
    `
    confirmEmail(provider.email, subject, html)

    const answer = {
        status: 200,
        info: {
            msg: "Đặt lịch thành công, vui lòng thanh toán",
            appoitment: createAppointment
        }
    }
    return answer
}


export const detail = async (data) => {

    let appointment = null

    if (data.id) {
        appointment = await detailAppointmentID(data.id)
    }
    else {
        appointment = await detailAppointmentUUID(data.uuid)
    }

    if (appointment) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết lịch hẹn thành công",
                appointment: appointment
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại lịch hẹn",
            }
        }
        return answer
    }
}


export const updateClient = async (req) => {

    const existAppointment = await detailAppointmentUUID(req.params.uuid)

    if (!existAppointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Lịch hẹn không tồn tại",
            }
        }
        return answer
    }

    const data = {
        name: req.body.name,
        note: req.body.note,
        time: req.body.time,
        method: req.body.method
    }

    await updateAppointment(req.params.uuid, data)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật lịch thành công",
        }
    }
    return answer
}


export const updateProvider = async (req) => {

    let data = {
        status: 1
    }

    const existAppointment = await detailAppointmentUUID(req.params.uuid)

    if (!existAppointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Lịch hẹn không tồn tại",
            }
        }
        return answer
    }

    if (existAppointment.method) {
        data.url = req.body.url
    }

    await updateAppointment(req.params.uuid, data)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật lịch thành công",
            data: data
        }
    }
    return answer
}


export const deleteApp = async (uuid) => {

    await deleteAppointment(uuid)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa lịch hẹn thành công",
        }
    }
    return answer
}
