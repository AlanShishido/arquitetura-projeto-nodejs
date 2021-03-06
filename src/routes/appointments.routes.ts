import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from "../repositories/AppointmentsRepositoy";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const allAppointments = await appointmentsRepository.find()
    
    return response.json(allAppointments); 
});


appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date} = request.body;
        
        const parsedDate = parseISO(date)
        
        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
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