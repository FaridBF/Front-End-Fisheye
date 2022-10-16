class Photographer {
  constructor() {
    this.photographersSection = document.querySelector(".photograph-header");
    this.photographerId = new URL(location.href).searchParams.get("id");
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }
  async init() {
    //récupération de l'id uniquement via searchParams
    // const photographerId = new URL(location.href).searchParams.get("id");
    //récupération de l'objet via l'ID
    const photographerData = await this.photographersApi.getPhotographer(
      this.photographerId
    );
    const photographer = photographerData[0];
    console.log("photographer", photographer);
    /// afficher les informations de la banieres
    ///partir depuis factory + un model et un template  (même principe que index)
    //même modele finalement
    const photographerModel = photographerFactory(photographer);
    console.log("photographerModel", photographerModel);
    // permet d'instancier la class PhotographersCard
    const photographerCard = new PhotographerCard(photographerModel);
    console.log(photographerCard);
    const userCardDOM = photographerCard.userCardDOM();
    console.log(userCardDOM);
    this.photographersSection.appendChild(userCardDOM);
  }
}

const photographer = new Photographer();
photographer.init();
