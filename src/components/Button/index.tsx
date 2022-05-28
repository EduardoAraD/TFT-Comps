import React from "react";
import { Container } from './styles';

interface Props {
  title: string;
  onClick?(): void;
  isSubmit: boolean;
}

export const Button: React.FC<Props> = ({
  onClick = () => {},
  title,
  isSubmit,
}) => {
  return (
    <Container
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {title}
    </Container>
  )
}
