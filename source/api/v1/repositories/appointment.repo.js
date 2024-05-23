import Appointment from '../models/mysql/appointments.js'


export const createAppointment = async (appointment) => {
    await Appointment.create(appointment)
}


export const getAppointmentByClientIDandServiceID = async (clID, svID) => {
    const appointment = await Appointment.findOne({
        where: {
            client_id: clID,
            service_id: svID
        }
    })
    return appointment
}