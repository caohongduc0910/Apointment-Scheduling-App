import Discount from '../models/mysql/discounts.js'

export const createDiscount = async (discount) => {
    await Discount.create(discount)
}