import {
    createAppointment,
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