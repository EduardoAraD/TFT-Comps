import React from "react";
import { Container } from "./styles";

interface Props {
  title: string;
  value: string;
  type: 'text'|'number';
  onChangeText(text: string): void;
}

export const InputLabel: React.FC<Props> = ({
  title,
  onChangeText,
  value,
  type,
}) => {
  return (
    <Container>
      <label>{title}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => {
          onChangeText(event.target.value)
        }}
      />
    </Container>
  )
}
