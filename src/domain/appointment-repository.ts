import type { AppointmentCreation } from './appointment-types.js';

export interface AppointmentRepository {
  create(appointment: AppointmentCreation): Promise<AppointmentCreation>;
}
