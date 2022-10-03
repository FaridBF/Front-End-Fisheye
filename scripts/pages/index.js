// la class qui va instancier l'objet
class Index {
  constructor() {
    this.photographersSection = document.querySelector(".photographer_section");
    // on va instancier le class PhotographersApi
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

  async init() {
    const photographersData = await this.photographersApi.getPhotographers();
    // console.log(photographersData);
    const photographersArray = photographersData.photographers.map(
      (photographer) => new photographerFactory(photographer)
    );
    // console.log(photographersArray);
    console.log("photographersData", photographersData);
    photographersData.photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      console.log("photographer", photographer);
      // const userCardDOM = photographerModel.UserCardDOM();
      // permet d'instancier la class PhotographersCard
      const Template = new PhotographersCard(photographer);
      this.photographersSection.appendChild(Template.userCardDOM);
    });
  }
}

const index = new Index();
index.init();
//       const { photographers } = await getPhotographers();
//       displayData(photographers);
//     }
