class ImageModel {
  constructor(data) {
    // on va renseigner les propriétés d'instance de l'objet
    this._date = data.date;
    this._id = data.id;
    this._media = `./assets/medias/${data.photographerId}/${data.image}`;
    this._likes = data.likes;
    this._photographerId = data.photographerId;
    this._price = data.price;
    this._title = data.title;
  }
  // j'ajoute des getters afin d'accéder aux propriétés de mon objet
  get date() {
    return this._date;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get media() {
    // retourner le chemin de l'image: correspond à celle présente dans les assets en local ds le dossier ayant pour nom photographerId
    return this._media;
  }
  get likes() {
    return this._likes;
  }
  get photographerId() {
    return this._photographerId;
  }
  get price() {
    return this._price;
  }
  get title() {
    return this._title;
  }
}
