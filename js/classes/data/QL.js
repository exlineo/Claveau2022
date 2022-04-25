export function headers(){
    const head = new Headers();
    head.append('Content-type', 'application/json');
    return head;
}
/** Requete pour récupérer la liste des articles */
export function reqArticles () {
    return JSON.stringify({query:`{
            articles{
            data{
                id
                attributes{
                Titre
                Intro
                MediaIntro{
                    data{
                    id
                    attributes{
                        name
                        url
                        previewUrl
                    }
                    }
                }
                Contenu
                MediaContenu{
                    data{
                    id
                    attributes{
                        name
                        url
                        previewUrl
                    }
                    }
                }
                Categorie{
                    data{
                    id
                    attributes{
                        Titre
                        Description
                        Media{
                        data{
                            id
                            attributes{
                            name
                            url
                            previewUrl
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }`})
};
// Requete pour récupérer la liste des catégories
export function reqCategories () {
    return JSON.stringify({query:`{
        categories{
         data{
           id
           attributes{
             Titre
             Alias
             Description
             Ordre
             Articles{
               data{
                 id
                 attributes{
                   Titre
                   Intro
                   Contenu
                   MediaIntro{
                     data{
                       id
                       attributes{
                         name
                         url
                         caption
                         alternativeText
                       }
                     }
                   }
                   MediaContenu{
                     data{
                       id
                       attributes{
                         name
                         url
                         caption
                         alternativeText
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       } 
   }
      `});
};
/** Requete pour récupérer la liste des articles */
export function reqDocs () {
  return JSON.stringify({query:`{
      documents{
        data{
          id
          attributes{
            Titre
            Alias
            Description
            Lien{
              Titre
              Url
              Description
              Cible
            }
          }
        }
      }
    }`
  })
};