import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import LoadingMessage from '../components/LoadingMessage';
import { deleteCar, getCars } from '../services/carService';
import type { Car } from '../models/Car';
import { useCarStore } from '../stores/carStore';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { searchQuery, favoritesOnly, favoriteCarIds, setSearchQuery, setFavoritesOnly, toggleFavorite, removeFavorite } = useCarStore();

  useEffect(() => {
    const controller = new AbortController();
    getCars(controller.signal)
      .then(setCars)
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Nie udało się pobrać samochodów.');
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filteredCars = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return cars.filter((car) => {
      const matchesSearch = `${car.brand} ${car.model}`.toLocaleLowerCase().includes(query);
      return matchesSearch && (!favoritesOnly || favoriteCarIds.includes(car.id));
    });
  }, [cars, favoriteCarIds, favoritesOnly, searchQuery]);

  async function handleDelete(car: Car) {
    if (!window.confirm(`Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model}?`)) return;
    try {
      await deleteCar(car.id);
      setCars((current) => current.filter((item) => item.id !== car.id));
      removeFavorite(car.id);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udało się usunąć samochodu.');
    }
  }

  if (loading) return <LoadingMessage />;
  if (error && cars.length === 0) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">Garaż</p><h1>Samochody</h1></div><Link className="button primary" to="/cars/new">+ Dodaj samochód</Link></div>
      {error && <ErrorMessage message={error} />}
      <div className="filters">
        <input className="filter-input" aria-label="Szukaj samochodów" placeholder="Szukaj po marce lub modelu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <label className="favorite-filter"><input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} /> Tylko ulubione</label>
      </div>
      {cars.length === 0 ? <p className="empty-state">Brak samochodów w bazie.</p> : filteredCars.length === 0 ? <p className="empty-state">Brak wyników dla podanego filtra.</p> : (
        <div className="car-grid">{filteredCars.map((car) => <article className="car-card" key={car.id}><div><p className="eyebrow">{car.brand}</p><h2>{car.model}</h2><p>{car.engineCapacity} cm³ · {car.doorsNumber} drzwi</p></div><div className="card-actions"><button className={`button favorite-button${favoriteCarIds.includes(car.id) ? ' selected' : ''}`} onClick={() => toggleFavorite(car.id)} aria-label={favoriteCarIds.includes(car.id) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}>{favoriteCarIds.includes(car.id) ? '★ Ulubiony' : '☆ Ulubiony'}</button><Link className="button" to={`/cars/${car.id}`}>Szczegóły</Link><Link className="button" to={`/cars/${car.id}/edit`}>Edytuj</Link><button className="button danger" onClick={() => handleDelete(car)}>Usuń</button></div></article>)}</div>
      )}
    </section>
  );
}
