import db from '../lib/db.js';
import type { AppointmentRepository } from './appointment-repository.js';
import type { AppointmentCreation } from './appointment-types.js';

const createAppointmentRepository: AppointmentRepository = {
  async create(appointment: AppointmentCreation): Promise<any> {
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
    } = appointment;

    const result = await db.service.create({
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

    return result;
  }
};

export default createAppointmentRepository;
