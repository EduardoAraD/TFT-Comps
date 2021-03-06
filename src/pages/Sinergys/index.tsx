import React, { useState } from 'react';
import { OptionsHeader } from '../../components/OptionsHeader';
import { CadastroSinergy } from '../CadastroSinergys';
import { ListSinergy } from '../ListSinergy';
import { Container } from './styles';

export const Sinergys: React.FC = () => {
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
        <CadastroSinergy/>
      ) : (
        <ListSinergy />
      )}
    </Container>
  );
}
