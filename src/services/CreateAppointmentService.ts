import { startOfHour } from "date-fns";
import Appointments from "../models/Appointments";
import AppointmentsRepository from "../repositories/AppointmentsRepositoy";

interface Request {
    provider: string,
    date: Date,
}

class CreateAppointmentService{
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}:Request): Appointments{
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate){
            throw Error('This appointment is already booked')
        }
        
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        })
        return appointment;
    }
}

export default CreateAppointmentService;