import type {
  AppointmentCreationType,
  AppointmentSearchType
} from './appointment-types.js';

export interface AppointmentRepository {
  create(
    appointment: AppointmentCreationType
  ): Promise<AppointmentCreationType>;

  findByStartTime(startTime: Date): Promise<AppointmentCreationType[]>;

  search(query: any): Promise<AppointmentSearchType>;
}
