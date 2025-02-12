import PhotographersApi from "../api/Api.js";
import photographerFactory from "../factories/photographer.js";
import PhotographerMediaCard from "../templates/PhotographerMediaCard.js";
import displayLightBoxModal from "../utils/lightbox-modal.js";
import photographerMediaFactory from "../factories/media.js";
import PhotographerMediaSlide from "../templates/PhotographerMediaSlide.js";
import PhotographerCard from "../templates/PhotographerCard.js";
import initModal from "../utils/contactForm.js";

/**
 * Classe représentant la gestion de la page du photographe sélectioné
 * avec son portfolio
 */
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

  async getMediasById(photographerId) {
    return await this.photographersApi.getMediasByPhotographerId(
      photographerId
    );
  }

  /**
   * Initialise la page du photographe pour afficher les medias
   * via la factory des medias du photographe et ajoute tous les écouteurs d'évènements
   */
  async init() {
    this.displayPhotographerSelected();
    const arrayMediasID = await this.getMediasById(this.photographerId);
    this.photographerDataMediasArray = arrayMediasID;
    await this.displayPhotographerMedias(arrayMediasID);
    this.addClickEventOnCards();
    this.addLikeEventOnCards();
    this.addCloseEventAlertAlreadyLiked();
    this.addClickEventOnFilters();
    initModal();
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
  async displayPhotographerMedias(photographerDataMediasArray) {
    // vider l'ancienne section des medias
    this.mediasSection.innerHTML = "";

    // récupérer la nouvelle data triée et lancer l'affichage via la factory des medias
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
    const mediaCards = Array.from(document.getElementsByClassName("media"));
    for (let i = 0; i < mediaCards?.length; i++) {
      // ajout évènement click
      mediaCards[i].addEventListener("click", () => {
        displayLightBoxModal();
        this.displayMediaCarroussel(i);
      });
      // ajout évènement touche clavier "enter"
      mediaCards[i].addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          displayLightBoxModal();
          this.displayMediaCarroussel(i);
        }
      });
    }
  }

  /**
   * Action de "liker" un media
   * @param {object} mediaToLike: élément du DOM représente le span pour liker un media
   */
  //  let previousElement = null;

  addLike(mediaToLike) {
    if (mediaToLike.classList.contains("liked")) {
      // j'affiche la modale
      const modalLikeContainer = document.querySelector(
        ".modal-like-container"
      );
      modalLikeContainer.classList.add("active");

      // Empêcher le focus sur tous les enfants de body à part la modale
      Array.from(document.body.children).forEach((child) => {
        if (child !== modalLikeContainer) child.setAttribute("inert", true);
      });
    } else {
      // j'incrémente les likes d'une image ou une vidéo
      mediaToLike.innerHTML = `${parseInt(mediaToLike.textContent) + 1}`;
      mediaToLike.classList.add("liked");
      //j'incrémente le total des likes
      const totalLikes = document.querySelector(".totalLikes");
      totalLikes.innerHTML = `${parseInt(totalLikes.textContent) + 1}`;
    }
  }

  /**
   * Ajout des écouteurs d'évènements "like" sur les médias
   * (au clic ou en tapant sur "entrée")
   */
  addLikeEventOnCards() {
    const picturesLikesList = []; // chq élément est le total de likes d'une photo
    const mediasToLike = document.querySelectorAll(".like");
    mediasToLike.forEach((mediaToLike) => {
      mediaToLike.addEventListener("click", () => {
        this.addLike(mediaToLike);
      });
      mediaToLike.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.addLike(mediaToLike);
        }
      });
      const totalLikes = parseInt(mediaToLike.textContent);
      picturesLikesList.push(totalLikes);
    });
    const initialValueOfTotalLikes = 0;
    const sumOfTotalPhotographerLikes = picturesLikesList.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValueOfTotalLikes
    );
    const totalLikes = document.querySelector(".totalLikes");
    totalLikes.innerHTML = `${sumOfTotalPhotographerLikes}`;
  }

  /**
   * Fermeture de la modale qui informe que l'utilisateur a déjà aimé ce média
   */
  addCloseEventAlertAlreadyLiked() {
    const modalContainer = document.querySelector(".modal-like-container");
    const closeLikeModaleBtn = document.querySelector("#close-like-modal");
    // écouteur évènement fermeture au clique
    closeLikeModaleBtn.addEventListener("click", () => {
      modalContainer.classList.remove("active");
      // Supprimer la désactivation du focus sur tous les enfants de body à part la modale
      Array.from(document.body.children).forEach((child) => {
        if (child !== modalContainer) child.removeAttribute("inert");
      });
    });
    // écouteur évènement fermeture via le clavier
    closeLikeModaleBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        modalContainer.classList.remove("active");
        Array.from(document.body.children).forEach((child) => {
          if (child !== modalContainer) child.removeAttribute("inert");
        });
        document.querySelector(".modalPriceAndLiked").focus();
      }
    });
  }

  /**
   * Ajout de l'écouteur d'évènements "tri" sur les médias
   * par "popularité" ou "titre" ou "date"
   */
  addClickEventOnFilters() {
    const filters = document.querySelector("#filter-select");
    filters.addEventListener("change", () => {
      // en fonction de la valeur de filters (dc de l'option sélectionnée)
      if (filters.value === "title") {
        this.photographerDataMediasArray = sortByTitle(
          this.photographerDataMediasArray
        );
        // après le tri, appelle l'afichage des medias
        this.displayPhotographerMedias(this.photographerDataMediasArray);
        // toujours avec ce même résultat, appel de l'ajout de l'écouteur d'évènement clic sur la card
        // pour gérer le caroussel pour pouvoir l'afficher si besoin
        this.addClickEventOnCards();
        // idem pour l'évènement like
        this.addLikeEventOnCards();
      } else if (filters.value === "date") {
        sortByDate(this.photographerDataMediasArray);
        this.displayPhotographerMedias(this.photographerDataMediasArray);
        this.addClickEventOnCards();
        this.addLikeEventOnCards();
      } else {
        sortByLikes(this.photographerDataMediasArray);
        this.displayPhotographerMedias(this.photographerDataMediasArray);
        this.addClickEventOnCards();
        this.addLikeEventOnCards();
      }
    });
  }
  /**
   *
   * Affiche le carroussel qui fait défiler les medias
   * @param {number} i index du media cliqué
   */
  async displayMediaCarroussel(i) {
    // vider anciennes slides
    this.slidesContainer.innerHTML = "";
    // reremplir le contenu des slides
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
    currentSlides = i;
    displayCurrentSlides(i);
  }
}

