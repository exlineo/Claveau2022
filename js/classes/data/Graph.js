import { Requetes } from './Requetes.js';
import { Menu } from '../pages/DOM/Menu.js';
import { ServiceStore } from './Service.js';

export class Graph extends Requetes {

    listeCategories = []; // Les données chargées
    config; // La configuration récupérée dans le JSON
    params; // Sauvegarde des paramètres de la requête
    el; // Elément HTML du menu à lui envoyer
    SW; // Référence au servcie Worker

    constructor(el) {
        super();
        this.el = el;
        this.getConfig();
    }
    /** Récuprer la configuration de la base */
    getConfig() {
        if (!this.config && this.listeCategories.length == 0) {
            fetch('../../config/graph.json')
                .then(res => res.json())
                .then(data => {
                    this.config = data;
                    this.requete('listeCategories', false);
                })
                .catch(er => console.log('Erreur de configuration', er))
        }else{
            this.requete('listeCategories', false);
        }
    }
    /** Faire une requête */
    requete(index, f = false) {
        // Vérification de l'état du cache. l'index n'y est pas, on fait une requête. f = true permet de forcer la requête
        if (!this.checkData(index) || f) {
            fetch(this.config.url, {
                method: 'POST',
                body: JSON.stringify({
                    query: this.reqCatagories()
                }),
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': this.config.apikey
                }
            }).then(data => {
                return data.json();
            }).then(d => {
                    this.setCategories(d.data.listCategories.items);
                    // Enregistrer les données
                    this.storeData('listeCategories', this.listeCategories);
                })
                .catch(console.error);
        } else {
            this.setCategories(this.checkData('listeCategories'));
        }
    };
    /** Récupérer les articles d'une page */
    getArticles(index) {
        if (this.listeCategories.length > 0) {
            return this.listeCategories.find(art => art.alias == index).Articles.items;
        } else {
            return false;
        };
    }
    /** Initialiser les valeurs des données et lancer le menu */
    setCategories(data){
        this.listeCategories = data;
        this.menu = new Menu(this.listeCategories);
    }
    /** Paramétrer le service worker si on peut */
    setSW(scope){
        this.SW = new ServiceStore(scope);
    }
}