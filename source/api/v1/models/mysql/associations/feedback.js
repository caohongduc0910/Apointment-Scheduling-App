import Feedback from "../feedbacks.js"
import User from "../users.js"

Feedback.belongsTo(User, {
    foreignKey: {
        name: 'client_id',
    },
    as: 'user'
})