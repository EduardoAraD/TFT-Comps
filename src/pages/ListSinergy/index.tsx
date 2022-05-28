import React, { useCallback, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

import { Sinergy } from "../../models/Sinergy";
import { LSSinergy } from "../../utils/keysLocalStorage";

import { Container } from "./styles";

export const ListSinergy: React.FC = () => {
  const [sinergys, setSinergys] = useState<Sinergy[]>([]);

  useEffect(() => {
    const sinergysStorage = localStorage.getItem(LSSinergy);
    const sinerg = sinergysStorage !== null ? JSON.parse(sinergysStorage) : [];
    setSinergys(sinerg);
  }, []);

  const handleRemove = useCallback((index: number) => {
    const sinergyResult = sinergys.filter((_, i) => i !== index);

    setSinergys(sinergyResult);
    localStorage.setItem(LSSinergy, JSON.stringify(sinergyResult));
  }, [sinergys]);

  return (
    <Container>
      <h1>Lista de Sinergias</h1>
      <div className="list">
        {sinergys.map((item, index) => (
          <div key={index.toString()} className="item">
            <div className="item-info">
              <p>{item.name}</p>
              <p style={{ flex: 1 }}>{item.description}</p>
            </div>
            <div className="item-scale">
              {item.scale.map((it, indice) => (
                <div key={`${item}-${indice}`}>
                  <p>{it.scale}</p>
                  <span>{it.bonus}</span>
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
  );
}
