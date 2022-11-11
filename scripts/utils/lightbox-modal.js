/**
 * Permet d'afficher la modale du carroussel
 */
function displayLightBoxModal() {
  const lightBoxModal = document.getElementById("lightBoxModal");
  lightBoxModal.style.display = "block";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "none";
}

/**
 * Permet de fermer la modale du carroussel
 */
function closeLightBoxModal() {
  const modal = document.getElementById("lightBoxModal");
  modal.style.display = "none";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "block";
}
