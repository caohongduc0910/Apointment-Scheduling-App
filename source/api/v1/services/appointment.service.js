import {
    createAppointment, detailAppointmentID, detailAppointmentUUID, updateAppointmentClient, updateAppointmentProvider
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

export const create = async (req) => {

    const uuid = req.params.uuid
    const service = await detailServiceUUID(uuid)

    const newAppointment = {
        name: req.body.name,
        note: req.body.note,
        time: req.body.time,
        status_id: 3,
        service_id: service.id,
        method: req.body.method,
        client_id: req.user.id,
        provider_id: service.provider_id
    }

    await createAppointment(newAppointment)

    const answer = {
        status: 200,
        info: {
            msg: "Đặt lịch thành công, chờ xác nhận từ người bán",
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

    const name = req.body.name 
    const note = req.body.note 
    const time = req.body.time 
    const method = req.body.method

    await updateAppointmentClient(req.params.uuid, name, note, time, method)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật lịch thành công",
        }
    }
    return answer
}


export const updateProvider = async (req) => {

    const status = 4
    let url = null
    const appointment = await detailAppointmentUUID(req.params.uuid)

    const method = appointment.method

    if(method) {
        url = req.body.url 
    }

    await updateAppointmentProvider(req.params.uuid, status, url)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật lịch thành công",
        }
    }
    return answer
}