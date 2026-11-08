import { Link } from 'react-router';

export default function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">React + TypeScript + Vite</p>
      <h1>Cars Client</h1>
      <p>Zarządzaj listą samochodów, przeglądaj ich szczegóły i edytuj dane w prostym kliencie REST.</p>
      <Link className="button primary" to="/cars">Przejdź do samochodów</Link>
    </section>
  );
}
