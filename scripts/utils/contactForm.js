// Représente le dernier élément parcourur avant l'ouverture de la modale
let previousActiveElement;

/**
 * Permet d'afficher la modale de contact
 */
function displayModal() {
  previousActiveElement = document.activeElement; // conserve le dernier élément parcouru avant ouverture dialog

  const photographerName = document.querySelector(
    ".photographer_title_profil"
  ).textContent;
  const legend = document.querySelector("#contact-form-legend");
  legend.innerHTML = `Contactez-moi ${photographerName}`;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Empêcher le focus sur tous les enfants de body à part la modale
  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) child.setAttribute("inert", true);
  });

  // création du filtre
  const mainContentFilter = document.getElementById("main");
  mainContentFilter.style.filter = "blur(3px)";
}

let form = document.querySelector("#contact_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  new FormData(form);
  // récupérer value + création d'un objet contactForm
  const contactForm = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value
  };
  // Affichage de mon objet form
  console.log(contactForm);
  // Réinitialiser le formulaire après l'avoir soumis
  form.reset();
  closeModal();
});

/**
 * Permet de fermer la modale de contact
 */
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  const main = document.getElementById("main");
  main.style.display = "block";

  // annulation du filtre
  const mainContentFilter = document.getElementById("main");
  mainContentFilter.style.filter = "none";

  // Supprimer la désactivation du focus sur tous les enfants de body à part la modale
  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) child.removeAttribute("inert");
  });

  // Retourner au dernier élément parcourur avant l'ouverture de la modale
  previousActiveElement.focus();
}
