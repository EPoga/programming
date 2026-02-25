import { useMemo, useState } from 'react';
import guestData from './data/guests.json';
import appConfig from './data/config.json';
import { AssignmentCard } from './components/AssignmentCard';
import { GuestSelectionList } from './components/GuestSelectionList';
import { LanguageToggle } from './components/LanguageToggle';
import { MapWithMarker } from './components/MapWithMarker';
import { SearchForm } from './components/SearchForm';
import { t } from './i18n';
import type { AppConfig, Guest, Language } from './types';
import { fullName, searchGuests } from './utils/search';

// Replace src/data/guests.json with your final wedding guest list.
const guests = guestData as Guest[];

// Replace src/data/config.json image paths with your uploaded seating/sleeping map assets.
const config = appConfig as AppConfig;

function App() {
  const [language, setLanguage] = useState<Language>('lv');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [candidates, setCandidates] = useState<Guest[]>([]);
  const [attempted, setAttempted] = useState(false);

  const copy = useMemo(() => ({
    title: t(language, 'appTitle'),
    subtitle: t(language, 'appSubtitle'),
    welcome: t(language, 'welcome'),
  }), [language]);

  const runSearch = () => {
    const { exactMatches, fuzzyMatches } = searchGuests(guests, name, surname);
    setAttempted(true);

    if (exactMatches.length === 1) {
      setSelectedGuest(exactMatches[0]);
      setCandidates([]);
      return;
    }

    if (exactMatches.length > 1) {
      setSelectedGuest(null);
      setCandidates(exactMatches);
      return;
    }

    if (fuzzyMatches.length > 0) {
      setSelectedGuest(null);
      setCandidates(fuzzyMatches);
      return;
    }

    setSelectedGuest(null);
    setCandidates([]);
  };

  const clearSearch = () => {
    setName('');
    setSurname('');
    setCandidates([]);
    setSelectedGuest(null);
    setAttempted(false);
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <LanguageToggle
          language={language}
          onToggle={() => setLanguage((prev) => (prev === 'lv' ? 'en' : 'lv'))}
          label={t(language, 'languageButton')}
        />
        <h1>{copy.title}</h1>
        <p>{copy.welcome}</p>
        <p className="subtitle">{copy.subtitle}</p>
      </header>

      <SearchForm
        name={name}
        surname={surname}
        nameLabel={t(language, 'nameLabel')}
        surnameLabel={t(language, 'surnameLabel')}
        searchLabel={t(language, 'search')}
        clearLabel={t(language, 'clear')}
        onNameChange={setName}
        onSurnameChange={setSurname}
        onSubmit={runSearch}
        onClear={clearSearch}
      />

      {candidates.length > 0 ? (
        <GuestSelectionList
          title={t(language, 'possibleMatches')}
          options={candidates}
          onSelect={(guest) => setSelectedGuest(guest)}
        />
      ) : null}

      {!selectedGuest && attempted && candidates.length === 0 ? (
        <section className="message-card">
          <h2>{t(language, 'noMatchTitle')}</h2>
          <p>{t(language, 'noMatchText')}</p>
          <p>{t(language, 'noMatchTextEn')}</p>
        </section>
      ) : null}

      {selectedGuest ? (
        <section className="results">
          <h2>
            {t(language, 'selectedGuest')}: {fullName(selectedGuest)}
          </h2>

          <AssignmentCard
            guest={selectedGuest}
            title={t(language, 'seatingCardTitle')}
            primaryLabel={t(language, 'table')}
            primaryValue={selectedGuest.seating.table}
            secondaryLabel={t(language, 'seat')}
            secondaryValue={selectedGuest.seating.seat}
            directionLabel={t(language, 'directions')}
            direction={selectedGuest.seating.direction}
          />

          <MapWithMarker
            title={t(language, 'seatingCardTitle')}
            image={config.seatingMap.image}
            imageAlt={config.seatingMap.alt}
            // Marker coordinates are x/y percentages from guests.json (0-100).
            marker={selectedGuest.seating.marker}
            fallbackText={t(language, 'mapFallback')}
            legend={config.seatingMap.fallbackLegend}
          />

          <AssignmentCard
            guest={selectedGuest}
            title={t(language, 'sleepingCardTitle')}
            primaryLabel={t(language, 'guestHouse')}
            primaryValue={selectedGuest.sleeping.house}
            secondaryLabel={t(language, 'room')}
            secondaryValue={selectedGuest.sleeping.roomBed}
            directionLabel={t(language, 'directions')}
            direction={selectedGuest.sleeping.direction}
          />

          <MapWithMarker
            title={t(language, 'sleepingCardTitle')}
            image={config.sleepingMap.image}
            imageAlt={config.sleepingMap.alt}
            // Marker coordinates are x/y percentages from guests.json (0-100).
            marker={selectedGuest.sleeping.marker}
            fallbackText={t(language, 'mapFallback')}
            legend={config.sleepingMap.fallbackLegend}
          />
        </section>
      ) : null}

      <footer className="help-note">{t(language, 'helpNote')}</footer>
    </main>
  );
}

export default App;
