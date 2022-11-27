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
}

/**
 * Permet de fermer la modale du carroussel
 */
export function closeLightBoxModal() {
  const modal = document.getElementById("lightBoxModal");
  modal.style.display = "none";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "block";
  const header = document.getElementById("header");
  header.style.display = "block";
}
