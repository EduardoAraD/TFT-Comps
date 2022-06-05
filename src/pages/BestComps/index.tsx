import React, { useCallback, useEffect, useState } from "react";
import { InputLabel } from "../../components/InputLabel";
import { SelectLabel } from "../../components/SelectLabel";
import { Champions } from "../../models/Champions";
import { Sinergy } from "../../models/Sinergy";
import { LSChampions, LSSinergy } from "../../utils/keysLocalStorage";
import { Container } from './styles';

interface SinergyComp {
  nameSinergy: string;
  value: number;
  valueSinergy: number;
  bonus: string;
  nivel: number;
}

interface Comps {
  champions: Champions[];
  sinergys: SinergyComp[];
  nivelComp: number;
}

export const BestComps: React.FC = () => {
  const [sinergys, setSinergys] = useState<Sinergy[]>([]);
  const [champions, setChampions] = useState<Champions[]>([]);
  const [numberChampions, setNumberChampions] = useState('1');
  const [nameSinergy, setNameSinergy] = useState('');
  const [comps, setComps] = useState<Comps[]>([]);

  const toDoComps = useCallback(
    (limite: number, list: Champions[], compsIncomplet: Champions[]): Champions[][] => {
      if(limite - compsIncomplet.length === 1) {
        const comps: Champions[][] = [];
        list.forEach((item) => {
          comps.push([...compsIncomplet, item]);
        });
        return comps;
      }
      else {
        const compsAll: Champions[][] = [];
        list.forEach((item, index) => {
          const listResul = list.filter((_, i) => i > index);
          const compsResul = toDoComps(limite, listResul, [...compsIncomplet, item]);
          compsAll.push(...compsResul);
        });
        return compsAll;
      }
    }
  , []);

  const todoCompsFor = useCallback(
    (limite: number, list: Champions[]): Champions[][] => {
      const comps: Champions[][] = [];
      
      let indexComps = [];
      for(let i = 0; i <= limite; i++){
        indexComps.push(0);
      }
      let limiteDecorrent = limite;
      const comp: Champions[] = [];
      let index = 0;

      while(list.length > indexComps[0]) {
        const champ = list[indexComps[index]];
        // console.log(champ, indexComps[index], index);
        if(indexComps[index] >= list.length) {
          const champDelete = comp.pop();
          if(champDelete) {
            limiteDecorrent += champDelete.space;
          }
          indexComps[index] = 0;
          indexComps[index - 1] += 1;
          index -= 1;
        } else if(limiteDecorrent === champ.space) {
          comps.push([...comp, champ]);
        }
        else if(limiteDecorrent > champ.space){
          comp.push(champ);
          limiteDecorrent -= champ.space;
          indexComps[index + 1] = indexComps[index];
          index += 1;
        } 
        indexComps[index] += 1;
      }
      return comps;
    }
  ,[]);

  const getNivel = useCallback((numberComp: number, numberScaleSinergy: number): number => {
    if(numberScaleSinergy === 1) {
      return numberComp >= 1 ? 5 : 0;
    } else if(numberScaleSinergy === 2) {
      if(numberComp >= 2) return 5;
      if(numberComp >= 1) return 3;
      return 0;
    } else if(numberScaleSinergy === 3) {
      if(numberComp >= 3) return 5;
      if(numberComp >= 2) return 3;
      if(numberComp >= 1) return 1;
      return 0;
    } else if(numberScaleSinergy === 4) {
      if(numberComp >= 4) return 5;
      if(numberComp >= 3) return 4;
      if(numberComp >= 2) return 2;
      if(numberComp >= 1) return 1;
      return 0;
    } else {
      return numberComp;
    }
  }, [])

  const handleSubmit = useCallback((limite: number, nameSinerg: string) => {
    // console.log('TESTE');
    // console.log(todoCompsFor(limite, champions));

    const championsComps = todoCompsFor(limite, champions);
    const compsAll: Comps[] = [];
  
    console.log(championsComps);

    championsComps.forEach(compChamps => {
      const sinergysCompAll: { name: string, valor: number }[] = [];
      compChamps.forEach((champ) => {
        champ.sinergys.forEach((sin) => {
          const indexSinergy = sinergysCompAll.findIndex(i => i.name === sin.name);
          if(indexSinergy !== -1) {
            sinergysCompAll[indexSinergy].valor += sin.valor;
          } else {
            sinergysCompAll.push(sin);
          }
        })
      });


      const sinergysComp: SinergyComp[] = [];

      sinergysCompAll.forEach(item => {
        const find = sinergys.find(sin => sin.name === item.name);
        if(find) {
          const scaleFilter = find.scale.filter(i => i.scale <= item.valor);
          let bonus = '';
          let valueSinergy = 0;
          let nivel = 0;
          if(scaleFilter.length > 0) {
            const ind = scaleFilter.length -1;
            bonus = scaleFilter[ind].bonus;
            valueSinergy = scaleFilter[ind].scale;
            nivel = getNivel(scaleFilter.length, find.scale.length);
          }

          const obj: SinergyComp = {
            bonus: bonus,
            nameSinergy: item.name,
            value: item.valor,
            valueSinergy: valueSinergy,
            nivel: nivel,
          }
          sinergysComp.push(obj);
        }
      });

      let nivelSinergy = 0;
      sinergysComp.forEach(i =>{
        nivelSinergy += i.nivel;
      })

      compsAll.push({
        champions: compChamps,
        nivelComp: nivelSinergy,
        sinergys: sinergysComp,
      })
    });
    // const numbers = [1, 2, 3, 4, 5,6 , 7];
    // console.log(numbers);
    // numbers.forEach((i, index) => {

    // });
    // 1 - 2 - 3 - 4 - 5 - 6 - 7
    /*
      logica
      1 - 2 - 3
      1 - 2 - 4
      ...
      1 - 2 - 7
      1 - 3 - 4
      ...
      1 - 3 - 7
      1 - 4 - 5
      ...
      1 - 5 - 6
      1 - 5 - 7
      1 - 6 - 7
      2 - 3 - 4
      ...
    */

    console.log(compsAll.sort((a, b) => {
      if(a.nivelComp < b.nivelComp) return 1;
      if(b.nivelComp < a.nivelComp) return -1;
      else return 0;
    }));
    setComps(compsAll.sort((a, b) => {
      if(a.nivelComp < b.nivelComp) return 1;
      if(b.nivelComp < a.nivelComp) return -1;
      else return 0;
    }));

  }, [champions, getNivel, sinergys, todoCompsFor]);

  useEffect(() => {
    const sinergysString = localStorage.getItem(LSSinergy);
    if(sinergysString !== null) {
      const siner: Sinergy[] = JSON.parse(sinergysString);
      setSinergys(siner);
    }
    const championsString = localStorage.getItem(LSChampions);
    if(championsString !== null) {
      const champs: Champions[] = JSON.parse(championsString);
      setChampions(champs);
    }
  }, []);

  return (
    <Container>
      <div className="body">
        <h1>Melhores comps encontradas</h1>
        <div className="option">
          <div className="info">
            <InputLabel
              onChangeText={setNumberChampions}
              title='Numero de Campeões'
              type="number"
              value={numberChampions}
            />
            <SelectLabel
              label="Sinergia"
              onChangeText={setNameSinergy}
              options={sinergys.map(item => ({ label: item.name, value: item.name }))}
              value={nameSinergy}
            />
          </div>
          <button
            type="button"
            onClick={() => handleSubmit(Number(numberChampions), nameSinergy)}
          >Pesquisar</button>
        </div>
      </div>
    </Container>
  );
}
