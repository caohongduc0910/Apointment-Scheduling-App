import {
    createAppointment,
    getAppointmentByClientIDandServiceID,
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

import confirmEmail from '../../../helper/sendMail.js'
import { getUserDetailById } from "../repositories/user.repo.js"

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