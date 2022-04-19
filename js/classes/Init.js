import { CustomArticle } from "./pages/DOM/Article.js";
import { Menu } from "./pages/DOM/Menu.js";
import { Graph } from "./data/Graph.js";

export class Init{

    graph; // Les infos du menu

    constructor(){
        this.graph = new Graph(document.querySelector('section.menu'));

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

