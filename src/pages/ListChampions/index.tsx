import React, { useCallback, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Champions } from "../../models/Champions";
import { LSChampions } from "../../utils/keysLocalStorage";
import { Container } from "./styles";

export const ListChampions: React.FC = () => {
  const [champions, setChampions] = useState<Champions[]>([]);

  useEffect(() => {
    const championsStorage = localStorage.getItem(LSChampions);
    const sinerg = championsStorage !== null ? JSON.parse(championsStorage) : [];
    setChampions(sinerg);
  }, []);

  const handleRemove = useCallback((index: number) => {
    const championsResult = champions.filter((_, i) => i !== index);

    setChampions(championsResult);
    localStorage.setItem(LSChampions, JSON.stringify(championsResult));
  }, [champions]);

  return (
    <Container>
      <h1>Lista de Sinergias</h1>
      <div className="list">
        {champions.map((item, index) => (
          <div key={index.toString()} className='item'>
            <div className="header">
              <h4>{item.name}</h4>
              <p>Custo: {item.cost}</p>
            </div>
            <div className="header">
              <p>Espaço: {item.space}</p>
              <p>{item.danoPrinc}</p>
              <p>{item.itemization}</p>
            </div>
            <div className="sinergy">
              {item.sinergys.map((sinerg, indice) => (
                <div key={`${index}-${indice}`}>
                  <p>{sinerg.valor}</p>
                  <p>{sinerg.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleRemove(index)}>
              <FiTrash /> Excluir
            </button>
          </div>
        ))}
      </div>
    </Container>
  )
}