let currentSlides = 0;

/**
 * Gestion de l'affichage de la slide courante sur le carroussel
 * @param {number} currentIndex
 */
export function displayCurrentSlides(currentIndex) {
  // récupère les slides du DOM
  let slides = document.querySelectorAll(".slide");
  // boucler sur les slides
  slides.forEach((slide, counter) => {
    slide.style.display = "none";
    if (currentIndex === counter) {
      slide.style.display = "block";
    }
  });
}

// Gestion du clique sur le bouton "précédent" du carroussel
const prevButton = document.getElementById("slide-arrow-prev");
prevButton.addEventListener("click", () => {
  if (currentSlides === 0) {
    const slides = document.querySelectorAll(".slide");
    currentSlides = slides.length - 1;
  } else {
    currentSlides--;
  }
  displayCurrentSlides(currentSlides);
});

// Gestion du clique sur le bouton "suivant" du carroussel
const nextButton = document.getElementById("slide-arrow-next");
nextButton.addEventListener("click", () => {
  const slides = document.querySelectorAll(".slide");
  if (currentSlides === slides.length - 1) {
    currentSlides = 0;
  } else {
    currentSlides++;
  }
  displayCurrentSlides(currentSlides);
});
/**
 * Trier par likes (popularité) : par défaut
 * @param {array} photographerDataMediasArray
 */
function sortByLikes(photographerDataMediasArray) {
  return photographerDataMediasArray.sort((a, b) => b.likes - a.likes);
}

/**
 * Trier contenu par titre
 * @param {array} photographerDataMediasArray
 */
function sortByTitle(photographerDataMediasArray) {
  return photographerDataMediasArray.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
}

/**
 * Trier contenu par date
 * @param {array} photographerDataMediasArray
 */
function sortByDate(photographerDataMediasArray) {
  return photographerDataMediasArray.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });
}

const photographer = new Photographer();
photographer.init();
