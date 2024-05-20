import {
    createDiscount, detailDiscountID, detailDiscountUUID, updateDiscount
} from "../repositories/discount.repo.js"

export const create = async (req) => {

    const newDiscount = {
        type: req.body.type,
        value: req.body.value,
        expiry: req.body.expiry,
        provider_id: req.user.id,
        code: req.body.code
    }

    await createDiscount(newDiscount)

    const answer = {
        status: 200,
        info: {
            msg: "Tạo mã giảm giá thành công",
            discount: newDiscount
        }
    }
    return answer
}


export const detail = async (data) => {

    let discount = null

    if (data.id) {
        discount = await detailDiscountID(data.id)
    }
    else {
        discount = await detailDiscountUUID(data.uuid)
    }

    if (discount) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết mã giảm giá thành công",
                discount: discount
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại mã giảm giá",
            }
        }
        return answer
    }
}


export const update = async (req) => {
    const discount = {
        type: req.body.type,
        value: req.body.value,
        expiry: req.body.expiry,
        code: req.body.code
    }

    await updateDiscount(discount, req.params.uuid)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật mã giảm giá thành công",
            discount: discount
        }
    }
    return answer
}