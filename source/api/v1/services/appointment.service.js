import moment from "moment"

import {
    createAppointment,
    detailAppointmentID,
    detailAppointmentUUID,
    detailAppointment,
    updateAppointmentClient,
    updateAppointmentProvider,
    deleteAppointment,
    getAllAppointmentByClientID,
    getAllAppointmentByProviderID,
    getAllAppointment,
} from "../repositories/appointment.repo.js"
import { createNotification } from "../repositories/notification.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

import { getUserByUUID, getUserById } from "../repositories/user.repo.js"
import confirmEmail from '../../../helper/sendMail.js'

export const create = async (req) => {

    const uuid = req.params.uuid
    const service = await detailServiceUUID(uuid)

    const date = new Date(req.body.time)

    if (!service) {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại dịch vụ, đặt lịch thất bại",
            }
        }
        return answer
    }

    const newAppointment = {
        name: req.body.name,
        note: req.body.note,
        time: date,
        status_id: 1,
        service_id: service.id,
        method: req.body.method,
        client_id: req.user.id,
        provider_id: service.provider_id
    }


    const existAppointment = await detailAppointment(req.user.id, service.provider_id, service.id, date)
    
    if (existAppointment && existAppointment.status_id == 1 && moment(existAppointment.time).isSame(date)) {
        const answer = {
            status: 400,
            info: {
                msg: "Đã có hẹn với dịch vụ, vui lòng thanh toán trước khi đặt hẹn mới",
            }
        }
        return answer
    }

    await createAppointment(newAppointment)

    const appointment = await detailAppointment(req.user.id, service.provider_id, service.id, date)

    const newNotification = {
        url: `${process.env.BASE_URL}/appointment/detail/${appointment.uuid}`,
        is_read: 0,
        title: "Lịch hẹn mới",
        description: "Bạn có lịch hẹn mới",
        receiver_id: service.provider_id,
        notification_type_id: "1"
    }

    await createNotification(newNotification)

    _io.emit('notification', newNotification)

    const provider = await getUserById(service.provider_id)

    const subject = "Email thông báo lịch hẹn mới"
    let link = `${process.env.BASE_URL}/provider/appointment/detail/${appointment.uuid}`

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