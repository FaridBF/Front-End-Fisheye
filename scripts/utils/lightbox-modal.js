function displayLightBoxModal() {
  const lightBoxModal = document.getElementById("lightBoxModal");
  lightBoxModal.style.display = "block";
  const slidesContainer = document.getElementById("slides-container");
  // const slide = document.querySelector(".slide");
  const prevButton = document.getElementById("slide-arrow-prev");
  const nextButton = document.getElementById("slide-arrow-next");

  nextButton.addEventListener("click", () => {
    // const slideWidth = slide.clientWidth;
    const slideWidth = 1500;
    slidesContainer.scrollLeft += slideWidth;
  });

  prevButton.addEventListener("click", () => {
    // const slideWidth = slide.clientWidth;
    const slideWidth = 1500; // 20128
    slidesContainer.scrollLeft -= slideWidth;
  });
}

function closeLightBoxModal() {
  const modal = document.getElementById("lightBoxModal");
  modal.style.display = "none";
}
