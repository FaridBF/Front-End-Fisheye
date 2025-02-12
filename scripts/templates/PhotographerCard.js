/**
 * Classe représentant la "card" du photographe avec ses informations
 */
export default class PhotographerCard {
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
    const photographerCard = `
    <div>
       <div>
          <a href="http://127.0.0.1:5500/photographer.html?id=${this._photographer._id}" id="photographer_id" class="photographer_id">
            <img 
              class="img_profil"
              alt="Aller sur le profil de ce photographe"
              src="${this._photographer.portrait}"
            >
            <h1 class="title_profil">${this._photographer.name}</h1>
          </a>
        </div>

          <div tabindex="0" aria-label="Aller sur le descriptif de ce photographe" class="container_descriptif_profil">
            <p class="location_profil">${this._photographer.location}</p>
            <cite class="tagline_profil">${this._photographer.tagline}</cite>
              <span class="price_profil">${this._photographer.price}€/jour</span>
          </div>
      </div>

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
    const photographerSelectedCard = `
      <div class="photographer_container">
          <h1 tabindex="2" class="photographer_title_profil">${this._photographer.name}</h1>
        <div tabindex="3"  class="photographer_details">
          <p class="photographer_location_profil">${this._photographer.location}</p>
          <cite class="photographer_tagline_profil">${this._photographer.tagline}</cite>
        </div>
      </div>
      <button id="btnOpenContactForm" class="openContactForm" tabindex="4">Contactez-moi</button>
      <a href="http://127.0.0.1:5500/photographer.html?id=${this._photographer._id}" id="photographer_id" class="photographer_id" tabindex="5">
        <img 
          class="img_profil"
          alt=${this._photographer.name}
          src=${this._photographer.portrait}
        >
      </a>
    `;
    return photographerSelectedCard;
  }

  getNamePhotographer() {
    const photographerName = document.createElement("h1");
    const name = `<h1>${this._photographer.name}</h1>`;
    photographerName.innerHTML = name;
    return photographerName;
  }
}
