import { Graph } from '../../data/Graph.js';
import { CustomDOM } from './DOM.js';
import { CustomBlog } from '../Blog.js';
import { CustomBlogAlterne } from '../BlogAlterne.js';
import { CustomColonnesDoubles } from '../ColonnesDoubles.js';
import { CustomColonnesTriples } from '../ColonnesTriples.js';
import { CustomContact } from '../Contact.js';
import { CustomPortfolio } from '../Portfolio.js';

/** Gestion du menu, des interactions avec les données et les pages */
export class Menu extends CustomDOM {
    el; // Elément HTML du menu
    liens = []; // Liste des liens du menu
    alias; // Un index reliant vers la page du menu
    graph; // La classe pour faire des requêtes GraphQL
    categorie; // Catégorie de contenus à afficher dan une page
    listeCategories; // Les données récupérées du serveur
    menuMobile; // Référence HTML du menu mobile
    pages = [
        {
            alias: '',
            classe: CustomBlog,
            instance: null
        },
        {
            alias: 'CustomBlog',
            classe: CustomBlog,
            instance: null
        }, {
            alias: 'CustomBlogAlterne',
            classe: CustomBlogAlterne,
            instance: null
        }, {
            alias: 'CustomColonnesDoubles',
            classe: CustomColonnesDoubles,
            instance: null
        }, {
            alias: 'CustomColonnesTriples',
            classe: CustomColonnesTriples,
            instance: null
        }, {
            alias: 'CustomContact',
            classe: CustomContact,
            instance: null
        }, {
            alias: 'CustomPortfolio',
            classe: CustomPortfolio,
            instance: null
        }];

    constructor(data) {
        super();
        this.listeCategories = data;
        this.check = document.querySelector('input.menu-toggler');
        this.liens = document.querySelectorAll('li.menu-item, section.pied a, section.mobile li');
        this.menuMobile = document.querySelector('section.mobile ul');
        this.getAncre();
    };
    /** Identifier si un hash est présent dans l'adresse > la page a été actualisée */
    getAncre(){
        this.alias = (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : 'exlineo';
        this.setEvents();
    }
    /** Etablir les événements de clic */
    setEvents() {
        this.liens.forEach(l => {
            l.addEventListener('click', (e) => {
                this.check.checked = false; // On décheck la checkbox
                if (l.dataset.index) this.alias = l.dataset.index;
                // Fermer le menu mobile si besoin
                this.ouvreMenuMobile()
                this.setPage();
            })
        });
        this.setMobile();
        this.setPage();
    };
    /** Retrouver une classe en fonction d*/
    findClasse() {
        return this.pages.map(c => {
            if(!this.categorie.MiseEnPage.type) this.categorie.MiseEnPage.type = 'CustomBlog';
            if (c.alias == this.categorie.MiseEnPage.type) {
                c.instance = new c.classe(this.categorie, this.alias);
                // return c;
            }
        });
    }
    /** Caler les données de la page */
    setPage() {
        // Récupérer la catégorie en cours
        this.categorie = this.getCategorie(this.alias);
        this.findClasse();
    }
    /** Récupérer les articles d'une page */
    getCategorie(index) {
        if (this.listeCategories.length > 0) {
            return this.listeCategories.find(art => art.alias == index);
        } else {
            return false;
        };
    }
    /** Caler les comportement du menu mobile */
    setMobile(){
        document.querySelector('.burger').addEventListener('click', (e)=> {
            this.ouvreMenuMobile();
        })
    }
    /** Automatiser l'ouerture et la fermeture du menu mobile */
    ouvreMenuMobile(){
        this.menuMobile.classList.toggle('ouvert');
    }
}
