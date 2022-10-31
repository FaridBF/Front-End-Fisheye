class Photographer {
  constructor() {
    this.photographerHeader = document.querySelector(".photograph-header");
    this.mediasSection = document.querySelector(".media-card-container");
    this.slidesContainer = document.querySelector("#slides-container");
    // récupération de l'id uniquement via searchParams
    this.photographerId = new URL(location.href).searchParams.get("id");
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

  async init() {
    this.displayPhotographerSelected();
    await this.displayPhotographerMedias();
    this.addClickEventOnCards();
  }

  /**
   * Afficher les données du photographe sélectioné dans la section prévue
   */
  async displayPhotographerSelected() {
    const photographerData = await this.photographersApi.getPhotographer(
      this.photographerId
    );
    const photographer = photographerData[0];
    // partir depuis factory + un model et un template
    const photographerModel = photographerFactory(photographer);
    // permet d'instancier la class PhotographersCard
    const photographerCardItem = new PhotographerCard(photographerModel);
    const photographerCard = photographerCardItem.getPhotographerSelectedCard();
    this.photographerHeader.innerHTML = photographerCard;
  }

  /**
   * Afficher les médias du photographe sélectioné
   */
  async displayPhotographerMedias() {
    const photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    photographerDataMediasArray.forEach((media) => {
      const mediaType = "image" in media ? "image" : "video";
      const photographerMediaModel = photographerMediaFactory(media, mediaType);
      const photographerMediaCard = new PhotographerMediaCard(
        photographerMediaModel,
        mediaType
      );
      const mediaCardInDOM = photographerMediaCard.addMediaCardToDOM();
      this.mediasSection.appendChild(mediaCardInDOM);
    });
  }

  /**
   * Ajout de l'écouteur d'évènements sur les médias
   * et appel de la fonction qui affiche le carroussel
   */
  addClickEventOnCards() {
    const mediaCards = Array.from(
      document.getElementsByClassName("media_card_article")
    );
    for (let i = 0; i < mediaCards?.length; i++) {
      mediaCards[i].addEventListener("click", (e) => {
        // e.preventDefault();
        this.displayMediaCarroussel(i);
      });
    }
  }

  /**
   * Affiche le carroussel qui fait défiler les medias
   * @param {number} i index du media cliqué
   */
  async displayMediaCarroussel(i) {
    console.log("displayMediaCarroussel", i);

    const photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    // réordonner le tableau en fonction de l'image sur laquelle l'utilisateur a cliqué
    photographerDataMediasArray.forEach((media, index) => {
      if (index === i) {
        photographerDataMediasArray.splice(i, 1);
        photographerDataMediasArray.unshift(media);
      }
    });
    console.log("ordre tableau", photographerDataMediasArray);
    // après avoir réordonné le tableau
    photographerDataMediasArray.forEach((media, index) => {
      const mediaType = "image" in media ? "image" : "video";
      const photographerMediaModel = photographerMediaFactory(media, mediaType);
      const photographerMediaSlide = new PhotographerMediaSlide(
        photographerMediaModel,
        mediaType
      );
      console.log(photographerMediaSlide);
      const mediaSlideInDOM =
        photographerMediaSlide.addMediaSlideToCarrousselDOM();
      this.slidesContainer.appendChild(mediaSlideInDOM);
    });
  }
}

const photographer = new Photographer();
photographer.init();
