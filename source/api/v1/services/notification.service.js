import {
    detailNotificationID, detailNotificationUUID, deleteNotificationByID, deleteNotificationByUUID
} from "../repositories/notification.repo.js"

export const detail = async (data) => {

    let notification = null

    if (data.id) {
        notification = await detailNotificationID(data.id)
    }
    else {
        notification = await detailNotificationUUID(data.uuid)
    }

    if (notification.receiver_id != req.user.id) {
        const answer = {
            status: 200,
            info: {
                msg: "Không có quyền đọc thông báo này",
            }
        }
        return answer
    }

    if (notification) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy chi tiết thông báo thành công",
                notification: notification
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Không tồn tại thông báo",
            }
        }
        return answer
    }
}



export const deleteNotification = async (data) => {

    if (data.id) {
        deleteNotificationByID(data.id)
    }
    else {
        deleteNotificationByUUID(data.uuid)
    }

    const answer = {
        status: 200,
        info: {
            msg: "Xóa thông báo thành công",
        }
    }
    return answer
}