import type { Guest } from '../types';

interface AssignmentCardProps {
  guest: Guest;
  title: string;
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue?: string;
  directionLabel: string;
  direction: string;
}

export const AssignmentCard = ({
  guest,
  title,
  primaryLabel,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  directionLabel,
  direction,
}: AssignmentCardProps) => (
  <article className="assignment-card">
    <h3>{title}</h3>
    <p>
      <strong>{primaryLabel}:</strong> {primaryValue}
    </p>
    {secondaryValue ? (
      <p>
        <strong>{secondaryLabel}:</strong> {secondaryValue}
      </p>
    ) : null}
    <p>
      <strong>{directionLabel}:</strong> {direction}
    </p>
    {guest.notes ? (
      <p className="note">
        <em>{guest.notes}</em>
      </p>
    ) : null}
  </article>
);
