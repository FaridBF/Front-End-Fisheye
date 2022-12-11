/**
 * Classe représentant la "card" du media du photographe
 */
export default class PhotographerMediaCard {
  constructor(media, mediaType) {
    this._media = media;
    this._mediaType = mediaType;
  }

  /**
   * Gère l'ajout la "card" media sur le DOM en fonction du type
   * @returns
   */
  addMediaCardToDOM() {
    if (this._mediaType === "video") {
      return this.addMediaVideo(this._media);
    } else {
      return this.addMediaImage(this._media);
    }
  }

  /**
   * Ajoute la "card" media de type video sur le DOM
   * @param {objet} media
   * @returns article: balise article HTML à ajouter dans le DOM
   */
  addMediaVideo(media) {
    const article = document.createElement("article");
    article.classList.add("media_card_article");
    const titleArticle = document.createElement("div");
    titleArticle.classList.add("media_card_titleArticle");
    const likesArticle = document.createElement("div");
    likesArticle.classList.add("media_card_titleArticle");

    const mediaCardInDOM = `
    <video controls class="media_card_videoArticle media" tabindex="9">
    <source src="${media.media}"
            type="video/mp4">
    </video>
    <div class="container_title_like">
          <div>
            <p class="media_card_titleAndLikesArticle">${media.title}</p>
          </div>
        <span class="like modal-trigger">${media.likes}❤️</span>
    </div> 
    `;

    article.innerHTML = mediaCardInDOM;
    return article;
  }

  /**
   * Ajoute la "card" media de type image sur le DOM
   * ainsi que le contenu de la modale qui affiche le prix du photographe
   * et son total de likes
   * @param {objet} media
   * @returns article: balise article HTML à ajouter dans le DOM
   */
  addMediaImage(media) {
    const article = document.createElement("article");
    article.classList.add("media_card_article");
    const titleArticle = document.createElement("div");
    titleArticle.classList.add("media_card_titleArticle");
    const likesArticle = document.createElement("div");
    likesArticle.classList.add("media_card_titleArticle");
    const pricePhotographer = document.querySelector(".pricePhotographer");
    pricePhotographer.innerHTML = `${parseInt(media.price)}€ / jour`;

    const mediaCardInDOM = `
    <img
      class="media_card_imgArticle media"
      alt="${media.title}"
      src="${media.media}"
      tabindex="9"
    >
    <div class="container_title_like">
      <div tabindex="9">
        <p class="media_card_titleAndLikesArticle">${media.title}</p>
      </div>
      <div>
        <span tabindex="9" aria-describedby="like" class="like">${media.likes}❤️</span>
      </div>
    </div>
    `;

    article.innerHTML = mediaCardInDOM;
    return article;
  }
}
