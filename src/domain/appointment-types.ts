export type AppointmentCreationReqType = {
  animalType: string;
  description: string;
  furIsTangled: boolean;
  furSize: string;
  name: string;
  race: string;
  size: string;
  service: string;
  startTime: Date;
  updatedAt?: Date;
  createdAt?: Date;
};

export type AppointmentCreationType = AppointmentCreationReqType & {
  id?: string;
  endTime: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AppointmentSearchType = {
  appointments: AppointmentCreationType[];
  totalAppointments: number;
};
