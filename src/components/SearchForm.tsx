interface SearchFormProps {
  name: string;
  surname: string;
  nameLabel: string;
  surnameLabel: string;
  searchLabel: string;
  clearLabel: string;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export const SearchForm = ({
  name,
  surname,
  nameLabel,
  surnameLabel,
  searchLabel,
  clearLabel,
  onNameChange,
  onSurnameChange,
  onSubmit,
  onClear,
}: SearchFormProps) => (
  <form
    className="search-form"
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
  >
    <label>
      {nameLabel}
      <input value={name} onChange={(event) => onNameChange(event.target.value)} autoComplete="given-name" />
    </label>

    <label>
      {surnameLabel}
      <input
        value={surname}
        onChange={(event) => onSurnameChange(event.target.value)}
        autoComplete="family-name"
      />
    </label>

    <div className="button-row">
      <button type="submit" className="primary">
        {searchLabel}
      </button>
      <button type="button" onClick={onClear} className="secondary">
        {clearLabel}
      </button>
    </div>
  </form>
);
