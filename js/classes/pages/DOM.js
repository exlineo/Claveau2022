import { ENV } from '../../../config/env.js';
import { CustomPopup } from './Popup.js';

export class CustomDOM extends CustomPopup {

    constructor() {
        super();
    }
    /** Créer un élément HTML : el = le nom de l'élément, target = l'id de l'élément cible, ...attr = la liste des éléments */
    setEl(el, ...attr) {
        let e = document.createElement(el);
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Ecrire un élément contenant du texte */
    setText(el, text=null, ...attr) {
        let e = document.createElement(el);
        if(text) e.textContent = text;
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Ecrire un élément contenant du HTML */
    setHtml(el, html=null, ...attr){
        let e = document.createElement(el);
        if(html) e.innerHTML = html;
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Créer une image avec arrière plan */
    setFigure(i, ...attr) {
        let fig = document.createElement('figure');
        if(i.url) this.setAttr(fig, {name:'style', value:`background-image:url(${this.setUrl(i.url)})`});
        if (attr) {
            this.setAttr(fig, ...attr);
        };
        if(i.url) return fig;
    }
    /** Créer une image */
    setImg(i, ...attr) {
        let img = document.createElement('img');
        if(i.url) img.src = this.setUrl(i.url);
        if(i.alternativeText) img.alt = i.alternativeText;
        if (attr) {
            this.setAttr(img, ...attr);
        };
        if(i.url) return img;
    }
    /** Créer un bouton avec un lien */
    setBouton(lien, target='_blank'){
        let bouton = document.createElement('button');
        bouton.textContent = 'En savoir plus';
        bouton.addEventListener('click', (e)=>{
            window.open(lien, target);
        });
        return bouton;
    }
    /** Créer un bouton avec un lien */
    setPopup(data){
        let bouton = document.createElement('button');
        bouton.textContent = 'En savoir plus';
        bouton.addEventListener('click', (e)=>{
            this.creePopup(data);
        })
        return bouton;
    }
    /** Ecrire un label avec l'année sur un article */
    setLabel(annee){
        let label = document.createElement('label');
        label.textContent = annee;
        return label;
    }
    /** Ecrire les attributs sur la balise */
    setAttr(e, ...attr){
        attr.forEach(
            a => {
                if(e) e.setAttribute(a.name, a.value);
            }
        )
    }
    /** Gérer un scroll d'un élément sur un clic de menu */
    setScroll(el, x, y){
        el.scrollBy({
            top:x,
            left:y,
            behavior:'smooth'
        });
    }
    /** Créer une url en adresse absolue */
    setUrl(u){
        return ENV.absurl+u;
    }
    /** Envoyer un événement pour signifier qu'il y a des articles à créer */
    // setArticlesEvent(alias, obj){
    //     let ev = new CustomEvent('articles', {"detail":{alias, obj}});
    //     dispatchEvent(ev);
    // }
    setMenu(el){
        let liens = el.querySelectorAll('a');
        if(liens.length > 0){
            liens.map(l => {
                let coord = l.getAttribute('href');
                l.addEventListener('click', (e)=>{
                    
                });
            });
        };
    }
}