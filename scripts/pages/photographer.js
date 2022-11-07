class Photographer {
  constructor() {
    this.photographerHeader = document.querySelector(".photograph-header");
    this.mediasSection = document.querySelector(".media-card-container");
    this.slidesContainer = document.querySelector("#slides-container");
    // récupération de l'id uniquement via searchParams
    this.photographerId = new URL(location.href).searchParams.get("id");
    this.photographersApi = new PhotographersApi("./data/photographers.json");
    this.photographerDataMediasArray = [];
  }

  async init() {
    this.displayPhotographerSelected();
    await this.displayPhotographerMedias();
    this.addClickEventOnCards();
    this.addLikeEventOnCards();
    this.addClickEventOnFilters();
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
    this.photographerDataMediasArray =
      await this.photographersApi.getMediasByPhotographerId(
        this.photographerId
      );
    console.log(
      "this.photographerDataMediasArray",
      this.photographerDataMediasArray
    );

    // this.toto = photographerDataMediasArray;
    sortByLikes(this.photographerDataMediasArray);
    // this.sortByTitle(photographerDataMediasArray);
    // trier par date

    this.photographerDataMediasArray.forEach((media) => {
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
    const mediaCards = Array.from(document.getElementsByClassName("media"));
    for (let i = 0; i < mediaCards?.length; i++) {
      mediaCards[i].addEventListener("click", (e) => {
        // e.preventDefault();
        displayLightBoxModal();
        this.displayMediaCarroussel(i);
      });
    }
  }

  /**
   * Ajout de l'écouteur d'évènements "like" sur les médias
   */
  addLikeEventOnCards() {
    const valueArray = [];
    const newArray = [];
    const mediasToLike = document.querySelectorAll(".like");
    mediasToLike.forEach((mediaToLike) => {
      mediaToLike.addEventListener("click", () => {
        if (mediaToLike.classList.contains("liked")) {
          alert("Vous avez déjà aimé ce contenu");
        } else {
          // j'incrémente les likes d'une image ou une vidéo
          mediaToLike.innerHTML = `${parseInt(mediaToLike.textContent) + 1}`;
          mediaToLike.classList.add("liked");
          //j'incrémente le total des likes
          const totalLikes = document.querySelector(".totalLikes");
          totalLikes.innerHTML = `${parseInt(totalLikes.textContent) + 1}`;
        }
      });
      const totalLikes = parseInt(mediaToLike.textContent);
      const newTotalLikes = valueArray.push(totalLikes);
    });
    const initialValue = 0;
    const sumWithInitial = valueArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    newArray.push(sumWithInitial);
    // affichage total des likes dans la modal likesMedia
    const totalLikes = document.querySelector(".totalLikes");
    totalLikes.innerHTML = `${parseInt(newArray[0])}`;
  }

  addClickEventOnFilters() {
    const filters = document.querySelector("#filter-select");
    filters.addEventListener("change", () => {
      // en fonction de la valeur de filters (dc de l'option sélectionnée)
      console.log("sort change:", filters.value);
      if (filters.value === "title") {
        sortByTitle(this.photographerDataMediasArray);
        console.log(
          "this.photographerDataMediasArray:",
          this.photographerDataMediasArray
        );
      } else if (filters.value === "date") {
        sortByDate(this.photographerDataMediasArray);
        console.log(
          "this.photographerDataMediasArray:",
          this.photographerDataMediasArray
        );
      } else {
        sortByLikes(this.photographerDataMediasArray);
        console.log(
          "this.photographerDataMediasArray:",
          this.photographerDataMediasArray
        );
      }
    });
  }

  /**
   *
   * Affiche le carroussel qui fait défiler les medias
   * @param {number} i index du media cliqué
   */
  async displayMediaCarroussel(i) {
    console.log("displayMediaCarroussel", i);
    this.photographerDataMediasArray.forEach((media) => {
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

/**
 *
 * @param {*} currentIndex
 */
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

  // Gestion du clique sur le bouton "précédent" du carroussel
  const prevButton = document.getElementById("slide-arrow-prev");
  prevButton.addEventListener("click", () => {
    slides = [];
    console.log("slides vide ?", slides);
    displayCurrentSlides(currentIndex - 1);
    console.log("slides vide ?", slides);
  });

  // Gestion du clique sur le bouton "suivant" du carroussel
  const nextButton = document.getElementById("slide-arrow-next");
  nextButton.addEventListener("click", () => {
    slides = [];
    console.log("slides vide ?", slides);
    displayCurrentSlides(currentIndex + 1);
    console.log("slides vide ?", slides);
  });
}

/**
 * Trier par likes (popularité) : par défaut
 * @param {array} photographerDataMediasArray
 */
function sortByLikes(photographerDataMediasArray) {
  photographerDataMediasArray.sort((a, b) => b.likes - a.likes);
}

/**
 * Trier contenu par titre
 * @param {array} photographerDataMediasArray
 */
function sortByTitle(photographerDataMediasArray) {
  photographerDataMediasArray.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
}

/**
 * Trier contenu par date
 * @param {array} photographerDataMediasArray
 */
function sortByDate(photographerDataMediasArray) {
  photographerDataMediasArray.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });
}

const photographer = new Photographer();
photographer.init();
