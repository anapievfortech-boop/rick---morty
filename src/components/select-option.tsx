import type { FC } from "react";
import type { SelectProps } from "../types";

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
  name,
  id,
}) => {
  return (
    <select
      className={className}
      name={name}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
