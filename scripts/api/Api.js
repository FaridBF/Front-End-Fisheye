//Permet de faire les requêtes HTTP etde me retourner les données transformées
class Api {
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then(async (res) => {
        return await res.json();
      })
      .catch((err) => console.log("an error occurs", err));
  }
}

// cette class hérite de la class API
class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }
  async getPhotographers() {
    return await this.get();
  }
  // pour un seul photographe récupéré via l'id
  async getPhotographer(photographerId) {
    // récup tableau des photographes
    const data = await this.get();
    //récup uniquement de l'objet via l'ID
    const result = data.photographers.filter((photographer) => {
      return photographer.id == parseInt(photographerId);
    });
    // console.log(result);
    return result;
  }
  /**
   * TODO: delete
   * @returns
   */
  // async getMedias() {
  //   const dataMedias = await this.get();
  //   console.log(dataMedias);
  //   const resultMedias = dataMedias.media.map((element) => {
  //     return element;
  //   });
  //   return resultMedias;
  // }

  /**
   * Récupère les medias d'un photographe par son ID
   * @param {*} photographerId
   * @returns liste d'objets medias
   */
  async getMediasByPhotographerId(photographerId) {
    // récup tableau des medias
    const dataMedias = await this.get();
    const resultMedias = dataMedias.media.filter((media) => {
      return media.photographerId == parseInt(photographerId);
    });
    return resultMedias;
  }
}
