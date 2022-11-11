/**
 * Classe représentant la "card" du photographe avec ses informations
 */
class PhotographerCard {
  // reprend les attribut de Photographer
  constructor(photographer) {
    this._photographer = photographer;
  }

  /**
   * Permet l'affichage de chaque photographe
   * sur la page d'accueil
   * @returns article: balise article HTML à ajouter dans le DOM
   */
  getPhotographerCard() {
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

    const photographerCard = `
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

    article.innerHTML = photographerCard;
    return article;
  }

  /**
   * Permet l'affichage de la section photographe en en-tête
   * sur la page dédié à ce photographe
   * @returns photographerSelectedCard: template HTML à ajouter dans le DOM
   */
  getPhotographerSelectedCard() {
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

    const photographerSelectedCard = `
      <div class="photographer_container">
        <h1 class="photographer_title_profil">${this._photographer.name}</h1>
        <div class="photographer_details">
        <p class="photographer_location_profil">${this._photographer.location}</p>
        <p class="photographer_tagline_profil">${this._photographer.tagline}</p>
        </div>
      </div>
      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      <a href="http://127.0.0.1:5500/photographer.html?id=${this._photographer._id}" id="photographer_id" class="photographer_id">
        <img 
          class="img_profil"
          alt=${this._photographer.name}
          src=${this._photographer.portrait}
        >
      </a>
    `;
    return photographerSelectedCard;
  }
}
