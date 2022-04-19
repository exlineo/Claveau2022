/** Hériter de possibilités de gestion des données */
export class LocalDB extends HTMLElement {

    indexedDB;
    open;
    db;
    store;
    tx;
    index;

    constructor(i="WebComponent") {
        super();
    }
    /** Initialiser la base de données */
    initLocalDb() {
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        this.open = this.indexedDB.open('WebComponentDB', 1); // Récupérer la version 1 de la BDD Web Component

        // Create the schema
        this.open.onupgradeneeded = (ev) => {
            console.log("onupgrade");
            this.db = this.open.result;
            this.store = this.db.createObjectStore("WebComponentStore", { keyPath: "id" });
            this.index = this.store.createIndex(this.index, []);
        };

        this.open.onsuccess = () => {
            // Start a new transaction
            this.db = this.open.result;
            this.tx = this.db.transaction("WebComponentStore", "readwrite");
            this.store = this.tx.objectStore("WebComponentStore");
            // this.index = this.store.index(this.index);
            // Close the db when the transaction is done
            this.tx.oncomplete = () => {
                this.db.close();
                console.log("transaction close");
            };

            this.tx.onerror = (ev) => {
                console.warn(this.tx.error);
            };

            console.log("Ouverture de la base réussie");
        }
    }
    /** Ajouter et mettre à jour des données dans le store */
    putStore(obj, key=null){
        console.log(this.store, this, this.db);
        let putS = this.store.put(obj, key);
        putS.onsuccess = () => {
            console.log(putS.transaction)
        }
    }
    /** Ajouter des données dans le store */
    addStore(obj){
        let addS = this.store.add(obj);
        putS.onsuccess = () => {
            console.log(putS.transaction)
        }
    }
    /** Récupérer des données du store */
    getStore(s){
        let getS = this.store.get(s);
        getS.onsuccess = () => {
            console.log(getS.result)
        }
    }
    /** Récupérer des données depuis un index dans le store */
    getIndex(i){
        let getI = this.store.get(s);
        getI.onsuccess = () => {
            console.log(getI.result)
        }
    }
}