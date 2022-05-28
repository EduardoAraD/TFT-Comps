import React, { useState } from 'react';
import { OptionsHeader } from '../../components/OptionsHeader';
import { CadastroChampions } from '../CadastroChampions';
import { ListChampions } from '../ListChampions';
import { Container } from './styles';

export const Champions: React.FC = () => {
  const [isCadastro, setIsCadastro] = useState(false);

  return (
    <Container>
      <OptionsHeader
        options={[
          {
            function: () => setIsCadastro(false),
            selected: !isCadastro,
            title: 'Listar',
          },
          {
            function: () => setIsCadastro(true),
            selected: isCadastro,
            title: 'Cadastro',
          }
        ]}
      />
      {isCadastro ? (
        <CadastroChampions/>
      ) : (
        <ListChampions />
      )}
    </Container>
  );
}
