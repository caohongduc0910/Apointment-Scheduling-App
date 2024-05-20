import Discount from '../models/mysql/discounts.js'
import User from '../models/mysql/users.js'

export const createDiscount = async (discount) => {
    await Discount.create(discount)
}


export const detailDiscount = async (uuid) => {
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