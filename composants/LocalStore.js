/** Hériter de possibilités de gestion des données */
export class LocalStore extends HTMLElement {

    index; // Chaîne qualifiant les données à ajouter ou extraire
    data;

    constructor(i) {
        super();
        this.index = i;
    }
    /** Ecrire les données en local */
    setStore(obj){
        console.log(obj);
        this.data = JSON.parse(obj);
        if(!window.localStorage.getItem(this.index)){
            window.localStorage.setItem(this.index, obj);
        }
    }
    /** Récupérer les données locales */
    getStore(){
        console.log(this.index);
        this.data = JSON.parse(window.localStorage.getItem(this.index));
        console.log("Data récoltées", this.data);
    }
    /** Supprimer les données à l'index */
    delStore(){
        window.localStorage.removeItem(this.index);
    }
}