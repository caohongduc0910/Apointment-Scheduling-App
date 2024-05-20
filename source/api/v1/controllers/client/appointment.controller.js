import { create, 
    detail, 
    updateClient, 
    deleteApp, 
    getAllByClientID, 
} from '../../services/appointment.service.js'

export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo cuộc hẹn"
        })
    }
}


export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem cuộc hẹn",
        })
    }
}


export const updateAct = async (req, res) => {
    try {
        const msg = await updateClient(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi cập nhật cuộc hẹn",
        })
    }
}

export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteApp(req.params.uuid)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xóa cuộc hẹn",
        })
    }
} 


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAllByClientID(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách cuộc hẹn",
        })
    }
} 
