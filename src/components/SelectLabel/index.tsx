import React from "react";
import { Container } from "./styles";

interface Props {
  label: string;
  value: string;
  onChangeText(text: string): void;
  options: {value: string, label: string}[];
}

export const SelectLabel: React.FC<Props> = ({
  label,
  onChangeText,
  value,
  options,
}) => {
  return (
    <Container>
      <label>{label}</label>
      <select
        value={value}
        onChange={(event) => onChangeText(event.target.value)}
      >
        <option value=''>Escolha uma opção</option>
        {options.map((item, index) => (
          <option
            key={`${index}-${item.value}`}
            value={item.value}
          >{item.label}</option>
        ))}
      </select>
    </Container>
  );
}
