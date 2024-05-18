import { createService, detailServiceID, detailServiceUUID } from '../repositories/service.repo.js'

export const create = async (req) => {
    const newService = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: `http://localhost:3000/images/${req.file.filename}`,
        provider_id: req.user.id,
        category_id: req.body.category_id,
    }

    await createService(newService)

    const answer = {
        status: 200,
        info: {
            msg: "Tạo mới dịch vụ thành công",
            service: newService
        }
    }
    return answer
}


export const detail = async (data) => {

    let service = null

    if (data.id) {
        service = await detailServiceID(data.id)
    }
    else {
        service = await detailServiceUUID(data.uuid)
    }

    if (service) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết dịch vụ thành công",
                service: service
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại dịch vụ",
            }
        }
        return answer
    }

}