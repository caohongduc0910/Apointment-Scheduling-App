import { createCategory } from "../repositories/category.repo.js"

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