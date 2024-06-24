import moment from 'moment'
import cron from 'node-cron'
import confirmEmail from '../../../helper/sendMail.js'

import {
    createAppointment,
    detailAppointmentID,
    detailAppointmentUUID,
    updateAppointment,
    deleteAppointment,
    getAllAppointmentByClientID,
    getAllAppointmentByProviderID,
    getAllAppointment
} from "../repositories/appointment.repo.js"

import {
    detailServiceID, detailServiceUUID
} from "../repositories/service.repo.js"

import { getUserByID } from "../repositories/user.repo.js"


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

    const date = new Date(req.body.time)
    const endTime = moment(date).add(service.duration, 'minutes').toDate()
    const existAppointment = await detailAppointment(service.id, date, endTime)

    if (existAppointment) {
        const answer = {
            status: 400,
            info: {
                msg: "Đã có hẹn với dịch vụ",
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

    const appointment = await createAppointment(newAppointment)

    const now = new Date();
    const alarm = moment(now).add(15, 'minutes')

    const minute = alarm.minute()
    const hour = alarm.hour()
    const dayOfMonth = alarm.date()
    const month = alarm.month() + 1

    const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} *`

    const task = cron.schedule(cronExpression, async () => {
        if (appointment.status_id == 1) {
            await deleteAppointment(appointment.uuid)
            console.log("Appointment deleted")
            task.stop()
        }
    })

    const provider = await getUserByID(service.provider_id)

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
            appointment: appointment
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


export const getAllByClientID = async (req) => {

    let whereClause = {
        client_id: req.user.id
    }

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        whereClause.service_id = service.id
    }

    const arr = await getAllAppointmentByClientID(whereClause)

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

    let whereClause = {
        provider_id: req.user.id
    }

    if (req.query.service_uuid) {
        const service = await detailServiceUUID(req.query.service_uuid)
        whereClause.service_id = service.id
    }

    const arr = await getAllAppointmentByProviderID(whereClause)

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

    let whereClause = {}

    if (req.query.service_uuid) {
        const service = await detailServiceID(req.query.service_uuid)
        whereClause.service_id = service.id
    }

    if (req.query.client_uuid) {
        const client = await getUserByID(req.query.client_uuid)
        whereClause.client_id = client.id
    }

    if (req.query.provider_uuid) {
        const provider = await getUserByID(req.query.provider_uuid)
        whereClause.provider_id = provider.id
    }

    const arr = await getAllAppointment(whereClause)

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
