import { CustomArticle } from "./Article.js";
import { REST } from '../data/REST.js';

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    listeArticles = []; // La liste des articles de la page
    listeCategories = []; // Liste des articles et des catégories
    engageEl; // Ou écrire les engagements
    propEl; // Ou écrire les propostions
    rest; // La classe pour faire les requêtes
    etat=false; // Indiquer si les contenus ont déjà été écrits...

    constructor() {
        super();
        this.engageEl = document.getElementById('engagements');
        this.propEl = document.getElementById('propositions');
        
        this.rest = new REST();
        // Recevoir les articles lorsqu'ils ont été traités par la requête REST
        addEventListener('setArticles', ()=>{
            console.log('Articles reçus', e.detail);
            this.listeArticles = e.detail;
        });
        // Recevoir les articles lorsqu'ils ont été traités par la requête REST
        addEventListener('setCat', (e)=>{
            this.listeCategories = e.detail;
            console.log('Catégories reçues', this.listeCategories);
            if(!this.etat) this.setPage();
        });
    }
    /** Ecrire les données dans la page */
    setPage(){
        this.setEntete(document.getElementById('entete'), this.getArticlesFiltres('entete')[0].attributes);
        this.setArticlesAlternes(this.engageEl, this.getArticlesFiltres('engagements'), true);
        this.setArticlesAlternes(this.propEl, this.getArticlesFiltres('propositions'));
        this.setDocuments(document.querySelector("footer > div:nth-child(1)"))
    }
    /** Trouver la liste des articles en fonction de leur catégorie
     * @param {string} cat Nom de la catégorie à filtrer
    */
    getArticlesFiltres(cat){
        let tmp = this.listeCategories.filter(c => c.attributes.Alias == cat);
        return tmp[0].attributes.Articles.data;
    }
    /** Créer les articles des engagements et propositions */
    setArticlesAlternes(el, articles=[], bg=false){
        console.log("Appel du listing des articles");
        let n = 0;
        articles.forEach(a => {
            el.appendChild(this.setArticleAlterne(a.attributes, n, bg));
            ++n;
        });
    }
    /** Afficher la liste des communiqués de presse */
    setDocuments(el){

    }
    /** afficher la liste des déplacements */
    setDatesAgenda(el){
        
    }
    /** Trier les articles */
    triArticles(paire) {
        let n = 0;
        if (!paire) n = 1;
        for (let a = 0; a < this.categorie.Articles.items.length; ++a) {
            if (a % n == 1) this.articles.push(this.categorie.Articles.items[a]);
        };
    }
    /** Afficher la liste des articles sélectionnés */
    listeArticles(localTarget, articles) {
    }
    /** Ecrire un menu si des liens sont détectés */
    setMenu(el) {
        try {
            let liens = el.querySelectorAll('a');
            if (liens.length > 0) {
                for (let l of liens) {
                    // let h2 = this.cols[1].querySelectorAll('h2');
                    // liens.map(l => {
                    let tmp = l.getAttribute('href').substr(1, l.getAttribute('href').length)
                    l.setAttribute('data-lien', tmp);
                    l.setAttribute('data-y', document.getElementById(tmp).getBoundingClientRect().y);
                    l.removeAttribute('href');
                    // Gérer les clic sur le lien
                    l.addEventListener('click', (e) => {
                        let y = e.target.dataset.y - this.cols[1].getBoundingClientRect().y;
                        this.cols[1].scrollTo({
                            top: y,
                            behavior: 'smooth'
                        });
                    });
                };
            }
        } catch (er) { console.log(er) };
    }
}