import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepositoy";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const allAppointments = appointmentsRepository.all()
    return response.json(allAppointments);
});


appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date} = request.body;
    
        const parsedDate = parseISO(date)
        
        const createAppointment = new CreateAppointmentService(appointmentsRepository)
        const appointment = createAppointment.execute({
            provider,
            date: parsedDate
        })

    
        return response.json(appointment)
    } 
    catch (e: any){ 
        return response.status(400).json({error: e.message})
    }
});

export default appointmentsRouter;  