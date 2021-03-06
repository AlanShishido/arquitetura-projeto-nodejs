import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm'

import Appointments from "../models/Appointments";
import AppointmentsRepository from "../repositories/AppointmentsRepositoy";

interface Request {
    provider: string,
    date: Date,
}

class CreateAppointmentService{
    public async execute({provider, date}:Request): Promise<Appointments>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate){
            throw Error('This appointment is already booked')
        }
        
        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;