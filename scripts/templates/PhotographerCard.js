// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerCard {
  // reprend les attribut de Photographer
  constructor(photographer) {
    this._photographer = photographer;
    console.log("ici photographercard", photographer);
  }
  userCardDOM() {
    const article = document.createElement("article");
    const a = document.getElementById("photographer_id");
    // comment éviter l'aspect redondant ici
    const userCardDOM = `
    <a href="http://127.0.0.1:5500/photographer.html?id=${this._photographer._id}" id="photographer_id" class="photographer_id">
      <img 
        class="img_profil"
        alt=${this._photographer.name}
        src=${this._photographer.portrait}
      >
    </a>
        <p>${this._photographer.location}<p/>
        <p>${this._photographer.tagline}<p/>
        <span>${this._photographer.price}/jour<span/>
    `;

    article.innerHTML = userCardDOM;
    return article;
  }
}
