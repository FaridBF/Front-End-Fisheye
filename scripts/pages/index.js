// la class qui va instancier l'objet
class Index {
  constructor() {
    this.photographersSection = document.querySelector(".photographer_section");
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

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
