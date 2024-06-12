import moment from 'moment'
import cron from 'node-cron'
import confirmEmail from '../../../helper/sendMail.js'

import {
    createAppointment,
    detailAppointment,
    deleteAppointment
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
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

    const task = cron.schedule('* * * * * *', async () => {
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
