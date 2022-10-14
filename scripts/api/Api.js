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
    console.log(photographerId);
    // récup tableau des photographes
    const data = await this.get();
    // console.log(data);
    //récup uniquement de l'objet via l'ID
    const result = data.photographers.filter((photographer) => {
      return photographer.id == parseInt(photographerId);
    });
    // console.log(result);
    return result;
  }
}
