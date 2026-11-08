import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import LoadingMessage from '../components/LoadingMessage';
import { deleteCar, getCarById } from '../services/carService';
import { bodyTypeLabels, fuelTypeLabels, type Car } from '../models/Car';

export default function CarDetailsPage() {
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

  async function handleDelete() {
    if (!car || !window.confirm(`Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model}?`)) return;
    try { await deleteCar(car.id); navigate('/cars'); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Nie udało się usunąć samochodu.'); }
  }

  if (loading) return <LoadingMessage />;
  if (error || !car) return <ErrorMessage message={error || 'Samochód nie istnieje.'} />;

  return <section><Link className="back-link" to="/cars">← Wróć do listy</Link><div className="page-heading"><div><p className="eyebrow">{car.brand}</p><h1>{car.model}</h1></div><div className="card-actions"><Link className="button primary" to={`/cars/${car.id}/edit`}>Edytuj</Link><button className="button danger" onClick={handleDelete}>Usuń</button></div></div><dl className="details-grid"><dt>Liczba drzwi</dt><dd>{car.doorsNumber}</dd><dt>Bagażnik</dt><dd>{car.luggageCapacity} l</dd><dt>Silnik</dt><dd>{car.engineCapacity} cm³</dd><dt>Paliwo</dt><dd>{fuelTypeLabels[car.fuelType]}</dd><dt>Data produkcji</dt><dd>{car.productionDate}</dd><dt>Średnie spalanie</dt><dd>{car.averageFuelConsumption} l/100 km</dd><dt>Nadwozie</dt><dd>{bodyTypeLabels[car.bodyType]}</dd></dl></section>;
}
