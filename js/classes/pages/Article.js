import { CustomDOM } from "./DOM.js";

export class CustomArticle extends CustomDOM {
    alias;
    // articles;

    constructor() {
        super();
        // showdown.setOption('noHeaderId', true);
        this.md = new showdown.Converter();
        // this.md.setOption('noHeaderId', false);
    };
    /** Créer un article d'engagement */
    setEngagements(){

    }
    /** Créer l'entête de la page */
    setEntete(el, a){
        const obj = {};
        if (a.Intro) { obj.intro = this.setHtml('div', this.md.makeHtml(a.Intro)) };
        if (a.Contenu) { obj.contenu = this.setHtml('div', this.md.makeHtml(a.Contenu.substring(0, 150))) };
        if (a.MediaIntro.data.attributes.url) { obj.mediaIntro = this.setFigure(a.MediaIntro.data.attributes) };

        for (let o in obj) {
            el.appendChild(obj[o]);
        }
        el.querySelector('div:nth-child(2)').appendChild(this.setPopup(a));
    }
    /** Créer les articles pour les engagements */
    setArticleAlterne(a, paire=0, bg=false){
        console.log(a);
        let article = document.createElement('article');

        const obj = {};
        if(paire % 2 == 0){
            if (a.MediaIntro.data.attributes.url) { obj.mediaIntro = this.setFigure(a.MediaIntro.data.attributes) };
            if(a.Titre) {obj.titre = this.setText('h3', a.Titre)}
            if (a.Intro) { obj.intro = this.setHtml('div', this.md.makeHtml(a.Intro)) };
            if(bg) article.classList.add('bg-rose');
        }else if(paire % 3 == 0){
            if(a.Titre) {obj.titre = this.setText('h3', a.Titre)}
            if (a.Intro) { obj.intro = this.setHtml('div', this.md.makeHtml(a.Intro)) };
            if (a.MediaIntro.data.attributes.url) { obj.mediaIntro = this.setFigure(a.MediaIntro.data.attributes) };
            if(bg) article.classList.add('bg-vert');
        }else{
            if(a.Titre) {obj.titre = this.setText('h3', a.Titre)}
            if (a.Intro) { obj.intro = this.setHtml('div', this.md.makeHtml(a.Intro)) };
            if (a.MediaIntro.data.attributes.url) { obj.mediaIntro = this.setFigure(a.MediaIntro.data.attributes) };
            if(bg) article.classList.add('bg-rouge');
        }

        for (let o in obj) {
            article.appendChild(obj[o]);
        }

        article.appendChild(this.setPopup(a));
        return article;
    }
    /** Créer un article */
    setArticle(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });

        const obj = {}; // Objet d'initialisation

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