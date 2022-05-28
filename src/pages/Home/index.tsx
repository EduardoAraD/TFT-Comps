import React, { useState } from 'react';
import { OptionsHeader } from '../../components/OptionsHeader';
import { BestComps } from '../BestComps';
import { Cadastro } from '../Cadastro';
import { Sinergys } from '../Sinergys';
import { Container } from './styles';

export const Home: React.FC = () => {
  const [options, setOptions] = useState(0);

  return (
    <Container>
      <div className='content'>
        <h1>TFT Comps</h1>
        <OptionsHeader
          options={[
            {
              function: () => setOptions(0),
              selected: options === 0,
              title: 'Comps',
            },
            {
              function: () => setOptions(1),
              selected: options === 1,
              title: 'Sinergias',
            },
            {
              function: () => setOptions(2),
              selected: options === 2,
              title: 'Campeões',
            }
          ]}
        />
        <div className='dados'>
          {options === 0 ? (
            <BestComps />
          ) : (options === 1 ? (
            <Sinergys />
          ) : (
            <Cadastro />
          ))}
        </div>
      </div>
    </Container>
  )
}
