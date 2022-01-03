import { isEqual } from 'date-fns'
import Appointments from "../models/Appointments";

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository{
    private appointments: Appointments[];
    
    constructor(){
        this.appointments = []
    }

    public all(): Appointments[] {
        return this.appointments;
    }

    public create({provider, date}: CreateAppointmentDTO): Appointments {
        const appointment  = new Appointments({provider, date});
        this.appointments.push(appointment);
        return appointment;
    }

    public findByDate(date: Date): Appointments|null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date) )
        return findAppointment || null
    }
}

export	default AppointmentsRepository