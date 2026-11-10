# Cars Client

Frontend aplikacji samochodów przygotowany w React + TypeScript + Vite. Klient korzysta z rzeczywistego backendu `Cars.API`, biblioteki Axios oraz globalnego magazynu Zustand.

## Uruchomienie

1. Uruchom backend z katalogu głównego rozwiązania: `dotnet run --project Cars.API`.
2. W `cars-client` skopiuj `.env.example` do `.env` i w razie potrzeby ustaw `VITE_API_URL`.
3. Zainstaluj zależności i uruchom klienta:

   ```bash
   npm install
   npm run dev
   ```

Domyślny adres API to `http://localhost:5186/api`.

## Zrealizowany zakres nowego zadania

- Axios obsługuje operacje GET, POST, PUT i DELETE przez `src/services/carService.ts`.
- Adres backendu jest konfigurowany przez `VITE_API_URL`.
- Zustand z `persist` przechowuje wyszukiwanie, filtr ulubionych i identyfikatory ulubionych w `localStorage`.
- Lista i szczegóły samochodu pozwalają oznaczać auta jako ulubione; nawigacja pokazuje ich liczbę.
- Wyszukiwanie po marce/modelu i filtrowanie ulubionych działają po stronie klienta.
- Usunięcie samochodu usuwa również jego identyfikator z magazynu ulubionych.

## Materiały

W katalogu głównym dodano materiały PDF do laboratoriów 3 i 4 wraz z zadaniami:

- `_Aplikacje_webowe_26_27__4__React___podstawy.pdf`
- `_Aplikacje_webowe_26_27__4__React___podstawy_zadanie.pdf`
- `_Aplikacje_webowe_26_27__5__React___axios__zustand.pdf`
- `_Aplikacje_webowe_26_27__5__React___axios__zustand_zadanie.pdf`
