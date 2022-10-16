class Photographer {
  constructor() {
    this.photographersSection = document.querySelector(".photograph-header");
    this.mediasSection = document.querySelector(".media-card-container");
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
    // console.log("photographer", photographer);
    /// afficher les informations de la banieres
    ///partir depuis factory + un model et un template  (même principe que index)
    //même modele finalement
    const photographerModel = photographerFactory(photographer);
    // console.log("photographerModel", photographerModel);
    // permet d'instancier la class PhotographersCard
    const photographerCard = new PhotographerCard(photographerModel);
    // console.log(photographerCard);
    const userCardDOM = photographerCard.userCardDOM();
    // console.log(userCardDOM);
    this.photographersSection.appendChild(userCardDOM);

    /////////////////////////////////////////////////////
    ///gestion des médias//////
    const photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    // console.log("photographerDataMediasArray", photographerDataMediasArray);

    photographerDataMediasArray.forEach((media) => {
      //
      const mediaType = "image" in media ? "image" : "video";
      // const mediaType = "image" in media ? "image" : "video" in media ? "video" : "erreur";
      const photographerMediaModel = photographerMediaFactory(media, mediaType);
      const photographerMediaCard = new PhotographerMediaCard(
        photographerMediaModel
      );
      // console.log(photographerMediaCard);
      const mediaCardInDOM = photographerMediaCard.addMediaCardToDOM();
      // console.log(mediaCardInDOM);
      this.mediasSection.appendChild(mediaCardInDOM);
    });
  }
}

const photographer = new Photographer();
photographer.init();
