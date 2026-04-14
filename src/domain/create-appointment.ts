import db from '../lib/db.js';
import type { AppointmentCreation } from './appointment-types.js';

export default async (service: AppointmentCreation) => {
  const {
    animalType,
    description,
    endTime,
    furIsTangled,
    furSize,
    name,
    race,
    size,
    startTime
  } = service;

  return await db.service.create({
    data: {
      animalType,
      description,
      endTime,
      furIsTangled,
      furSize,
      name,
      race,
      size,
      startTime,
      updatedAt: new Date(),
      createdAt: new Date()
    }
  });
};
