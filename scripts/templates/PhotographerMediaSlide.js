class PhotographerMediaSlide {
  constructor(media, mediaType) {
    this._media = media;
    // console.log("media", media);
    this._mediaType = mediaType;
  }

  addMediaSlideToCarrousselDOM() {
    if (this._mediaType === "video") {
      return this.addMediaVideo(this._media);
    } else {
      return this.addMediaImage(this._media);
    }
  }

  addMediaVideo(media) {
    // créer li de video
    const li = document.createElement("li");
    li.classList.add("slide");

    const mediaSlideInDOM = `
      <video controls >
      <source src="${media.media}"
              type="video/mp4">
      </video>
      `;
    // <p>${media.title}</p>
    li.innerHTML = mediaSlideInDOM;
    return li;
  }

  addMediaImage(media) {
    // créer li d'image
    const li = document.createElement("li");
    li.classList.add("slide");

    const mediaSlideInDOM = `
      <img
        class="slide_content"
        alt=${media.title}
        src=${media.media}
      >
      `;
    // <p>${media.title}</p>;
    li.innerHTML = mediaSlideInDOM;
    return li;
  }
}
