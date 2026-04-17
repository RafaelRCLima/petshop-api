import type { AppointmentCreationType } from './appointment-types.js';

export interface AppointmentRepository {
  create(
    appointment: AppointmentCreationType
  ): Promise<AppointmentCreationType>;

  findByStartTime(startTime: Date): Promise<AppointmentCreationType[]>;
}
