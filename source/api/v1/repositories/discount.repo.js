import Discount from '../models/mysql/discounts.js'
import User from '../models/mysql/users.js'
import { Op } from 'sequelize'

export const createDiscount = async (discount) => {
    await Discount.create(discount)
}

export const detailDiscountID = async (id) => {
    const discount = await Discount.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: User,
            as: 'provider',
            attributes: ['fullname'],
        }
    })
    return discount
}


export const detailDiscountUUID = async (uuid) => {
    const discount = await Discount.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: User,
            as: 'provider',
            attributes: ['fullname'],
        }
    })
    return discount
}


export const getAllDiscountByProviderID = async (id) => {
    const discount = await Discount.findAll({
        where: {
            provider_id: id,
            expiry: {
                [Op.gt]: new Date()
            }
        },
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: User,
            as: 'provider',
            attributes: ['fullname'],
        }
    })
    return discount
}


export const getDiscountByCode = async (code) => {
    const discount = await Discount.findOne({
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'created_at', 'updated_at', 'deleted_at'] },
        where: {
            code: code,
            expiry: {
                [Op.gt]: new Date()
            }
        },
        include: {
            model: User,
            as: 'provider',
            attributes: ['fullname'],
        }
    })
    return discount
}


export const getAllDiscount = async (id) => {
    const discount = await Discount.findAll({
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'created_at', 'updated_at', 'deleted_at'] },
        where: {
            expiry: {
                [Op.gt]: new Date()
            }
        },
        include: {
            model: User,
            as: 'provider',
            attributes: ['fullname'],
        }
    })
    return discount
}


export const updateDiscount = async (discount, uuid) => {
    await Discount.update(discount, {
        where: {
            uuid: uuid
        }
    })
}


export const deleteDiscountByUUID = async (uuid) => {
    await Discount.destroy({
        where: {
            uuid: uuid,
        }
    })
}