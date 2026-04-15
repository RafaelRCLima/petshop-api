import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { CreateAppointmentService } from '../../../../src/app/services/index.js';
import type { AppointmentRepository } from '../../../../src/domain/appointment-repository.js';
import type { AppointmentCreation } from '../../../../src/domain/appointment-types.js';

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an appointment successfully', async () => {
    const appointmentData: AppointmentCreation = {
      animalType: 'DOG',
      description: 'Banho e tosa higienica',
      startTime: new Date('2026-04-14T10:00:00.000Z'),
      endTime: new Date('2026-04-14T11:00:00.000Z'),
      furIsTangled: false,
      furSize: 'MEDIUM',
      name: 'Rex',
      race: 'Labrador',
      size: 'LARGE'
    };

    const mockResult = {
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID()
    };

    const repository: AppointmentRepository = {
      // like sinon.stub() for repository
      create: jest
        .fn<AppointmentRepository['create']>() // repository mock
        .mockResolvedValue(mockResult)
    };

    const createAppointmentService = CreateAppointmentService(repository);

    const result = await createAppointmentService(appointmentData);

    expect(repository.create).toHaveBeenCalledWith(appointmentData);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResult);
  });
});
