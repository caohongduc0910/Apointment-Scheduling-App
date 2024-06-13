import Appointment from '../models/mysql/appointments.js'
import Order from '../models/mysql/orders.js'
import Discount from '../models/mysql/discounts.js'
import Payment_method from '../models/mysql/payment_methods.js'
import Service from '../models/mysql/services.js'

export const createOrder = async (order) => {
    return await Order.create(order)
}


export const detailOrderUUID = async (uuid) => {
    const order = await Order.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Appointment,
                as: 'appointment',
                attributes: { exclude: ['id', 'created_at', 'updated_at', 'deleted_at'] },
                include: {
                    model: Service,
                    as: 'service',
                    attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
                }
            }, {
                model: Discount,
                as: 'discount',
                attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Payment_method,
                as: 'payment_method',
                attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return order
}


export const detailOrderID = async (uuid) => {
    const order = await Order.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Appointment,
                as: 'appointment',
                attributes: { exclude: ['id', 'created_at', 'updated_at', 'deleted_at'] },
                include: {
                    model: Service,
                    as: 'service',
                    attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
                }
            }, {
                model: Discount,
                as: 'discount',
                attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Payment_method,
                as: 'payment_method',
                attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return order
}


export const updateOrder = async (uuid, data) => {
    await Order.update(data, {
        where: {
            uuid: uuid
        }
    })
}


export const deleteOrderByUUID = async (uuid) => {
    await Order.destroy({
        where: {
            uuid: uuid
        }
    })
}


export const getAllOrder = async (appID) => {
    const order = await Order.findAll({
        where: {
            appointment_id: appID
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Appointment,
                as: 'appointment',
                attributes: { exclude: ['id', 'created_at', 'updated_at', 'deleted_at'] },
                include: {
                    model: Service,
                    as: 'service',
                    attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
                }
            }, {
                model: Discount,
                as: 'discount',
                attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Payment_method,
                as: 'payment_method',
                attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return order
}