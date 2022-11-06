class Photographer {
  constructor() {
    this.photographerHeader = document.querySelector(".photograph-header");
    this.mediasSection = document.querySelector(".media-card-container");
    this.slidesContainer = document.querySelector("#slides-container");
    // récupération de l'id uniquement via searchParams
    this.photographerId = new URL(location.href).searchParams.get("id");
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }

  async init() {
    this.displayPhotographerSelected();
    await this.displayPhotographerMedias();
    this.addClickEventOnCards();
  }

  /**
   * Afficher les données du photographe sélectioné dans la section prévue
   */
  async displayPhotographerSelected() {
    const photographerData = await this.photographersApi.getPhotographer(
      this.photographerId
    );
    const photographer = photographerData[0];
    // partir depuis factory + un model et un template
    const photographerModel = photographerFactory(photographer);
    // permet d'instancier la class PhotographersCard
    const photographerCardItem = new PhotographerCard(photographerModel);
    const photographerCard = photographerCardItem.getPhotographerSelectedCard();
    this.photographerHeader.innerHTML = photographerCard;
  }

  /**
   * Afficher les médias du photographe sélectioné
   */
  async displayPhotographerMedias() {
    const photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    photographerDataMediasArray.forEach((media) => {
      const mediaType = "image" in media ? "image" : "video";
      const photographerMediaModel = photographerMediaFactory(media, mediaType);
      const photographerMediaCard = new PhotographerMediaCard(
        photographerMediaModel,
        mediaType
      );
      const mediaCardInDOM = photographerMediaCard.addMediaCardToDOM();
      this.mediasSection.appendChild(mediaCardInDOM);
    });
  }

  /**
   * Ajout de l'écouteur d'évènements sur les médias
   * et appel de la fonction qui affiche le carroussel
   */
  addClickEventOnCards() {
    const mediaCards = Array.from(
      document.getElementsByClassName("media_card_article")
    );
    for (let i = 0; i < mediaCards?.length; i++) {
      mediaCards[i].addEventListener("click", (e) => {
        // e.preventDefault();
        this.displayMediaCarroussel(i);
      });
    }
  }

  /**
   * Affiche le carroussel qui fait défiler les medias
   * @param {number} i index du media cliqué
   */
  async displayMediaCarroussel(i) {
    console.log("displayMediaCarroussel", i);

    let photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    console.log("ordre tableau", photographerDataMediasArray);

    photographerDataMediasArray.forEach((media) => {
      const mediaType = "image" in media ? "image" : "video";
      const photographerMediaModel = photographerMediaFactory(media, mediaType);
      const photographerMediaSlide = new PhotographerMediaSlide(
        photographerMediaModel,
        mediaType
      );
      const mediaSlideInDOM =
        photographerMediaSlide.addMediaSlideToCarrousselDOM();
      this.slidesContainer.appendChild(mediaSlideInDOM);
    });
    displayCurrentSlides(i);
  }
}

function displayCurrentSlides(currentIndex) {
  console.log("currentIndex", currentIndex);
  // récupère les slides du DOM
  let slides = document.querySelectorAll(".slide");
  console.log("slides length", slides.length);

  // boucler sur les slides
  slides.forEach((slide, counter) => {
    slide.style.display = "none";
    // console.log("counter", counter);
    // console.log("i", currentIndex);
    if (currentIndex == counter) {
      slide.style.display = "block";
    }
  });

  const prevButton = document.getElementById("slide-arrow-prev");
  prevButton.addEventListener("click", () => {
    slides = [];
    console.log("slides vide ?", slides);
    displayCurrentSlides(currentIndex - 1);
    console.log("slides vide ?", slides);
  });

  const nextButton = document.getElementById("slide-arrow-next");
  nextButton.addEventListener("click", () => {
    slides = [];
    console.log("slides vide ?", slides);
    displayCurrentSlides(currentIndex + 1);
    console.log("slides vide ?", slides);
  });
}

const photographer = new Photographer();
photographer.init();
