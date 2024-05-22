import Order from "../orders.js"
import Appointment from "../appointments.js"
import Discount from "../discounts.js"
import Payment_method from "../payment_methods.js"

Order.belongsTo(Appointment, {
    foreignKey: {
        name: 'appointment_id',
    },
    as: 'appointment'
})

Order.belongsTo(Discount, {
    foreignKey: {
        name: 'discount_id',
    },
    as: 'discount'
})

Order.belongsTo(Payment_method, {
    foreignKey: {
        name: 'payment_method_id',
    },
    as: 'payment_method'
})

