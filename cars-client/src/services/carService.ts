import type { Car, NewCar } from '../models/Car';
import axios from 'axios';

const carsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? 'http://localhost:5186/api'}/cars`,
  headers: { 'Content-Type': 'application/json' },
});

export async function getCars(signal?: AbortSignal): Promise<Car[]> {
  const response = await carsApi.get<Car[]>('', { signal });
  return response.data;
}

export async function getCarById(id: string, signal?: AbortSignal): Promise<Car> {
  const response = await carsApi.get<Car>(`/${id}`, { signal });
  return response.data;
}

export async function createCar(car: NewCar): Promise<Car> {
  const response = await carsApi.post<Car>('', car);
  return response.data;
}

export async function updateCar(id: string, car: NewCar): Promise<void> {
  await carsApi.put(`/${id}`, car);
}

export async function deleteCar(id: string): Promise<void> {
  await carsApi.delete(`/${id}`);
}
