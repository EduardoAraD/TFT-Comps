import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { InputLabel } from '../../components/InputLabel';
import { SelectLabel } from '../../components/SelectLabel';
import { Champions } from '../../models/Champions';
import { Sinergy, SinergyChamp } from '../../models/Sinergy';
import { LSChampions, LSSinergy } from '../../utils/keysLocalStorage';
import { Container } from './styles';

/*
  name: string;
  cost: number;
  space: number;
  sinergys: SinergyChamp[];
  description: string;
  danoBase: "AP" | "AD";
  danoHab: "AP" | "AD" | "-";
*/

export const CadastroChampions: React.FC = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('1');
  const [sinergysAll, setSinergysAll] = useState<Sinergy[]>([]);
  const [sinergys, setSinergs] = useState<SinergyChamp[]>([]);
  const [sinergyEdit, setSinergyEdit] = useState<SinergyChamp>({
    name: '',
    valor: 1,
  })
  const [space, setSpace] = useState('1');
  const [description, setDescription] = useState('');
  const [danoPrinc, setDanoPrinc] = useState('');
  const [itemization, setItemization] = useState('');

  useEffect(() => {
    const sinergysStorage = localStorage.getItem(LSSinergy);
    const sinerg = sinergysStorage !== null ? JSON.parse(sinergysStorage) : [];
    setSinergysAll(sinerg);
  }, []);

  const handleAddSinergy = useCallback(() => {
    setSinergs([...sinergys, sinergyEdit]);
  }, [sinergys, sinergyEdit]);

  const handleRemoveSinergy = useCallback((indice: number) => {
    setSinergs(sinergys.filter((_,index) => index !== indice))
  }, [sinergys]);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();

    const championsStorage = localStorage.getItem(LSChampions);

    let champions: Champions[] = championsStorage !== null ? JSON.parse(championsStorage) : [];
    const champion: Champions = {
      description: description,
      name: name,
      cost: Number(cost),
      danoPrinc: danoPrinc,
      sinergys: sinergys,
      space: Number(space),
      itemization: itemization,
    }
    champions.push(champion);

    localStorage.setItem(LSChampions,JSON.stringify(champions));
  }, [cost, danoPrinc, description, itemization, name, sinergys, space]);

  return (
    <Container>
      <h1>Cadastrar Campeões</h1>
      <form onSubmit={handleSubmit}>
        <InputLabel
          title='Nome'
          type='text'
          onChangeText={setName}
          value={name}
        />
        <InputLabel
          title='Descrição'
          onChangeText={setDescription}
          type='text'
          value={description}
        />
        <div className='double'>
          <InputLabel
            title='Custo'
            type='number'
            onChangeText={setCost}
            value={cost}
          />
          <InputLabel
            title='Espaço'
            type='number'
            onChangeText={setSpace}
            value={space}
          />
        </div>
        <div className='double'>
          <SelectLabel
            label='Dano Principal'
            value={danoPrinc}
            onChangeText={setDanoPrinc}
            options={[
              { value: 'Fisico' , label: 'Físico' },
              { value: 'Magico' , label: 'Mágico' },
              { value: 'Misto', label: 'Misto' },
            ]}
          />
          <SelectLabel
            label='Itemização'
            value={itemization}
            onChangeText={setItemization}
            options={[
              { value: 'Tanque', label: 'Tanque' },
              { value: 'Dano Fisico' , label: 'Dano Fisico' },
              { value: 'Dano Mágico' , label: 'Dano Mágico' },
              { value: 'Dano Misto', label: 'Dano Misto' },
              { value: 'Velicidade de Ataque', label: 'Velocidade de Ataque' },
              { value: 'Mana + Magico', label: 'Mana + Magico' },
              { value: 'Vel. Ataque + Fisico', label: 'Vel. Ataque + Fisico' }
            ]}
          />
        </div>
        <div className='option'>
          <div>
            <SelectLabel
              onChangeText={
                (text: string) => setSinergyEdit({ name: text, valor: sinergyEdit.valor })
              }
              label="Selecione a Sinergia"
              options={sinergysAll.map(item => {
                return {
                  label: item.name,
                  value: item.name,
                }
              })}
              value={sinergyEdit.name}
            />
            <InputLabel
              onChangeText={
                (text: string) => setSinergyEdit({ name: sinergyEdit.name, valor: Number(text) })
              }
              type='number'
              title="Valor de sinergia"
              value={String(sinergyEdit.valor)}
            />
          </div>
          <button className='add' type='button'
            onClick={handleAddSinergy}
          >
            <FiPlus />
          </button>
        </div>
        <div className='scale'>
          {sinergys.map((item, index) => (
            <div key={index.toString()}>
              <p className='pos'>{item.valor}</p>
              <p className='desc'>{item.name}</p>
              <button className='remove' type='button'
                onClick={() => handleRemoveSinergy(index)}
              >
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
        <Button
          title='Confirmar'
          isSubmit
        />
      </form>
    </Container>
  )
}
