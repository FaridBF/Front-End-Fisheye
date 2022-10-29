function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
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
  //affichage de monobjet
  console.log(contactForm);
  //reset le form après submit
  form.reset();
  closeModal();
});

function submitForm() {
  console.log("toto");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
