export const FuelType = {
  Petrol: 0,
  Diesel: 1,
  Hybrid: 2,
  Electric: 3,
  LPG: 4,
} as const;
export type FuelType = (typeof FuelType)[keyof typeof FuelType];

export const BodyType = {
  Hatchback: 0,
  Sedan: 1,
  Kombi: 2,
  SUV: 3,
  Roadster: 4,
} as const;
export type BodyType = (typeof BodyType)[keyof typeof BodyType];

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: BodyType;
}

export type NewCar = Omit<Car, 'id'>;

export const fuelTypeLabels: Record<FuelType, string> = {
  [FuelType.Petrol]: 'Benzyna',
  [FuelType.Diesel]: 'Diesel',
  [FuelType.Hybrid]: 'Hybryda',
  [FuelType.Electric]: 'Elektryczny',
  [FuelType.LPG]: 'LPG',
};

export const bodyTypeLabels: Record<BodyType, string> = {
  [BodyType.Hatchback]: 'Hatchback',
  [BodyType.Sedan]: 'Sedan',
  [BodyType.Kombi]: 'Kombi',
  [BodyType.SUV]: 'SUV',
  [BodyType.Roadster]: 'Roadster',
};
