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
}
