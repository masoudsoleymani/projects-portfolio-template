import type { ModelCategory } from './models';

export interface ModelFolder {
  slug: ModelCategory;
  title: string;
  description: string;
  icon: string;
}

export const modelFolders: ModelFolder[] = [
  {
    slug: 'er',
    title: 'Modelo ER',
    description: 'Modelos entidad-relación: entidades, atributos y relaciones.',
    icon: 'ph:folder',
  },
  {
    slug: 'eer',
    title: 'Modelo ER Extendido',
    description: 'Modelos EER: Relaciones reflexibas, especializacion y generalizacion, agregacion',
    icon: 'ph:folder',
  },
  {
    slug: 'reduccion',
    title: 'Reducción a Tablas',
    description: 'Paso de los modelos ER/EER a esquemas relacionales (tablas).',
    icon: 'ph:folder',
  },
];