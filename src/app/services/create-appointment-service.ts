import type { AppointmentRepository } from '../../domain/appointment-repository.js';
import type { AppointmentCreationReqType } from '../../domain/appointment-types.js';
import logger from '../../lib/logger.js';
import { addHours, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const checkIfDateAndTimeAreAvailable = async (
  startTime: Date,
  repository: AppointmentRepository
): Promise<boolean> => {
  const appointmentExists = await repository.findByStartTime(startTime);
  return !appointmentExists;
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
        endTime: format(newAppointment.endTime, 'dd/MM/yyyy HH:mm', {
          locale: ptBR
        }),
        furIsTangled: newAppointment.furIsTangled,
        furSize: newAppointment.furSize,
        name: newAppointment.name,
        race: newAppointment.race,
        size: newAppointment.size,
        service: newAppointment.service,
        startTime: format(newAppointment.startTime, 'dd/MM/yyyy HH:mm', {
          locale: ptBR
        })
      })}`
    );

    const createdAppointment = await repository.create(newAppointment);

    return createdAppointment;
  };
