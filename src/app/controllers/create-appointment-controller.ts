import { type Request, type Response } from 'express';
import { z } from 'zod';
import createAppointmentRepository from '../../domain/appointments.js';

import { CreateAppointmentService } from '../services/index.js';

const createAppointmentService = CreateAppointmentService(
  createAppointmentRepository
);

const createAppointmentSchema = z.object({
  animalType: z.string().trim().min(1),
  description: z.string().trim().min(1),
  furIsTangled: z.boolean(),
  furSize: z.string().trim().min(1),
  name: z.string().trim().min(1),
  race: z.string().trim().min(1),
  size: z.string().trim().min(1),
  startTime: z.coerce.date(),
  service: z.string().trim().min(1)
});

export default async (req: Request, res: Response) => {
  const parsedBody = createAppointmentSchema.safeParse(req.body); // esse safe

  if (!parsedBody.success) {
    return res.status(400).send({
      message: 'Validation failed',
      errors: parsedBody.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  await createAppointmentService(parsedBody.data);

  return res.status(201).send({
    message: 'The appointment was created successfully.',
    status: 201
  });
};
