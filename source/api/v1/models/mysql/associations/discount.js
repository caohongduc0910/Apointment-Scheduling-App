import Discount from "../discounts.js"
import User from "../users.js"

Discount.belongsTo(User, {
    foreignKey: {
        name: 'provider_id',
    },
    as: 'provider'
})