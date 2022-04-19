import { CustomArticle } from "./Article.js";

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    etat = false; // Vérifier si du contenu est déjà écrit dans la page
    categorie; // La catégorie avec toutes les données dynamiques dedans
    articles = []; // La liste des articles de la page
    style; // Le style a appliquer à une page
    target; // L'élément HTML dans lequel on écrit
    cols = []; // Ls colonnes à ajouter aux pages

    constructor(cat, alias) {
        super();
        this.categorie = cat;
        this.alias = alias;
        this.target = document.getElementById(alias);
        this.getEtat();
    }
    /** Obtenir l'état de la page pour savoir s'il faut la réécrire le contenu */
    getEtat() {
        this.target.querySelectorAll('section').length > 0 ? this.etat = true : this.etat = false;
    }
    /** Créer les articles de la page */
    setArticles(localTarget, articles, paire) {
        localTarget.innerHtml = '';
        if (paire != undefined) {
            this.triArticles(paire);
        }
        else {
            this.articles = this.categorie.Articles.items;
        }
        // Afficher les articles dans la page
        this.listeArticles(localTarget, articles);
    }
    /** Trier les articles */
    triArticles(paire) {
        let n = 0;
        if (!paire) n = 1;
        for (let a = 0; a < this.categorie.Articles.items.length; ++a) {
            if (a % n == 1) this.articles.push(this.categorie.Articles.items[a]);
        };
    }
    /** Afficher la liste des articles sélectionnés */
    listeArticles(localTarget, articles) {
        articles.forEach(a => {
            // Créer des articles complets ou juste l'intro en fonction de la mise en page
            this.categorie.MiseEnPage.type != 'CustomPortfolio' ? localTarget.appendChild(this.setArticle(a)) : localTarget.appendChild(this.setRef(a));
        })
    }
    /** LES SECTIONS */
    /** Ecrire le contenu sur la gauche de la colonne */
    setCat() {
        if (this.etat) return;
        let descr;
        // Créer à la colonne avec la catégorie
        this.cols[0] = this.setEl('section');
        if (this.categorie.image) this.setAttr(this.cols[0], { name: 'style', value: `background-image:url('${this.categorie.image}');` });

        let art = this.setEl('article');
        let titre = this.setText('h1', this.categorie.titre);
        art.appendChild(titre);

        if (this.categorie.accroche) {
            let bloc = this.setHtml('h2', this.categorie.accroche);
            art.appendChild(bloc);
        };
        if (this.categorie.description) {
            descr = this.setHtml('div', this.md.makeHtml(this.categorie.description));
            art.appendChild(descr);
        };
        this.cols[0].appendChild(art);

        this.target.appendChild(this.cols[0]);
        // Céer la colonne avec les articles
        this.setCol(this.categorie.Articles.items);
        // Créer un menu dans sous la catégorie
        this.setMenu(descr);
    }
    /** Définir la mise en page avec un nombre de colonnes */
    setCol(content) {
        if (this.etat) return;
        this.cols.push(this.setEl('section'));
        this.target.appendChild(this.cols[this.cols.length - 1]);
        // Créer les articles du blog
        // this.setContent(this.cols[this.cols.length-1], content);
        this.listeArticles(this.cols[this.cols.length - 1], content);
    }
    /** Afficher des articles dans une colonne */
    // setContent(el, content) {
    //     this.listeArticles(el, content);
    // }
    /** Ecrire un menu si des liens sont détectés */
    setMenu(el) {
        try {
            let liens = el.querySelectorAll('a');
            if (liens.length > 0) {
                for (let l of liens) {
                    // let h2 = this.cols[1].querySelectorAll('h2');
                    // liens.map(l => {
                    let tmp = l.getAttribute('href').substr(1, l.getAttribute('href').length)
                    l.setAttribute('data-lien', tmp);
                    l.setAttribute('data-y', document.getElementById(tmp).getBoundingClientRect().y);
                    l.removeAttribute('href');
                    // Gérer les clic sur le lien
                    l.addEventListener('click', (e) => {
                        let y = e.target.dataset.y - this.cols[1].getBoundingClientRect().y;
                        this.cols[1].scrollTo({
                            top: y,
                            behavior: 'smooth'
                        });
                    });
                };
            }
        } catch (er) { console.log(er) };
    }
}