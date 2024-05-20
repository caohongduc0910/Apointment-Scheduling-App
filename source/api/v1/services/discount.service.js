import {
    createDiscount, detailDiscountID, detailDiscountUUID, updateDiscount, deleteDiscountByUUID,
    getAllDiscountByProviderID, getAllDiscount
} from "../repositories/discount.repo.js"

import { getUserByUUID } from "../repositories/user.repo.js"

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


export const deleteDiscount = async (req) => {
    const discountUUID = req.params.uuid
    const providerId = req.user.id

    const discount = await detailDiscountUUID(discountUUID)

    if (discount.provider_id != providerId) {
        const answer = {
            status: 400,
            info: {
                msg: "Không có quyền xóa dịch vụ này",
            }
        }
        return answer
    }

    await deleteDiscountByUUID(discountUUID)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa dịch vụ thành công",
        }
    }
    return answer
}


export const myDiscount = async (req) => {

    const arr = await getAllDiscountByProviderID(req.user.id)

    if (arr.length > 0) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy danh sách mã giảm giá thành công",
                discount: arr
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Danh sách mã giảm giá trống",
            }
        }
        return answer
    }
}


export const listDiscount = async (req) => {
    let arr = []

    if (req.query.provider_uuid) {
        const provider = await getUserByUUID(req.query.provider_uuid)
        console.log(provider)
        arr = await getAllDiscountByProviderID(provider.id)
    }
    else if (req.query.provider_id) {
        arr = await getAllDiscountByProviderID(req.query.provider_id)
    }
    else {
        arr = await getAllDiscount()
    }

    if (arr.length > 0) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy danh sách mã giảm giá thành công",
                discount: arr
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Danh sách mã giảm giá trống",
            }
        }
        return answer
    }
}
