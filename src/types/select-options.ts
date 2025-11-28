export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectConfig {
  species: SelectOption[];
  gender: SelectOption[];
  status: SelectOption[];
  type: SelectOption[];
  dimension: SelectOption[];
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  name?: string;
  id?: string;
}
