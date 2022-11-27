import PhotographersApi from "../api/Api.js";
import photographerFactory from "../factories/photographer.js";
import PhotographerCard from "../templates/PhotographerCard.js";
/**
 * Classe représentant la gestion de la page principale
 * avec la liste des photographes
 */
class Index {
  constructor() {
    this.photographersSection = document.querySelector(".photographer_section");
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

  /**
   * Initialise la page principale pour afficher les photographes
   * via la factory du photographe
   */
  async init() {
    const photographersData = await this.photographersApi.getPhotographers();
    photographersData.photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      // permet d'instancier la class PhotographersCard
      const photographerCardItem = new PhotographerCard(photographerModel);
      const photographerCard = photographerCardItem.getPhotographerCard();
      this.photographersSection.appendChild(photographerCard);
    });
  }
}

const index = new Index();
index.init();
