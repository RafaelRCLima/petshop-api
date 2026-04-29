import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { CreateAppointmentService } from '../../../../src/app/services/index.js';
import type { AppointmentRepository } from '../../../../src/domain/appointment-repository.js';
import type {
  AppointmentCreationType,
  AppointmentCreationReqType
} from '../../../../src/domain/appointment-types.js';
import { addHours } from 'date-fns';

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an appointment successfully with expected end time', async () => {
    const appointmentData: AppointmentCreationReqType = {
      animalType: 'Cachorro',
      description: 'Banho e tosa higienica',
      startTime: new Date('2026-04-14T10:00:00.000Z'),
      furIsTangled: false,
      furSize: 'Médio',
      name: 'Rex',
      race: 'Labrador',
      size: 'Grande',
      service: 'Tosa higiênica'
    };

    const appointmentCreationData: AppointmentCreationType = {
      ...appointmentData,
      endTime: addHours(appointmentData.startTime, 1)
    };

    const mockResult = {
      ...appointmentCreationData,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID()
    };

    const repository: AppointmentRepository = {
      // like sinon.stub() for repository
      create: jest
        .fn<AppointmentRepository['create']>() // create mock
        .mockResolvedValue(mockResult),
      findByStartTime: jest
        .fn<AppointmentRepository['findByStartTime']>()
        .mockResolvedValue([]),
      search: jest.fn<AppointmentRepository['search']>()
    };

    const createAppointmentService = CreateAppointmentService(repository);

    const result = await createAppointmentService(appointmentData);

    expect(repository.create).toHaveBeenCalledWith(appointmentCreationData);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResult);
  });

  it('should throw an error if an appointment already exists at the same time', async () => {
    const appointmentData: AppointmentCreationReqType = {
      animalType: 'Gato',
      description: 'Tosa higiênica',
      startTime: new Date('2026-04-14T10:00:00.000Z'),
      furIsTangled: true,
      furSize: 'Curto',
      name: 'Whiskers',
      race: 'Labrador',
      size: 'Grande',
      service: 'Tosa higiênica'
    };

    const mockResult = {
      ...appointmentData,
      endTime: new Date('2026-04-14T11:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID()
    };

    const repository: AppointmentRepository = {
      create: jest.fn<AppointmentRepository['create']>(),
      findByStartTime: jest
        .fn<AppointmentRepository['findByStartTime']>()
        .mockResolvedValue([mockResult]),
      search: jest.fn<AppointmentRepository['search']>()
    };

    const createAppointmentService = CreateAppointmentService(repository);

    await expect(createAppointmentService(appointmentData)).rejects.toThrow(
      'The selected date and time are not available for booking.'
    );

    expect(repository.findByStartTime).toHaveBeenCalledWith(
      appointmentData.startTime
    );
    expect(repository.findByStartTime).toHaveBeenCalledTimes(1);
    expect(repository.create).not.toHaveBeenCalled();
  });
});
