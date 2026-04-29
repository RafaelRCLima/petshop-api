import db from '../lib/db.js';
import type { AppointmentRepository } from './appointment-repository.js';
import type {
  AppointmentCreationType,
  AppointmentSearchType
} from './appointment-types.js';

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

  async search(query: any): Promise<AppointmentSearchType> {
    const { rowsPerPage = 10, page = 1 } = query;

    const appointments = await db.service.findMany({
      take: rowsPerPage,
      skip: page * rowsPerPage,
      orderBy: {
        startTime: 'asc'
      }
    });

    const totalAppointments = await db.service.count();

    return { appointments, totalAppointments };
  }
};

export default appointmentRepository;
