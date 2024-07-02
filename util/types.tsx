export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  save: string;
  detailUrl: string;
}
    
export type Detail = {
  source: string;
  spellType: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  atHigherLevels: string;
  save: string;
}
