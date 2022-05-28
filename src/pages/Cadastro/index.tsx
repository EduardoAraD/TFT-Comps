import React, { useState } from 'react';
import { OptionsHeader } from '../../components/OptionsHeader';
import { CadastroChampions } from '../CadastroChampions';
import { CadastroSinergy } from '../CadastroSinergys';
import { Container } from './styles';

export const Cadastro: React.FC = () => {
  const [isCadastroChamps, setIsCadastroChamps] = useState(false);

  return (
    <Container>
      <OptionsHeader
        options={[
          {
            function: () => setIsCadastroChamps(false),
            selected: !isCadastroChamps,
            title: 'Sinergias',
          },
          {
            function: () => setIsCadastroChamps(true),
            selected: isCadastroChamps,
            title: 'Campeões',
          }
        ]}
      />
      {isCadastroChamps ? (
        <CadastroChampions/>
      ) : (
        <CadastroSinergy />
      )}
    </Container>
  );
}
