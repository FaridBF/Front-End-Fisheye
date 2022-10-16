// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerMediaCard {
  constructor(media) {
    this._media = media;
  }
  addMediaCardToDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card-article");
    // const imgaArticle = document.createElement("img");
    // imgaArticle.classList.add("media-card-imgaArticle");
    // const titleArticle = document.createElement("div");
    // titleArticle.classList.add("media-card-titleArticle");
    // const likesArticle = document.createElement("div");
    // likesArticle.classList.add("media-card-titleArticle");
    // <img
    //   alt=${this._media.image}
    //   src=${this._media.image}
    // >
    const mediaCardInDOM = `
        <p>${this._media.title}</p>
        <span>${this._media.likes}/jour</span>
      `;
    article.innerHTML = mediaCardInDOM;
    return article;
  }
}
