export class CustomPopup{

    article; // l'article qu'il faut écrire

    constructor(){
    }
    /** Créer un popup */
    creePopup(a){
        // Enlever la popup su existante
        this.detruitPopup();

        this.article = a;
        
        let pop = document.createElement('section');
        pop.setAttribute('id', 'popup');
        let croix = document.createElement('a');
        croix.classList.add('close');
        croix.addEventListener('click', (e)=>{
            this.detruitPopup();
        });
        // Fermer la popup
        pop.addEventListener('click', (e)=>{
            e.preventDefault();
            if(e.target == e.currentTarget) this.detruitPopup();
        });
        pop.appendChild(croix);

        pop.appendChild(this.setArticlePopup(this.article));
        document.body.appendChild(pop);
    }
    /** Fermer la fenêtre */
    detruitPopup(){
        this.article = null;
        if(document.getElementById('popup')) document.body.removeChild(document.getElementById('popup'));
    }
}