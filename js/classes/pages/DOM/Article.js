import { CustomDOM } from "./DOM.js";

export class CustomArticle extends CustomDOM {
    alias;
    // articles;

    constructor() {
        super();
        this.md = new showdown.Converter();
    };

    /** Créer un article */
    setArticle(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });

        let obj = {}; // Objet d'initialisation

        if (a.imageA) { obj.imageA = this.setFigure(a.imageA) };
        if (a.titre) { obj.titre = this.setText('h2', a.titre) };
        if (a.accroche) { obj.accroche = this.setText('h3', a.accroche) };
        if (a.imageI) { obj.imageI = this.setFigure(a.imageI) };
        if (a.intro) { obj.intro = this.setText('p', a.intro) };
        if (a.contenu) { obj.contenu = this.setHtml('div', this.md.makeHtml(a.contenu)) };
        if (a.imageC) { obj.imageC = this.setImg(a.imageC) };
        if (a.lien) { obj.lien = this.setBouton(a.lien) }

        for (let i in obj) {
            article.appendChild(obj[i]);
        }

        let trait = document.createElement('hr');
        article.appendChild(trait);
        // Vérifier la présence de mailto
        this.sendMail(article);
        return article;

    };
    /** Créer un article ouvert avec une popup (pour les références) (un cartel ave une image) */
    setRef(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });

        let div = this.setEl('div');

        if (a.imageA) article.appendChild(this.setFigure(a.imageA));
        if (a.titre) div.appendChild(this.setText('h2', a.titre));
        if (a.accroche) div.appendChild(this.setText('h3', a.accroche));
        if (a.annee) div.appendChild(this.setLabel(a.annee));
        div.appendChild(this.setPopup(a));

        article.appendChild(div);
        // Vérifier la présence de mailto
        this.sendMail(article);
        return article;
    };
    /** Ouvrir une popup et écrire l'article cliqué dedans */
    setArticlePopup(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });

        let obj = {}; // Objet d'initialisation

        let div = document.createElement('div');
        if (a.titre) { obj.titre = this.setText('h2', a.titre) };
        if (a.accroche) { obj.accroche = this.setText('h3', a.accroche) };
        if (a.imageI) { obj.imageI = this.setFigure(a.imageI) };
        if (a.intro) { obj.intro = this.setText('p', a.intro) };
        if (a.contenu) { obj.contenu = this.setHtml('div', this.md.makeHtml(a.contenu)) };
        if (a.imageC) { obj.imageC = this.setImg(a.imageC) };
        if (a.lien) { obj.lien = this.setBouton(a.lien) };

        for (let i in obj) {
            div.appendChild(obj[i]);
        }

        if (a.imageA) article.appendChild(this.setFigure(a.imageA));
        article.appendChild(div);
        article.addEventListener('click', (e) => {
            e.preventDefault();
        });
        // Vérifier la présence de mailto
        this.sendMail(article);
        return article;
    }
    /** Envoyer un email en le cachant */
    sendMail(html) {
        let as = html.getElementsByTagName('a');
        for(let a of as){
            if (a.href.indexOf('mailto') != -1) {
                let b64 = a.href.substring(a.href.indexOf(':')+1);
                a.removeAttribute('href');
                b64 = window.atob(b64);
                a.addEventListener('click', ()=> window.open(`mailto:${b64}`));
            }
        };
    }
}