import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { InputLabel } from '../../components/InputLabel';
import { SelectLabel } from '../../components/SelectLabel';
import { Champions } from '../../models/Champions';
import { Sinergy, SinergyChamp } from '../../models/Sinergy';
import { LSChampions, LSSinergy } from '../../utils/keysLocalStorage';
import { Container } from './styles';

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
    const sinerg: Sinergy[] = sinergysStorage !== null ? JSON.parse(sinergysStorage) : [];
    setSinergysAll(sinerg.sort((a, b) => {
      if(a.name > b.name) return 1;
      else if(a.name < b.name) return -1;
      else return 0;
    }));
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
    setName('');
    setCost('1');
    setDanoPrinc('');
    setSinergs([]);
    setSpace('1');
    setItemization('');
    setSinergyEdit({ name: '', valor: 1 });
  }, [cost, danoPrinc, description, itemization, name, sinergys, space]);

  return (
    <Container>
      <h1>Cadastrar Campe??es</h1>
      <form onSubmit={handleSubmit}>
        <InputLabel
          title='Nome'
          type='text'
          onChangeText={setName}
          value={name}
        />
        <InputLabel
          title='Descri????o'
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
            title='Espa??o'
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
              { value: 'Fisico' , label: 'F??sico' },
              { value: 'Magico' , label: 'M??gico' },
              { value: 'Misto', label: 'Misto' },
            ]}
          />
          <SelectLabel
            label='Itemiza????o'
            value={itemization}
            onChangeText={setItemization}
            options={[
              { value: 'Tanque', label: 'Tanque' },
              { value: 'Dano Fisico' , label: 'Dano Fisico' },
              { value: 'Dano M??gico' , label: 'Dano M??gico' },
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
