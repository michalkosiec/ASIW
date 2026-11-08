import { Link } from 'react-router';

export default function NotFoundPage() {
  return <section className="empty-state"><h1>404</h1><p>Nie znaleziono podanej strony.</p><Link className="button primary" to="/">Wróć na stronę główną</Link></section>;
}
