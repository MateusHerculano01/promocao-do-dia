export interface LocalityCityDTOS {
  id: string;
  nome: string;
  microrregiao: Microrregiao;
  "regiao-imediata": RegiaoImediata;
}

interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

interface Mesorregiao {
  id: number;
  nome: string;
  UF: Uf;
}

interface Uf {
  id: number;
  sigla: string;
  nome: string;
  regiao?: Uf;
}

interface RegiaoImediata {
  id: number;
  nome: string;
  "regiao-intermediaria": Mesorregiao;
}
