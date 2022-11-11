/**
 * Permet d'afficher la modale de contact
 */
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
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
  // annulation du filtre
  const mainContentFilter = document.getElementById("main");
  mainContentFilter.style.filter = "none";
}
