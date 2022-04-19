/**
 * Sera étendue par les controller pour permettre l'échange de données et leur historisation
 */
export class ServiceStore {
  static instance;
  scope; // Scop transmis du service worker

  constructor(scope){
    this.scope = scope;
  }
  // Objet partagé entre les contrôleurs pour enregistrer les différents états
  storage = {
    
  };
  // Créer un singleton pour les données
  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new Context();
    }
    return this.instance;
  }
}