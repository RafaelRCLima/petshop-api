import db from '../lib/db.js';
import type { AppointmentRepository } from './appointment-repository.js';
import type { AppointmentCreationType } from './appointment-types.js';

const appointmentRepository: AppointmentRepository = {
  async create(
    appointment: AppointmentCreationType
  ): Promise<AppointmentCreationType> {
    const {
      animalType,
      description,
      endTime,
      furIsTangled,
      furSize,
      name,
      race,
      size,
      service,
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
        service,
        startTime,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    });

    return result;
  },

  async findByStartTime(startTime: Date): Promise<AppointmentCreationType[]> {
    const result = await db.service.findMany({
      where: {
        startTime
      }
    });
    return result;
  },

  async search(query: any): Promise<AppointmentCreationType[]> {
    const { rowsPerPage = 10 } = query;

    const result = await db.service.findMany({
      take: rowsPerPage
    });
    return result;
  }
};

export default appointmentRepository;
