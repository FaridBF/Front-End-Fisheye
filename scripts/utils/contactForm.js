/**
 * Permet d'afficher la modale de contact
 */
function displayModal() {
  const photographerName = document.querySelector(
    ".photographer_title_profil"
  ).textContent;
  const legend = document.querySelector("#contact-form-legend");
  legend.innerHTML = `Contactez-moi ${photographerName}`;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // création du filtre
  const mainContentFilter = document.getElementById("main");
  mainContentFilter.style.filter = "blur(3px)";

  // focus

  const main = document.getElementById("main");
  main.style.display = "none";

  // const imgCloseModal = document.getElementsByClassName("imgCloseModal");
  // const main = document.getElementById("main");
  // const contactModal = document.getElementById("contact_modal");
  // const body = document.getElementById("body");

  // main.setAttribute("aria-hidden", "true");
  // body.setAttribute("display", "none");
  // body.setAttribute("aria-hidden", "true");
  // contactModal.setAttribute("aria-hidden", "false");

  // contactModal.setAttribute("display", "block");
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

  //focus

  const main = document.getElementById("main");
  main.style.display = "block";
  // const openModal = document.getElementsByClassName("contact_button");
  // const main = document.getElementById("main");
  // const contactModal = document.getElementById("contact_modal");
  // const body = document.getElementById("body");

  // main.setAttribute("aria-hidden", "false");
  // contactModal.setAttribute("aria-hidden", "true");

  // annulation du filtre
  const mainContentFilter = document.getElementById("main");
  mainContentFilter.style.filter = "none";
}
