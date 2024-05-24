import Feedback from '../models/mysql/feedbacks.js'

export const createFeedback = async (feedback) => {
    await Feedback.create(feedback)
}


export const getFeedbackByAppointmentID = async (id) => {
    const feedback = await Feedback.findOne({
        where: {
            appointment_id: id
        },
    })
    return feedback
}
