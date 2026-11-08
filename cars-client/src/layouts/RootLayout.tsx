import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-container">
          <NavLink className="brand-link" to="/">Cars Client</NavLink>
          <nav aria-label="Główne menu">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Strona główna</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/cars">Samochody</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/cars/new">Dodaj samochód</NavLink>
          </nav>
        </div>
      </header>
      <main className="container page-content"><Outlet /></main>
    </>
  );
}
