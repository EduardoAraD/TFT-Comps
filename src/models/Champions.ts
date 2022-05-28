import { SinergyChamp } from "./Sinergy";

export interface Champions {
  name: string;
  cost: number;
  space: number;
  sinergys: SinergyChamp[];
  description: string;
  danoBase: "AP" | "AD";
  danoHab: "AP" | "AD" | "-";
}