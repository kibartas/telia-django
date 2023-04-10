import { ChangeEvent } from "react";

const FilterSelect = ({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect: (selection: string) => void;
}) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };
  return (
    <>
      <div>{label}</div>
      <select onChange={handleSelect}>
        <option value={""}></option>
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterSelect;
