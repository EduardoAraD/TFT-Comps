import React, { useEffect, useState } from "react";
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

  return (
    <Container>
      <h1>Lista de Sinergias</h1>
      <div className="list">
        {champions.map((item, index) => (
          <div key={index.toString()}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
