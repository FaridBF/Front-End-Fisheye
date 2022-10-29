function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

let form = document.querySelector("#contact_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (let item of formData) {
    console.log(item[0]);
  }
});

function submitForm() {
  console.log("toto");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
