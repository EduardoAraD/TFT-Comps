export interface SinergyChamp {
  name: string;
  valor: number;
}

export interface ScaleBonus {
  scale: number;
  bonus: string;
}

export interface Sinergy {
  name: string;
  description: string;
  scale: ScaleBonus[];
}
