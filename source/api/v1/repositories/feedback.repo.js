import Feedback from '../models/mysql/feedbacks.js'

export const createFeedback = async (feedback) => {
    await Feedback.create(feedback)
}