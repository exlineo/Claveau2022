import { Data } from './Data.js';
/** Gérer les requêtes en fonction du cache */
export class Requetes extends Data{
  
  constructor(){
    super();
  }
    /** Créer un objet de requête dans les articles*/
    reqArticles(){
        return `query {
          listArticles {
            items {
              titre
              picto
              intro
              imageI
              imageC
              imageA
              id
              alias
              articleClasseId
              accroche
              Classe {
                classe
                id
              }
              Categories {
                items {
                  accroche
                  alias
                  articleID
                  createdAt
                  description
                  id
                  image
                  titre
                  lien
                }
              }
            }
          }
        }`
      };
      // Faire des recherches dans les catégories
      reqCatagories(){
        return `query {
          listCategories {
            items {
              accroche
              alias
              id
              image
              lien
              titre
              Articles {
                items {
                  accroche
                  alias
                  categorieID
                  annee
                  contenu
                  imageA
                  imageC
                  imageI
                  intro
                  picto
                  id
                  titre
                  updatedAt
                  createdAt
                  _deleted
                  lien
                  articleTypeId
                  Type {
                    alias
                    id
                    params
                    titre
                    _deleted
                  }
                  Media {
                    items {
                      h
                      description
                      id
                      titre
                      legende
                      url
                      w
                      _deleted
                    }
                  }
                }
              }
              description
              createdAt
              updatedAt
              categorieMiseEnPageId
              MiseEnPage {
                id
                type
                description
                _deleted
              }
              _deleted
            }
          }
        }`
      };
}