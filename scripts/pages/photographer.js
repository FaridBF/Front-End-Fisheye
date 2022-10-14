class Photographer {
  constructor() {
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }
  async init() {
    //récupération de l'id uniquement via searchParams
    const photographerId = new URL(location.href).searchParams.get("id");
    //récupération de l'objet via l'ID
    const photographer = await this.photographersApi.getPhotographer(
      photographerId
    );
    /// afficher les informations de la banieres
    ///partir depuis factory + un model et un template  (même principe que index)
    //même modele finalement
    console.log("photographer", photographer);
    // const photographerModel = photographerFactory(photographer);
    // console.log("photographerModel", photographerModel);
  }
}

const photographer = new Photographer();
photographer.init();
