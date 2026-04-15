import type { AppointmentRepository } from '../../domain/appointment-repository.js';
import type { AppointmentCreation } from '../../domain/appointment-types.js';
import logger from '../../lib/logger.js';

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default (repository: AppointmentRepository) =>
  async (appointment: AppointmentCreation) => {
    logger.info(
      `Creating appointment with data: ${JSON.stringify({
        animalType: appointment.animalType,
        description: appointment.description,
        endTime: formatDate(appointment.endTime),
        furIsTangled: appointment.furIsTangled,
        furSize: appointment.furSize,
        name: appointment.name,
        race: appointment.race,
        size: appointment.size,
        startTime: formatDate(appointment.startTime)
      })}`
    );

    const createdAppointment = await repository.create(appointment);

    return createdAppointment;
  };
