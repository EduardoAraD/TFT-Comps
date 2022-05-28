import React, { useCallback, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { InputLabel } from '../../components/InputLabel';
import { ScaleBonus } from '../../models/Sinergy';
import { Container } from './styles';

export const CadastroSinergy :React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scaleEdit, setScaleEdit] = useState<ScaleBonus>({
    bonus: '',
    scale: 0,
  })
  const [scale, setScale] = useState<ScaleBonus[]>([]);

  const handleAddSinergy = useCallback(() => {
    setScale([...scale, scaleEdit]);
  }, [scale, scaleEdit]);

  const handleRemoveSinergy = useCallback((indice: number) => {
    setScale(scale.filter((_,index) => index !== indice))
  }, [scale]);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();

    console.log(name, description, scale);
  }, [description, name, scale]);

  return (
    <Container>
      <h1>Cadastrar Sinergias</h1>
      <form onSubmit={handleSubmit}>
        <InputLabel
          title='Nome'
          type='text'
          onChangeText={setName}
          value={name}
        />
        <InputLabel
          type='text'
          title='Descrição'
          onChangeText={setDescription}
          value={description}
        />
        <div className='option'>
          <div>
            <InputLabel
              onChangeText={
                (text: string) => setScaleEdit({ bonus: scaleEdit.bonus, scale: Number(text)})
              }
              title="Numero de campeões"
              type="number"
              value={String(scaleEdit.scale)}
            />
            <InputLabel
              onChangeText={
                (text: string) => setScaleEdit({ bonus: text, scale: scaleEdit.scale})
              }
              type='text'
              title="Bonus da Sinergia"
              value={scaleEdit.bonus}
            />
          </div>
          <button className='add' type='button'
            onClick={handleAddSinergy}
          >
            <FiPlus />
          </button>
        </div>
        <div className='scale'>
          {scale.map((item, index) => (
            <div key={index.toString()}>
              <p className='pos'>{item.scale}</p>
              <p className='desc'>{item.bonus}</p>
              <button className='remove' type='button'
                onClick={() => handleRemoveSinergy(index)}
              >
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
        <Button
          title='Cadastrar'
          isSubmit
        />
      </form>
    </Container>
  );
}
