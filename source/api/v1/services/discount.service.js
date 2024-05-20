import { 
    createDiscount, detailDiscount
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


export const detail = async (req) => {

    const discount = await detailDiscount(req.params.uuid)

    const answer = {
        status: 200,
        info: {
            msg: "Lấy mã giảm giá thành công",
            discount: discount
        }
    }
    return answer
}

