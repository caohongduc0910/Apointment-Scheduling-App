import Appointment from '../models/mysql/appointments.js'


export const createAppointment = async (appointment) => {
    await Appointment.create(appointment)
}