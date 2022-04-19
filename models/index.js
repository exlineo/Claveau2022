// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MiseEnPage, Pugin, Type, Classe, Article, Categorie } = initSchema(schema);

export {
  MiseEnPage,
  Pugin,
  Type,
  Classe,
  Article,
  Categorie
};