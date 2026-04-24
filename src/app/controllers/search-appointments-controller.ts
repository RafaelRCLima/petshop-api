import { type Request, type Response } from 'express';
import appointmentsRepository from '../../domain/appointments.js';
import { SearchAppointmentService } from '../services/index.js';

export default async (req: Request, res: Response) => {
  const searchAppointmentService = SearchAppointmentService(
    appointmentsRepository
  );

  const appointments = await searchAppointmentService(req.query);

  return res.status(200).send({
    message: 'Appointments retrieved successfully.',
    status: 200,
    data: appointments
  });
};
