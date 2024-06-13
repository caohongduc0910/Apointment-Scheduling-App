import {
    createService,
    detailServiceID,
    detailServiceUUID,
    updateService,
    deleteServiceByUUID,
    getAllService
} from '../repositories/service.repo.js'

import { getUserByUUID, getUserByID } from '../repositories/user.repo.js'

export const create = async (req) => {
    const newService = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        duration: req.body.duration,
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

export const update = async (req) => {

    let service = req.body.image ? {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        category_id: req.body.category_id,
        status: req.body.status
    } : {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        status: req.body.status
    }

    await updateService(req.params.uuid, service)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật dịch vụ thành công",
            service: service
        }
    }
    return answer
}


export const deleteService = async (req) => {
    const serviceUUID = req.params.uuid
    const providerId = req.user.id

    const service = await detailServiceUUID(serviceUUID)

    if (service.provider_id != providerId) {
        const answer = {
            status: 400,
            info: {
                msg: "Không có quyền xóa dịch vụ này",
            }
        }
        return answer
    }

    await deleteServiceByUUID(serviceUUID)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa dịch vụ thành công",
        }
    }
    return answer
}


export const listService = async (req) => {
    let arr = []

    if (req.query.uuid) {
        const provider = await getUserByUUID(req.query.uuid)
        const id = provider.id

        const user = await getUserByID(req.user.id)

        if (user.role_id == 2 && user.id != id) {
            const answer = {
                status: 401,
                info: {
                    msg: "Không có quyền thực hiện",
                }
            }
            return answer
        }

        arr = await getAllService(id)
    }
    else if (req.query.category_id) {
        arr = await getAllService(req.query.category_id)
    }
    else if (req.query.provider_uuid) {
        const provider = await getUserByUUID(req.query.provider_uuid)
        arr = provider.services
    }
    else if (req.query.provider_id) {
        const provider = await getUserByID(req.query.provider_id)
        arr = provider.services
    }
    else {
        arr = await getAllService(0)
    }

    if (arr.length > 0) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy danh sách dịch vụ thành công",
                service: arr
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Danh sách dịch vụ trống",
            }
        }
        return answer
    }
}