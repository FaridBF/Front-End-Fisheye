// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerCard {
  // reprend les attribut de Photographer
  constructor(photographer) {
    this._photographer = photographer;
    // console.log("ici photographercard", photographer);
  }
  userCardDOM() {
    const article = document.createElement("article");
    const a = document.getElementById("photographer_id");
    const img = document.createElement("img");
    img.classList.add("img_profil");
    const h1 = document.createElement("h1");
    h1.classList.add("title_profil");
    const p = document.createElement("p");
    p.classList.add("location_profil");
    const p2 = document.createElement("p");
    p2.classList.add("tagline_profil");
    const span = document.createElement("span");
    span.classList.add("price_profil");
    // comment éviter l'aspect redondant ici

    const userCardDOM = `
    <a href="http://127.0.0.1:5500/photographer.html?id=${this._photographer._id}" id="photographer_id" class="photographer_id">
      <img 
        class="img_profil"
        alt=${this._photographer.name}
        src=${this._photographer.portrait}
      >
    </a>
        <h1 class="title_profil">${this._photographer.name}</h1>
        <p class="location_profil">${this._photographer.location}</p>
        <p class="tagline_profil">${this._photographer.tagline}</p>
        <span class="price_profil">${this._photographer.price}/jour</span>
    `;

    article.innerHTML = userCardDOM;
    return article;
  }
}
