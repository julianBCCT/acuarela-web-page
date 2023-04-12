document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  if (document.querySelector(".splideCenter")) {
    new Splide(".splideCenter", {
      arrows: false,
      perMove: 1,
      perPage: 3,
      height: 470,
      focus: "center",
      gap: "30px",
      pagination: false,
      autoplay: true,
      pauseOnHover: false,
      breakpoints: {
        1200: {
          perPage: 1,
        },
      },
    }).mount();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
