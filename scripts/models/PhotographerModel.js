class PhotographerModel {
  constructor(data) {
    // on va renseigner les propriétés d'instance de l'objet
    this._name = data.name;
    this._id = data.id;
    this._location = data.city + ", " + data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = `./assets/photographers/index/${data.portrait}`;
  }
  // j'ajoute des getters afin d'accéder aux propriétés de mon objet
  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get location() {
    return this._location;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get portrait() {
    // retourner le chemin de l'image: correspond à celle présente dans les assets en local
    return this._portrait;
  }
}
