// la class qui va instancier l'objet
class Index {
  constructor() {
    this.photographersSection = document.querySelector(".photographer_section");
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

  async init() {
    const photographersData = await this.photographersApi.getPhotographers();
    console.log("photographersData", photographersData);
    photographersData.photographers.forEach((photographer) => {
      // console.log("photographer index js", photographer);
      const photographerModel = photographerFactory(photographer);
      // console.log("photographerModel", photographerModel);
      // permet d'instancier la class PhotographersCard
      const photographerCard = new PhotographerCard(photographerModel);
      // console.log(photographerCard);
      const userCardDOM = photographerCard.userCardDOM();
      // console.log(userCardDOM);
      this.photographersSection.appendChild(userCardDOM);
    });
  }
}

const index = new Index();
index.init();
