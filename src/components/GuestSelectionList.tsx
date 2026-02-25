import type { Guest } from '../types';

interface GuestSelectionListProps {
  title: string;
  options: Guest[];
  onSelect: (guest: Guest) => void;
}

export const GuestSelectionList = ({ title, options, onSelect }: GuestSelectionListProps) => (
  <section className="selection-card">
    <h2>{title}</h2>
    <ul>
      {options.map((guest) => (
        <li key={guest.id}>
          <button type="button" onClick={() => onSelect(guest)}>
            {guest.name} {guest.surname}
          </button>
        </li>
      ))}
    </ul>
  </section>
);
