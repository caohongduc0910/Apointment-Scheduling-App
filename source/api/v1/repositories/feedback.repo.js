import Feedback from '../models/mysql/feedbacks.js'
import User from '../models/mysql/users.js'

export const createFeedback = async (feedback) => {
    await Feedback.create(feedback)
}


export const detailFeedbackUUID = async (uuid) => {
    const feedback = await Feedback.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['deleted_at'] },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['fullname', 'phone', 'email', 'address']
            }
        ]
    })

    return feedback
}


export const detailFeedbackID = async (id) => {
    const feedback = await Feedback.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['deleted_at'] },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['fullname', 'phone', 'email', 'address']
            }
        ]
    })

    return feedback
}