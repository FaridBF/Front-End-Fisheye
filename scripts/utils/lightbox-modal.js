// function displayLightBoxModal() {
// }

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  // const slideWidth = slide.clientWidth;
  const slideWidth = 1506;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  // const slideWidth = slide.clientWidth;
  const slideWidth = 1506;
  slidesContainer.scrollLeft -= slideWidth;
});
