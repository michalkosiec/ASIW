import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import CarForm from '../components/CarForm';
import ErrorMessage from '../components/ErrorMessage';
import LoadingMessage from '../components/LoadingMessage';
import { getCarById, updateCar } from '../services/carService';
import type { Car } from '../models/Car';

export default function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    getCarById(id, controller.signal).then(setCar).catch((requestError: unknown) => {
      if ((requestError as { name?: string }).name !== 'AbortError') setError(requestError instanceof Error ? requestError.message : 'Nie udało się pobrać samochodu.');
    }).finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);
  if (loading) return <LoadingMessage />;
  if (error || !car || !id) return <ErrorMessage message={error || 'Samochód nie istnieje.'} />;
  return <section><Link className="back-link" to={`/cars/${id}`}>← Wróć do szczegółów</Link><h1>Edytuj samochód</h1><CarForm initialCar={car} submitLabel="Zapisz zmiany" onSubmit={async (updatedCar) => { await updateCar(id, updatedCar); navigate(`/cars/${id}`); }} /></section>;
}
