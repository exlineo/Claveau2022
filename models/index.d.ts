import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MiseEnPageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PuginMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TypeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClasseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ArticleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategorieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class MiseEnPage {
  readonly id: string;
  readonly type?: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MiseEnPage, MiseEnPageMetaData>);
  static copyOf(source: MiseEnPage, mutator: (draft: MutableModel<MiseEnPage, MiseEnPageMetaData>) => MutableModel<MiseEnPage, MiseEnPageMetaData> | void): MiseEnPage;
}

export declare class Pugin {
  readonly id: string;
  readonly titre?: string;
  readonly params?: string;
  readonly Type?: Type;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly puginTypeId?: string;
  constructor(init: ModelInit<Pugin, PuginMetaData>);
  static copyOf(source: Pugin, mutator: (draft: MutableModel<Pugin, PuginMetaData>) => MutableModel<Pugin, PuginMetaData> | void): Pugin;
}

export declare class Type {
  readonly id: string;
  readonly titre?: string;
  readonly params?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Type, TypeMetaData>);
  static copyOf(source: Type, mutator: (draft: MutableModel<Type, TypeMetaData>) => MutableModel<Type, TypeMetaData> | void): Type;
}

export declare class Classe {
  readonly id: string;
  readonly classe?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Classe, ClasseMetaData>);
  static copyOf(source: Classe, mutator: (draft: MutableModel<Classe, ClasseMetaData>) => MutableModel<Classe, ClasseMetaData> | void): Classe;
}

export declare class Article {
  readonly id: string;
  readonly titre?: string;
  readonly alias?: string;
  readonly accroche?: string;
  readonly intro?: string;
  readonly contenu?: string;
  readonly imageA?: string;
  readonly imageI?: string;
  readonly imageC?: string;
  readonly Categories?: (Categorie | null)[];
  readonly picto?: string;
  readonly Classe?: Classe;
  readonly categorieID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly articleClasseId?: string;
  constructor(init: ModelInit<Article, ArticleMetaData>);
  static copyOf(source: Article, mutator: (draft: MutableModel<Article, ArticleMetaData>) => MutableModel<Article, ArticleMetaData> | void): Article;
}

export declare class Categorie {
  readonly id: string;
  readonly titre?: string;
  readonly alias?: string;
  readonly description?: string;
  readonly image?: string;
  readonly lien?: string;
  readonly articleID?: string;
  readonly accroche?: string;
  readonly Articles?: (Article | null)[];
  readonly MiseEnPage?: MiseEnPage;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly categorieMiseEnPageId?: string;
  constructor(init: ModelInit<Categorie, CategorieMetaData>);
  static copyOf(source: Categorie, mutator: (draft: MutableModel<Categorie, CategorieMetaData>) => MutableModel<Categorie, CategorieMetaData> | void): Categorie;
}