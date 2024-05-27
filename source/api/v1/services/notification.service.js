import {
    detailNotificationID, detailNotificationUUID
} from "../repositories/notification.repo.js"

export const detail = async (data) => {

    let notification = null

    if (data.id) {
        notification = await detailNotificationID(data.id)
    }
    else {
        notification = await detailNotificationUUID(data.uuid)
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
