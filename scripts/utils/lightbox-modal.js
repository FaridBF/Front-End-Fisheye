function displayLightBoxModal() {
  console.log("displayLightBoxModal");
  const lightBoxModal = document.getElementById("lightBoxModal");
  lightBoxModal.style.display = "block";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "none";
  const slidesContainer = document.getElementById("slides-container");
  // const slide = document.querySelector(".slide");
  const prevButton = document.getElementById("slide-arrow-prev");
  const nextButton = document.getElementById("slide-arrow-next");

  // nextButton.addEventListener("click", () => {
  //   // const slideWidth = slide.clientWidth;
  //   const slideWidth = 1500;
  //   slidesContainer.scrollLeft += slideWidth;
  //   // displayCurrentSlides(currentIndex + 1);
  // });

  // prevButton.addEventListener("click", () => {
  //   // const slideWidth = slide.clientWidth;
  //   const slideWidth = 1500; // 20128
  //   slidesContainer.scrollLeft -= slideWidth;
  //   // displayCurrentSlides(currentIndex - 1);
  // });
}

function closeLightBoxModal() {
  const modal = document.getElementById("lightBoxModal");
  modal.style.display = "none";
  const mainContent = document.getElementById("main");
  mainContent.style.display = "block";
}
