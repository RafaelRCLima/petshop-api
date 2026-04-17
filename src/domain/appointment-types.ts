export const animalTypes = ['DOG', 'CAT', 'BIRD'] as const;
export const petSizes = ['SMALL', 'MEDIUM', 'LARGE'] as const;
export const furSizes = ['SHORT', 'MEDIUM', 'LONG'] as const;

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
  startTime: Date;
  updatedAt?: Date;
  createdAt?: Date;
};

export type AppointmentCreationType = AppointmentCreationReqType & {
  endTime: Date;
};
