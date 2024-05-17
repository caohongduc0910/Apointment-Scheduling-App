import { createCategory, 
    detailCategory, 
    updateCategory, 
    deleteCategory, 
    getListCategory 
} from "../repositories/category.repo.js"

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

    const detail = await detailCategory(categoryID)

    let answer = null

    if (detail) {
        answer = {
            status: 200,
            info: {
                msg: "Lấy danh mục thành công",
                category: detail
            }
        }
    }
    else {
        answer = {
            status: 200,
            info: {
                msg: "Không tồn tại danh mục",
            }
        }
    }

    return answer
}


export const update = async (req) => {
    const categoryID = req.params.id
    const categoryName = req.body.category_name

    await updateCategory(categoryID, categoryName)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật danh mục thành công",
            category: categoryName
        }
    }
    return answer
}


export const deleteCate = async (req) => {
    const categoryID = req.params.id

    await deleteCategory(categoryID)

    const answer = {
        status: 200,
        info: {
            msg: "Xóa danh mục thành công",
        }
    }
    return answer
}


export const getAll = async (req) => {
    const arr = await getListCategory()

    if(arr.length == 0) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách trống",
            }
        }
        return answer
    }
    else{
        const answer = {
            status: 200,
            info: {
                msg: "Lấy thành công danh sách danh mục",
                category: arr
            }
        }
        return answer
    }
}
