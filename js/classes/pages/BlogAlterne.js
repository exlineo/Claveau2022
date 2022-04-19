import { CustomPage } from "./DOM/Page.js";

export class CustomBlogAlterne extends CustomPage {

    cols; // Les cols de la mise en page

    constructor(cat, alias){
        super(cat, alias);
        this.target.classList.add('blog');
        this.cols = [];
        // Créer les infos des catégories
        this.setCat();
    }
    
}