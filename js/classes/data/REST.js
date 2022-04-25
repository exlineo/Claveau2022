import { ServiceStore } from './Service.js';
import { ENV } from '../../../config/env.js';
import { Data } from './Data.js';
import { reqArticles, reqCategories, headers, reqDocs } from './QL.js';

export class REST extends Data {
    config; // La configuration récupérée dans le JSON
    params; // Sauvegarde des paramètres de la requête
    SW; // Référence au servcie Worker
    articlesEvent;

    constructor(el) {
        super();
        // this.getArticles();
        // this.graphArticle();
        this.graphCategories();
    }
    /** Récupérer l'ensemble des articles */
    getArticles(){
        console.log("get articles");
        fetch(ENV.dataurl + 'articles')
        .then(d => d.json())
        .then(d => {
            this.listeArticles = d.data;
            console.log(this.listeArticles);
            dispatchEvent(this.articlesEvent);
        })
        .catch(er => console.log(er));
    }
    /** Récupérer les articles avec GraphQL */
    graphArticle(){
        console.log("Get trucs graph");
        fetch(ENV.graphurl, {
            method: 'post',
            headers:headers(),
            body: reqArticles()
          })
          .then(d => d.json())
          .then(d => {
              this.articlesEvent = new CustomEvent('setArticles', {detail:d.data.artcicles.data});
              dispatchEvent(this.articlesEvent);
              console.log(d);
            })
          .catch(er => console.log(er));
    }
    /** Récupérer les infos (et articles) d'une catégorie
     * @param {string} cat nom de la catégorie à récupérer
     */
    graphCategories(cat){
        console.log("get catagories");
        fetch(ENV.graphurl, {
            method: 'post',
            headers:headers(),
            body: reqCategories()
          })
        .then(c => c.json())
        .then(c => {
            this.catEvent = new CustomEvent('setCat', {detail:c.data.categories.data});
            dispatchEvent(this.catEvent);
            this.getAgenda();
        })
        .catch(er => console.log(er));
    }
    /** Paramétrer le service worker si on peut */
    setSW(scope){
        this.SW = new ServiceStore(scope);
    }
    /** Récupérer la liste des articles de l'agenda */
    getAgenda(){
        fetch(ENV.resturl + 'agendas')
        .then(c => c.json())
        .then(c => {
            this.datesEvent = new CustomEvent('setAgenda', {detail:c.data});
            dispatchEvent(this.datesEvent);
            this.graphDocs();
        })
        .catch(er => console.log(er));
    }
    /** Récupérer la liste des articles des communiqués de presse */
    getDocuments(){
        fetch(ENV.resturl + 'documents')
        .then(c => c.json())
        .then(c => {
            this.docsEvent = new CustomEvent('setDocs', {detail:c.data});
            dispatchEvent(this.docsEvent);
        })
        .catch(er => console.log(er));
    }
    /** Récupérer les infos (et articles) d'une catégorie
     * @param {string} cat nom de la catégorie à récupérer
     */
     graphDocs(cat){
        console.log("get catagories");
        fetch(ENV.graphurl, {
            method: 'post',
            headers:headers(),
            body: reqDocs()
          })
        .then(c => c.json())
        .then(c => {
            this.catEvent = new CustomEvent('setDocs', {detail:c.data.documents.data});
            dispatchEvent(this.catEvent);
        })
        .catch(er => console.log(er));
    }
}