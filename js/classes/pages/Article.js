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
    setArticleAlterne(a, n=0, bg=false){
        const article = document.createElement('article');

        const obj = {};
        if(a.Titre) {obj.titre = this.setText('h3', a.Titre)}
        if (a.Intro) { obj.intro = this.setHtml('div', this.md.makeHtml(a.Intro)) };
        if(a.Contenu) obj.pop = this.setPopup(a);

        if(n == 0){
            if (a.MediaIntro.data.attributes.url) {
                article.appendChild(this.setFigure(a.MediaIntro.data.attributes));
                obj.trait = document.createElement('hr');
                obj.trait.classList.add('bg-vert');
            };
        }else if(n % 2 == 0 && n != 0){
            if (a.MediaIntro.data.attributes.url) {
                article.appendChild(this.setFigure(a.MediaIntro.data.attributes));
                const trait = document.createElement('hr');
                trait.classList.add('bg-rose');
                article.appendChild(trait);
            };
            article.appendChild(this.setObj(obj, 'bg-rose'));
        }else if(n % 3 == 0 && n != 0){
            article.appendChild(this.setObj(obj, 'bg-rouge'));
            if (a.MediaIntro.data.attributes.url) {
                article.appendChild(this.setFigure(a.MediaIntro.data.attributes));
                const trait = document.createElement('hr');
                trait.classList.add('bg-rouge');
                article.appendChild(trait);
            };
        }else{
            if (a.MediaIntro.data.attributes.url) {
                article.appendChild(this.setFigure(a.MediaIntro.data.attributes));
                const trait = document.createElement('hr');
                trait.classList.add('bg-vert');
                article.appendChild(trait);
            };
            article.appendChild(this.setObj(obj, 'bg-vert'));
        };
        return article;
    }
    /** Ajouter les éléments d'un article dans l'article (sauf l'image) */
    setObj(obj, bg){
        const div = document.createElement('div');
        for (let o in obj) {
            div.appendChild(obj[o]);
        }
        if(bg) div.classList.add(bg);
        return div;
    }
    /** Ouvrir une popup et écrire l'article cliqué dedans */
    setArticlePopup(a) {
        console.log(a);
        const section = this.setEl('section');

        let obj = {}; // Objet d'initialisation
        if (a.MediaContenu.data) { obj.mediaContenu = this.setFigure(a.MediaContenu.data.attributes) };
        if(a.Titre) {obj.titre = this.setText('h1', a.Titre)}
        // if (a.Intro) { obj.intro = this.setHtml('article', this.md.makeHtml(a.Intro)) };
        if (a.Contenu) { obj.contenu = this.setHtml('article', this.md.makeHtml(a.Contenu)) };

        for (let i in obj) {
            section.appendChild(obj[i]);
        }

        // if (a.imageA) article.appendChild(this.setFigure(a.imageA));
        section.addEventListener('click', (e) => {
            e.preventDefault();
        });
        // Vérifier la présence de mailto
        this.sendMail(section);
        return section;
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