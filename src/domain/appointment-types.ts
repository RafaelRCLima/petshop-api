export const animalTypes = ['Cachorro', 'Gato'] as const;
export const petSizes = ['Pequeno', 'Médio', 'Grande'] as const;
export const furSizes = ['Curto', 'Médio', 'Longo'] as const;

export type AnimalType = (typeof animalTypes)[number];
export type PetSize = (typeof petSizes)[number];
export type FurSize = (typeof furSizes)[number];

export type AppointmentCreationReqType = {
  animalType: AnimalType;
  description: string;
  furIsTangled: boolean;
  furSize: FurSize;
  name: string;
  race: string;
  size: PetSize;
  service: string;
  startTime: Date;
  updatedAt?: Date;
  createdAt?: Date;
};

export type AppointmentCreationType = AppointmentCreationReqType & {
  endTime: Date;
};
