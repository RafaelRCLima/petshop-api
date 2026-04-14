import { type Request, type Response } from 'express';
import { z } from 'zod';
import createAppointmentService from '../services/create-appointment-service.js';
import {
  animalTypes,
  furSizes,
  petSizes
} from '../../domain/appointment-types.js';

const createAppointmentSchema = z
  .object({
    animalType: z.string().trim().toUpperCase().pipe(z.enum(animalTypes)),
    description: z.string().trim().min(1),
    endTime: z.coerce.date(),
    furIsTangled: z.boolean(),
    furSize: z.enum(furSizes),
    name: z.string().trim().min(1),
    race: z.string().trim().min(1),
    size: z.enum(petSizes),
    startTime: z.coerce.date()
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'endTime must be after startTime',
    path: ['endTime']
  });

export default async (req: Request, res: Response) => {
  const parsedBody = createAppointmentSchema.safeParse(req.body);

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

  return res.status(201).send({ message: 'Success', status: 201 });
};
