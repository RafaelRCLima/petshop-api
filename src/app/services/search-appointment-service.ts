import type { AppointmentRepository } from '../../domain/appointment-repository.js';
import logger from '../../lib/logger.js';

export default (repository: AppointmentRepository) => async (query: any) => {
  logger.info('Searching for appointments...');

  const appointments = await repository.search(query);

  logger.info(`Found ${appointments.length} appointments.`);

  return appointments;
};
