import { type Request, type Response } from 'express';
import { z } from 'zod';
import createAppointmentRepository from '../../domain/create-appointment.js';
import {
  animalTypes,
  furSizes,
  petSizes
} from '../../domain/appointment-types.js';
import { CreateAppointmentService } from '../services/index.js';

const createAppointmentService = CreateAppointmentService(
  createAppointmentRepository
);

const createAppointmentSchema = z.object({
  animalType: z.string().trim().pipe(z.enum(animalTypes)),
  description: z.string().trim().min(1),
  furIsTangled: z.boolean(),
  furSize: z.enum(furSizes),
  name: z.string().trim().min(1),
  race: z.string().trim().min(1),
  size: z.enum(petSizes),
  startTime: z.coerce.date()
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
