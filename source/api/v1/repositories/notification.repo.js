import Notification from '../models/mysql/notifications.js'


export const createNotification = async (notification) => {
    await Notification.create(notification)
}


export const detailNotificationUUID = async (uuid) => {
    const notification = await Notification.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    })

    return notification
}


export const detailNotificationID = async (id) => {
    const notification = await Notification.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    })
    return notification
}


export const deleteNotificationByID = async (id) => {
    await Notification.destroy({
        where: {
            id: id
        }
    })
}


export const deleteNotificationByUUID = async (uuid) => {
    await Notification.destroy({
        where: {
            uuid: uuid
        }
    })
}