import { detailAppointmentUUID } from "../repositories/appointment.repo.js"
import {
    createFeedback,
} from "../repositories/feedback.repo.js"

export const create = async (req) => {

    const uuid = req.params.uuid
    const appointment = await detailAppointmentUUID(uuid)

    if (!appointment) {
        const answer = {
            status: 200,
            info: {
                msg: "Không tồn tại lịch hẹn",
            }
        }
        return answer
    }

    if (appointment.status_id !=4) {
        const answer = {
            status: 200,
            info: {
                msg: "Cuộc hẹn chưa hoàn tất, không thể đánh giá",
            }
        }
        return answer
    }

    if (!appointment.service) {
        const answer = {
            status: 200,
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