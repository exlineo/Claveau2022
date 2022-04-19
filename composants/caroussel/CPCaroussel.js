import { LocalDB } from '../LocalDB.js';
import { LocalStore } from '../LocalStore.js';

export class CPCaroussel extends LocalStore{
  /** Liste des slides à afficher dans le HTML */
  slides;
  shadow = this.attachShadow({mode: 'open'});
  /** Hauteur du slider */
  h;
  /** Numéro du slide à en cours d'affichage */
  slide = 0;

  static get observedAttributes() {
    return ['data-h', 'data-slides', 'data-index'];
  }

  constructor(){
    super();
    this.h = '500px';
    this.index = this.dataset.index;
  }
  /** Agir lorsque l'élément personnalisé est initialisé */
  connectedCallback() {
    this.dataset.h ? this.h = this.dataset.h + 'px' : this.h = '500px';
    this.setStyles(); // Ajouter les styles des slides

    this.init(); // Récupération des données pour afficher un slide
  };
  /** Initialisation du caroussel */
  init(){
      this.main = document.createElement('main');
      this.section = document.createElement('section');
      this.dataset.index && !this.dataset.slides ? this.getStore() : this.setStore(this.dataset.slides);

      this.addSlides();
  }
  /** Créer les slides (ou mettre en jour) */
  addSlides(){
    // Réinitialiser les données au cas d'une mise à jour
    if(this.getElementsByTagName('article')){
      this.main.innerHTML = '';
      this.slide = 0;
    }
    this.data.forEach(s => {
      let article = document.createElement('article');
      article.style.backgroundImage = `url('${s.img}')`;
      article.innerHTML = `
          <div style="background-color:${s.bgColor}">
              <h3>${s.title}</h3>
              <h5>${s.accroche.substring(0,120)}...</h5>

              <button href=${s.url}">voir plus</button>
          </div>
          <div>
            <img class="carousel-corner" src="${s.cornerImg}" alt="${s.title}" />
            <!-- <img class="carousel-img" src="${s.img}" alt="${s.title}"/> -->
          </div>
      `;
      this.section.appendChild(article);
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
    prev.addEventListener('click', ()=>this.pagination(-1));
    this.main.appendChild(prev);

    // Ajouter les slides dans la section principale
    this.main.appendChild(this.section);

    let next = document.createElement('div');
    next.classList.add('next');
    next.innerHTML = `
    <a class="arrow-up">
      <span class="left-arm"></span>
      <span class="right-arm"></span>
      <span class="arrow-slide"></span>
    </a>
    `;
    next.addEventListener('click', ()=>this.pagination(1));
    this.main.appendChild(next);

    this.shadow.appendChild(this.main);
  }
  /** Info sur la déconnexion de l'élément */
  disconnectedCallback() {
    console.log('Le slider a été enlevé de la pge');
  }
  adoptedCallback() {
    console.log('Slider bougé ailleurs.');
  }
  /** Surveiller des infos */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Attribut changé.', name, newValue);
    switch(name){
      case 'h':
        this.dataset.h ? this.h = this.dataset.h + 'px' : this.h = '500px';
        break;
      case 'slides':
        this.data = JSON.parse(this.dataset.slides);
        break;
    }
  }
  /** Gérer l'affichage des slides. n = orientation (1, -1) */
  pagination(n){
    if(n > 0 && this.slide < this.data.length-1){
      this.slide ++;
    } else if(n < 0 && this.slide > 0){
      this.slide --
    }
    // Positionner des éléments
    this.setPos();
  }
  /** Calculer la position du slide */
  setPos(){
    this.section.scroll({top:0, left:(this.section.offsetWidth * this.slide), behavior: 'smooth'});
  }
  /** Céer des styles dans l'éléement */
  setStyles(){
    let styles = document.createElement('style');
    styles.textContent = `
        main{
          margin:auto;
          position:relative;
          width:100%;
          height: ${this.h};
        }
        section {
            width: 100%;
            height: ${this.h};
            margin: auto;
            overflow:hidden;
            display:flex;
            flex-flow:row nowrap;
        }
        article{
          width:100%;
          height: ${this.h};
          display:flex;
          flex-shrink:0;

          margin:0;
          padding: 0;
          border:0;

          background-position: 100% 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        article > div:nth-child(1){
          width:40%;
          display:flex;
          flex-flow:column nowrap;
          padding:20px 10px 20px 40px;
        }
        article > div:nth-child(2){
          width:60%;
          position:relative;
        }
        .carousel-corner {
            position: absolute;
            bottom: 0;
            right: 0;
        }
        .carousel-img {
            object-fit: cover;
        }
        .prev, .next{
          position:absolute;
          top:calc(50% - 20px);
          width:40px;
          height:40px;
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
          // background-color: #111;
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
            background-color: #666;
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
            background-color: #666;
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
        }
  `;
  this.shadow.appendChild(styles);
  }
}
/** Define WebComponent */
customElements.define('cp-caroussel', CPCaroussel);
