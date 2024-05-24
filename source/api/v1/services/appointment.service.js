import {
    createAppointment,
    detailAppointmentID,
    detailAppointmentUUID,
    updateAppointmentClient,
    updateAppointmentProvider,
    deleteAppointment,
    getAllAppointmentByClientID,
    getAllAppointmentByProviderID,
    getAllAppointment
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

import { getUserByUUID } from "../repositories/user.repo.js"

export const create = async (req) => {

    const uuid = req.params.uuid
    const service = await detailServiceUUID(uuid)

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

    const status = req.body.status
    let url = null
    const appointment = await detailAppointmentUUID(req.params.uuid)

    const method = appointment.method

    if (method) {
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


export const getAllByClientID = async (req) => {

    const userID = req.user.id
    let serviceID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }

    const arr = await getAllAppointmentByClientID(userID, serviceID)

    const info = arr.length > 0 ? {
        msg: "Lấy danh sách lịch hẹn thành công",
        appointments: arr
    } : {
        msg: "Danh sách lịch hẹn trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const getAllByProviderID = async (req) => {

    const userID = req.user.id
    let serviceID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }
    console.log(serviceID)
    const arr = await getAllAppointmentByProviderID(userID, serviceID)

    const info = arr.length > 0 ? {
        msg: "Lấy danh sách lịch hẹn thành công",
        appointments: arr
    } : {
        msg: "Danh sách lịch hẹn trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}


export const getAll = async (req) => {

    let serviceID = null
    let clientID = null
    let providerID = null

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        serviceID = service.id
    }

    if (req.query.client_uuid) {
        const client = await getUserByUUID(req.query.client_uuid)
        clientID = client.id
    }

    if (req.query.provider_uuid) {
        const provider = await getUserByUUID(req.query.provider_uuid)
        providerID = provider.id
    }

    const arr = await getAllAppointment(serviceID, clientID, providerID)

    const info = arr.length > 0 ? {
        msg: "Lấy danh sách lịch hẹn thành công",
        appointments: arr
    } : {
        msg: "Danh sách lịch hẹn trống",
    }

    const answer = {
        status: 200,
        info: info
    }
    return answer
}