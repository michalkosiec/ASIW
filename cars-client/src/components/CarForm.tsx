import { useState, type FormEvent } from 'react';
import { BodyType, FuelType, type Car, type NewCar, bodyTypeLabels, fuelTypeLabels } from '../models/Car';

interface CarFormProps {
  initialCar?: Car;
  submitLabel: string;
  onSubmit: (car: NewCar) => Promise<void>;
}

type FormValues = {
  brand: string;
  model: string;
  doorsNumber: string;
  luggageCapacity: string;
  engineCapacity: string;
  fuelType: string;
  productionDate: string;
  averageFuelConsumption: string;
  bodyType: string;
};

function toFormValues(car?: Car): FormValues {
  return {
    brand: car?.brand ?? '',
    model: car?.model ?? '',
    doorsNumber: String(car?.doorsNumber ?? 5),
    luggageCapacity: String(car?.luggageCapacity ?? 0),
    engineCapacity: String(car?.engineCapacity ?? 0),
    fuelType: String(car?.fuelType ?? FuelType.Petrol),
    productionDate: car?.productionDate?.slice(0, 10) ?? '',
    averageFuelConsumption: String(car?.averageFuelConsumption ?? 0),
    bodyType: String(car?.bodyType ?? BodyType.Hatchback),
  };
}

export default function CarForm({ initialCar, submitLabel, onSubmit }: CarFormProps) {
  const [values, setValues] = useState(() => toFormValues(initialCar));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (field: keyof FormValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit({
        brand: values.brand.trim(),
        model: values.model.trim(),
        doorsNumber: Number(values.doorsNumber),
        luggageCapacity: Number(values.luggageCapacity),
        engineCapacity: Number(values.engineCapacity),
        fuelType: Number(values.fuelType) as FuelType,
        productionDate: values.productionDate,
        averageFuelConsumption: Number(values.averageFuelConsumption),
        bodyType: Number(values.bodyType) as BodyType,
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Nie udało się zapisać samochodu.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <label>Marka<input required value={values.brand} onChange={(e) => update('brand', e.target.value)} /></label>
      <label>Model<input required value={values.model} onChange={(e) => update('model', e.target.value)} /></label>
      <label>Liczba drzwi<input required type="number" min="2" max="5" value={values.doorsNumber} onChange={(e) => update('doorsNumber', e.target.value)} /></label>
      <label>Pojemność bagażnika (l)<input required type="number" min="0" value={values.luggageCapacity} onChange={(e) => update('luggageCapacity', e.target.value)} /></label>
      <label>Pojemność silnika (cm³)<input required type="number" min="1" value={values.engineCapacity} onChange={(e) => update('engineCapacity', e.target.value)} /></label>
      <label>Rodzaj paliwa<select value={values.fuelType} onChange={(e) => update('fuelType', e.target.value)}>{Object.entries(fuelTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>Data produkcji<input required type="date" value={values.productionDate} onChange={(e) => update('productionDate', e.target.value)} /></label>
      <label>Średnie spalanie (l/100 km)<input required type="number" min="0.1" step="0.1" value={values.averageFuelConsumption} onChange={(e) => update('averageFuelConsumption', e.target.value)} /></label>
      <label>Typ nadwozia<select value={values.bodyType} onChange={(e) => update('bodyType', e.target.value)}>{Object.entries(bodyTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <button className="button primary" disabled={saving} type="submit">{saving ? 'Zapisywanie...' : submitLabel}</button>
    </form>
  );
}
