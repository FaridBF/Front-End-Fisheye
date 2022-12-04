/**
 * Permet d'afficher la modale du carroussel
 */
export default function displayLightBoxModal() {
  const lightBoxModal = document.getElementById("lightBoxModal");
  lightBoxModal.style.display = "block";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "none";
  const header = document.getElementById("header");
  header.style.display = "none";
  // Ecouteur d'évènement "Escape" quand le caroussel est ouvert afin d'être en mesure de le fermer
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightBoxModal.style.display === "block") {
      closeLightBoxModal();
    }
  });
}

/**
 * Permet de fermer la modale du carroussel
 */
const buttonCloseLightBoxModal = document.querySelector(".closeLightBoxModal");
buttonCloseLightBoxModal.addEventListener("click", () => closeLightBoxModal());
buttonCloseLightBoxModal.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    closeLightBoxModal();
  }
});

export function closeLightBoxModal() {
  const modal = document.getElementById("lightBoxModal");
  modal.style.display = "none";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "block";
  const header = document.getElementById("header");
  header.style.display = "block";
}
