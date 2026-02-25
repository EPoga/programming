import type { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
  label: string;
}

export const LanguageToggle = ({ language, onToggle, label }: LanguageToggleProps) => (
  <button type="button" className="lang-toggle" onClick={onToggle} aria-label="Toggle language">
    {label} · {language.toUpperCase()}
  </button>
);
