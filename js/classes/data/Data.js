// import Showdown from "showdown";

/** Stocker et gérer les données */
export class Data {
    
    constructor() {}
    /** Vérifier les données en cache avant de faire une requête */
    checkData(index, date = null) {
        let cache = localStorage.getItem(index);
        if (cache) {
            if (date && cache.indexOf(date) != -1) {
                return false
            }
            else {
                return JSON.parse(cache);
            };
        } else {
            return false
        };
    }
    /** Gérer l'écriture du cache dans la localStorage */
    storeData(index, obj){
        let cache = localStorage.getItem(index);
        if(cache != JSON.stringify(obj)) localStorage.setItem(index, JSON.stringify(obj));
    }
}