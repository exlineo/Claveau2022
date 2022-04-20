import { REST } from "./data/REST.js";
import { CustomPage } from './pages/Page.js';

export class Init{

    REST; // Les infos du menu
    page; // La page des contenus

    constructor(){
        this.page = new CustomPage();

        // Service worker pour gérer le cache
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
            navigator.serviceWorker.register('./data/sw.js').then((registration) => {
                console.log(' Service de cache initialisé : ', registration.scope);
                // this.graph.setSW(registration.scope);
            }, function(err) {
                console.log('Erreur dans la mise en place du gestionnaire de cache ', err);
            });
            });
        }
    }
}

let init = new Init();

