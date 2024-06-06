import { createCategory, detailCategoryID, detailCategoryUUID } from "../repositories/category.repo.js"

export const create = async (req) => {
    const categoryName = req.body.category_name
    const adminID = req.user.id
    
    const newCategory = {
        category_name: categoryName,
        admin_id: adminID
    }

    await createCategory(newCategory)

    const answer = {
        status: 200,
        info: {
            msg: "Tạo danh mục thành công",
            category: newCategory
        }
    }
    return answer
}

export const detail = async (req) => {
    const categoryID = req.params.id

    const detail = await detailCategoryID(categoryID)

    const answer = {
        status: 200,
        info: {
            msg: "Lấy danh mục thành công",
            category: detail
        }
    }
    return answer
}

export const detailUUID = async (req) => {
    const categoryUUID = req.params.uuid

    const detail = await detailCategoryUUID(categoryUUID)

    const answer = {
        status: 200,
        info: {
            msg: "Lấy danh mục thành công",
            category: detail
        }
    }
    return answer
}