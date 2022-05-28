import React, { useCallback, useState } from 'react';
import { Container } from './styles';

export const CadastroChampions: React.FC = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(1);
  const [sinergs, setSinergs] = useState([]);
  const [space, setSpace] = useState(1);
  const [description, setDescription] = useState('');
  const [danoBase, setDanoBase] = useState('AP');
  const [danoHab, setDanoHab] = useState('-');

  const handleSubmit = useCallback(() => {
    console.log(name, cost, sinergs);
  }, []);

  return (
    <Container>
      <h1>Cadastrar Campeões</h1>
      <form>
        <div>
          <input type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input type="number" onChange={(event) => setCost(Number(event.target.value))} />
          <input type="number" onChange={(event) => setSpace(Number(event.target.value))} />
        </div>
        <div>
          <select onChange={(event) => {
            setDanoBase(event.target.value);
          }}>
            <option value="AD">Fisíco</option>
            <option value="AP">Mágico</option>
          </select>
          <select onChange={(event) => {
            setDanoHab(event.target.value);
          }}>
            <option value="-">Sem habilidades</option>
            <option value="AD">Fisíco</option>
            <option value="AP">Mágico</option>
          </select>
        </div>
        <div>
          <input type="text" onChange={(event) => setDescription(event.target.value)} />
        </div>
        <button type='submit'>
          Confirmar
        </button>
      </form>
    </Container>
  )
}
