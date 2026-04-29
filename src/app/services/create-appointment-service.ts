import type { AppointmentRepository } from '../../domain/appointment-repository.js';
import type { AppointmentCreationReqType } from '../../domain/appointment-types.js';
import logger from '../../lib/logger.js';
import { addHours } from 'date-fns';

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const checkIfDateAndTimeAreAvailable = async (
  startTime: Date,
  repository: AppointmentRepository
): Promise<boolean> => {
  const appointmentExists = await repository.findByStartTime(startTime);

  return !appointmentExists.length;
};

export default (repository: AppointmentRepository) =>
  async (appointment: AppointmentCreationReqType) => {
    const newAppointment = {
      ...appointment,
      endTime: addHours(appointment.startTime, 1)
    };

    const isAvailable = await checkIfDateAndTimeAreAvailable(
      newAppointment.startTime,
      repository
    );

    if (!isAvailable) {
      throw new Error(
        'The selected date and time are not available for booking.'
      );
    }

    logger.info(
      `Creating appointment with data: ${JSON.stringify({
        animalType: newAppointment.animalType,
        description: newAppointment.description,
        endTime: formatDate(newAppointment.endTime),
        furIsTangled: newAppointment.furIsTangled,
        furSize: newAppointment.furSize,
        name: newAppointment.name,
        race: newAppointment.race,
        size: newAppointment.size,
        service: newAppointment.service,
        startTime: formatDate(newAppointment.startTime)
      })}`
    );

    const createdAppointment = await repository.create(newAppointment);

    return createdAppointment;
  };
