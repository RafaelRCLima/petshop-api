import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { CreateAppointmentService } from '../../../../src/app/services/index.js';
import type { AppointmentRepository } from '../../../../src/domain/appointment-repository.js';
import type {
  AppointmentCreationType,
  AppointmentCreationReqType
} from '../../../../src/domain/appointment-types.js';

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an appointment successfully with expected end time', async () => {
    const appointmentData: AppointmentCreationReqType = {
      animalType: 'DOG',
      description: 'Banho e tosa higienica',
      startTime: new Date('2026-04-14T10:00:00.000Z'),
      furIsTangled: false,
      furSize: 'MEDIUM',
      name: 'Rex',
      race: 'Labrador',
      size: 'LARGE'
    };

    const appointmentCreationData: AppointmentCreationType = {
      ...appointmentData,
      endTime: new Date('2026-04-14T11:00:00.000Z')
    };

    const mockResult = {
      ...appointmentData,
      endTime: new Date('2026-04-14T11:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID()
    };

    const repository: AppointmentRepository = {
      // like sinon.stub() for repository
      create: jest
        .fn<AppointmentRepository['create']>() // repository mock
        .mockResolvedValue(mockResult),
      findByStartTime: jest
        .fn<AppointmentRepository['findByStartTime']>()
        .mockResolvedValue([]) // simula que não há agendamento no mesmo horário
    };

    const createAppointmentService = CreateAppointmentService(repository);

    const result = await createAppointmentService(appointmentData);

    expect(repository.create).toHaveBeenCalledWith(appointmentCreationData);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResult);
  });
});
