import {
    createAppointment,
    getAppointmentByClientIDandServiceID,
} from "../repositories/appointment.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

export const create = async (req) => {

    const uuid = req.params.uuid
    const service = await detailServiceUUID(uuid)

    if(!service) {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại dịch vụ, đặt lịch thất bại",
            }
        }
        return answer
    }
    

    const appointment = await getAppointmentByClientIDandServiceID(req.user.id, service.id)
    if(appointment && appointment.status_id == 1 && appointment.time == req.body.time) {
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

    const answer = {
        status: 200,
        info: {
            msg: "Đặt lịch thành công, vui lòng thanh toán",
            appoitment: createAppointment
        }
    }
    return answer
}