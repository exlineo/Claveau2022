import { CustomPage } from "./DOM/Page.js";

export class CustomColonnesDoubles extends CustomPage {
    cols; // Les cols de la mise en page

    constructor(cat, alias){
        super(cat, alias);
        this.target.classList.add('blog-double');
    }
    /** Créer deux colonnes */
    
}