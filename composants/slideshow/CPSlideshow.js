import { LocalDB } from '../LocalDB.js';

export class CPSlideshow extends LocalDB {
  /** Liste des slides à afficher dans le HTML */
  slides;
  dots;
  shadow = this.attachShadow({ mode: 'open' });
  /** Hauteur du slider */
  h;
  /** Numéro du slide à en cours d'affichage */
  slide = 0;

  static get observedAttributes() {
    return ['data-h', 'data-slides'];
  }

  constructor() {
    super();
    this.h = '500px';
    this.section = document.createElement('section');
    this.nav = document.createElement('nav');
  }
  /** Agir lorsque l'élément est initialisé */
  connectedCallback() {
    this.attributes.h ? this.h = this.dataset.h + 'px' : this.h = '500px';
    this.setStyles(); // Ajouter les styles des slides

    this.addSlides(); // Ajouter les slides à l'initialisation
  };
  /** Créer les slides (ou mettre en jour) */
  addSlides() {
    let index = 0;
    // Réinitialiser les données au cas d'une mise à jour
    if (this.getElementsByTagName('article')) {
      this.section.innerHTML = '';
      this.slide = 0;
    }
    // Traitement des données et création des slides
    this.slides = JSON.parse(this.dataset.slides);
    this.slides.forEach(s => {
      let article = document.createElement('article');
      article.classList.add('fade');
      article.setAttribute("style", "background-image:url('" + s.img + "')");
      article.innerHTML = `
        <div class="numbertext">${index + 1} / ${this.slides.length}</div>
        <div class="text"><p>${s.legende}</p></div>
      `;
      this.section.appendChild(article);
      this.setDots(index);
      index++;
    });

    // Créer les boutons et afficher le contenu
    let prev = document.createElement('div');
    prev.classList.add('prev');
    prev.innerHTML = `
    <a class="arrow-up">
      <span class="left-arm"></span>
      <span class="right-arm"></span>
      <span class="arrow-slide"></span>
    </a>
    `;
    prev.addEventListener('click', () => this.afficheSlide(this.slide - 1));
    this.section.appendChild(prev);

    let next = document.createElement('div');
    next.classList.add('next');
    next.innerHTML = `
    <a class="arrow-up">
      <span class="left-arm"></span>
      <span class="right-arm"></span>
      <span class="arrow-slide"></span>
    </a>
    `;
    next.addEventListener('click', () => this.afficheSlide(this.slide + 1));
    this.section.appendChild(next);

    // Afficher la navigation par points et la section avec les articles
    this.shadow.appendChild(this.section);
    this.shadow.appendChild(this.nav);

    // Afficher le premier slide
    this.afficheSlide(0);
  }
  /** Points cliquables */
  setDots(n) {
    let span = document.createElement('span');
    span.classList.add('dot');
    span.addEventListener('click', () => {
      this.afficheSlide(n)
    });
    this.nav.appendChild(span);
  }
  /** Afficher le slide en cours */
  afficheSlide(n) {
    let slidesDOM = this.section.querySelectorAll("article");
    let dots = this.nav.querySelectorAll(".dot");

    if (n > slidesDOM.length-1) { this.slide = 0; }
    else if (n < 0) { this.slide = slidesDOM.length-1; }
    else {this.slide = n;};

    let i;
    for (i = 0; i < slidesDOM.length; i++) {
      slidesDOM[i].classList.remove('block');
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slidesDOM[this.slide].classList.add('block');
    dots[this.slide].className += " active";
  }
  /** Info sur la déconnexion de l'élément */
  disconnectedCallback() {
    console.log('Le slideshow a été enlevé de la page');
  }
  adoptedCallback() {
    console.log('Slideshow bougé ailleurs.');
  }
  /** Surveiller des infos */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data-h':
        this.attributes.h ? this.h = this.dataset.h + 'px' : this.h = '500px';
        break;
      case 'data-slides':
        this.slides = JSON.parse(this.dataset.slides);
        break;
    }
  }

  /** Céer des styles dans l'éléement */
  setStyles() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host{
      position: relative;
      width:100%;
    }
    * {box-sizing:border-box}
    section {
      width: 100%;
      height:${this.h};
      position: relative;
      margin: auto;
      overflow:hidden;
    }
    nav{
      width:10vw;
      text-align:center;
      position:absolute;
      bottom:5px;
      z-index:99;
    }
    article {
      display:none;
      width:100%;
      height:100%;
      background:50% no-repeat;
      background-size:cover;
      overflow:hidden;
      position:relative;
    }
    article > img{
      min-height:100%;
      min-width:100%;
    }
    .prev, .next{
      position:absolute;
      top:calc(50% - 20px);
      width:40px;
      height:40px;
      z-index:999;
    }
    .prev{
      left:0;
      transform:rotate(-90deg);
    }
    .next{
      right:0;
      transform:rotate(90deg);
    }
    .arrow-up {
      background-color: #111;
      height: 40px;
      width: 40px;
      display: block;
      border: 1px solid #666;
      position: relative;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 1.5);
      overflow: hidden;
    }
    .arrow-slide {
      left: 0;
      top: -100%;
      width: 100%;
      height: 100%;
      background: #666;
      position: absolute;
      display: block;
      z-index: 0;
    }
    .left-arm {
      position: absolute;
      z-index: 1;
      background-color: transparent;
      top: 19px;
      left: 3px;
      width: 20px;
      display: block;
      transform: rotate(-45deg);
    }
    .left-arm:after {
        content: "";
        background-color: #CCC;
        width: 20px;
        height: 1px;
        display: block;
        border-radius: 1px;
        transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 1.5);
        transform-origin: right center;
        z-index: -1;
    }
    .right-arm {
      position: absolute;
      z-index: 1;
      background-color: transparent;
      top: 19px;
      left: 17px;
      width: 20px;
      display: block;
      transform: rotate(45deg);
      border-radius: 2px;
    }
    .right-arm:after {
        content: "";
        background-color: #CCC;
        width: 20px;
        height: 1px;
        display: block;
        border-radius: 1px;
        transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 1.5);
        transform-origin: left center;
        z-index: -1;
    }
    .arrow-up:hover {
      transition: all .1s;
    }
    .arrow-up:hover  .left-arm:after {
        transform: rotate(-10deg);
      }
    .arrow-up:hover  .right-arm:after {
        transform: rotate(10deg);
      }
    .arrow-up:hover  .arrow-slide {
        transition: all .4s ease-in-out;
        transform: translateY(200%);
    }
    .text {
      color: #f2f2f2;
      position:absolute;
      bottom:0;
      width:100%;
      font-size:150%;
      text-align: center;
      display:flex;
      justify-content:center;
    }
    .text > p{
      background:rgba(0,0,0,.8);
      width:60%;
      padding: 12px 20px;
    }
    .numbertext {
      color: #f2f2f2;
      font-size: 12px;
      padding: 8px 12px;
    }
    .dot {
      cursor: pointer;
      height: 15px;
      width: 15px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.6s ease;
    }
    .active, .dot:hover {
      background-color: #717171;
    }
    .fade {
      -webkit-animation-name: fade;
      -webkit-animation-duration: 1.5s;
      animation-name: fade;
      animation-duration: 1.5s;
    }
    .block{
      display:flex;
    }
    @-webkit-keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }
    @keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }
  `;
    this.shadow.appendChild(styles);
  }
}
customElements.define('cp-slideshow', CPSlideshow);