// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerMediaCard {
  constructor(media, mediaType) {
    this._media = media;
    this._mediaType = mediaType;
  }

  addMediaCardToDOM() {
    if (this._mediaType === "video") {
      return this.addMediaVideo(this._media);
    } else {
      return this.addMediaImage(this._media);
    }
  }

  addMediaVideo(media) {
    const article = document.createElement("article");
    article.classList.add("media_card_article");
    article.addEventListener("click", () => {
      displayLightBoxModal();
    });
    const imgArticle = document.createElement("video");
    imgArticle.classList.add("media_card_imgArticle");
    const titleArticle = document.createElement("div");
    titleArticle.classList.add("media_card_titleArticle");
    const likesArticle = document.createElement("div");
    likesArticle.classList.add("media_card_titleArticle");

    const mediaCardInDOM = `
    <video controls class="media_card_videoArticle">
    <source src="${media.media}"
            type="video/mp4">
    </video>
        <p class="media_card_titleAndLikesArticle">${media.title}<span>${media.likes}❤️</span></p>
      `;
    article.innerHTML = mediaCardInDOM;
    return article;
  }

  addMediaImage(media) {
    const article = document.createElement("article");
    article.classList.add("media_card_article");
    article.addEventListener("click", () => {
      displayLightBoxModal();
    });
    const imgaArticle = document.createElement("img");
    imgaArticle.classList.add("media_card_imgArticle");
    const titleArticle = document.createElement("div");
    titleArticle.classList.add("media_card_titleArticle");
    const likesArticle = document.createElement("div");
    likesArticle.classList.add("media_card_titleArticle");

    const mediaCardInDOM = `
    <img
      class="media_card_imgArticle"
      alt=${media.title}
      src=${media.media}
    >
    <p class="media_card_titleAndLikesArticle">${media.title}<span>${media.likes}❤️</span></p>`;

    article.innerHTML = mediaCardInDOM;
    return article;
  }
}
