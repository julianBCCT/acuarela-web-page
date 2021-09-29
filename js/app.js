window.addEventListener("load", function () {
  if (document.querySelector(".glider")) {
    new Glider(document.querySelector(".glider"), {
      // Mobile-first defaults
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      arrows: {
        prev: ".carousel-prev",
        next: ".carousel-next",
      },
    });
  }
});
