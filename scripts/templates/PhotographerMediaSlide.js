/**
 * Classe représentant la "slide" du media du photographe sur le carroussel
 */
class PhotographerMediaSlide {
  constructor(media, mediaType) {
    this._media = media;
    this._mediaType = mediaType;
  }

  /**
   * Gère l'ajout la "slide" media sur le DOM en fonction du type
   * @returns
   */
  addMediaSlideToCarrousselDOM() {
    if (this._mediaType === "video") {
      return this.addMediaVideo(this._media);
    } else {
      return this.addMediaImage(this._media);
    }
  }

  /**
   * Ajoute la "slide" media de type video sur le DOM
   * @param {objet} media
   * @returns li: balise "li" HTML à ajouter dans le DOM
   */
  addMediaVideo(media) {
    const li = document.createElement("li");
    li.classList.add("slide");

    const mediaSlideInDOM = `
      <video tabindex="2" class="slide_content"
      controls >
      <source src="${media.media}"
              type="video/mp4">
      </video>
      <p tabindex="3" class="media_title" aria-labelledby="${media.title}">${media.title}</p>
      `;
    li.innerHTML = mediaSlideInDOM;
    return li;
  }

  /**
   * Ajoute la "slide" media de type image sur le DOM
   * @param {objet} media
   * @returns li: balise "li" HTML à ajouter dans le DOM
   */
  addMediaImage(media) {
    const li = document.createElement("li");
    li.classList.add("slide");

    const mediaSlideInDOM = `
      <img tabindex="2"
        class="slide_content"
        alt="${media.title}"
        src="${media.media}"
      >
      <p tabindex="3" class="media_title" aria-labelledby="${media.title}">${media.title}</p>
      `;
    li.innerHTML = mediaSlideInDOM;
    return li;
  }
}
