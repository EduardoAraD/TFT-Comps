import React from 'react';
import { Container } from './styles';

interface PropsObject {
  title: string;
  selected: boolean;
  function(): void;  
}

interface Props {
  options: PropsObject[];
}

export const OptionsHeader: React.FC<Props> = ({
  options
}) => {
  return (
    <Container>
      {options.map((item, index) => (
        <button
          className={item.selected ? 'select' : 'notSelect'}
          key={index.toString()}
          onClick={item.function}
        >
          {item.title}
        </button>
      ))}
    </Container>
  )
}
