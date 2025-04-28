document.addEventListener("DOMContentLoaded", function () {
  //Colores
  var colorPrimario = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primario")
    .trim();
  var colorSecundario = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-secundario")
    .trim();
  var colorTexto = "#060606"; // Negro por defecto

  // Calcular contraste con el texto
  var contraste1 = calcularContraste(colorPrimario, colorTexto);
  var contraste2 = calcularContraste(colorSecundario, colorTexto);

  if (contraste1 < 7) {
    document.documentElement.style.setProperty("--color-botones", "white");
  }
  if (contraste2 < 4.5) {
    document.documentElement.style.setProperty("--color-pasos", "white");
  }

  // Calcular colores más claros
  var colorPrimarioClaro = aclararColor(colorPrimario, 0.8); // 80% más claro
  var colorSecundarioClaro = aclararColor(colorSecundario, 0.8);

  document.documentElement.style.setProperty(
    "--color-primario-claro",
    colorPrimarioClaro
  );
  document.documentElement.style.setProperty(
    "--color-secundario-claro",
    colorSecundarioClaro
  );

  var colorFondoClaro = mezclarConBlanco(colorPrimario, 0.95); // 95% de blanco
  document.documentElement.style.setProperty(
    "--color-fondo-claro",
    colorFondoClaro
  );

  // Galería
  const gallery = document.querySelector(".image-gallery-1");
  const images = document.querySelectorAll(".image-gallery-1 li");
  let index = 0;
  let interval;
  let imagesPerView = window.innerWidth <= 768 ? 1 : 3; // Detecta si es móvil o desktop

  // Función para clonar imágenes y hacer el carrusel infinito
  function cloneImages() {
    images.forEach((img) => {
      const clone = img.cloneNode(true);
      gallery.appendChild(clone);
    });
  }

  // Función para iniciar el auto deslizamiento
  function startAutoSlide() {
    interval = setInterval(() => {
      index++;
      const translateValue = -index * (100 / imagesPerView) + "%";
      gallery.style.transition = "transform 0.5s ease-in-out";
      gallery.style.transform = `translateX(${translateValue})`;

      // Reiniciar cuando llega al final
      setTimeout(() => {
        if (index >= images.length) {
          index = 0;
          gallery.style.transition = "none";
          gallery.style.transform = `translateX(0)`;
        }
      }, 500);
    }, 3000);
  }

  // Función para detener el auto deslizamiento
  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Detectar cambios en el tamaño de la pantalla y ajustar el número de imágenes por vista
  window.addEventListener("resize", () => {
    imagesPerView = window.innerWidth <= 768 ? 1 : 3;
    index = 0;
    gallery.style.transition = "none";
    gallery.style.transform = "translateX(0)";
  });

  // Eventos para pausar y reanudar el auto deslizamiento
  gallery.addEventListener("mouseenter", stopAutoSlide);
  gallery.addEventListener("mouseleave", startAutoSlide);

  cloneImages();
  startAutoSlide();
});

function calcularContraste(color1, color2) {
  var rgb1 = obtenerComponentesRGB(color1);
  var rgb2 = obtenerComponentesRGB(color2);

  var luminancia1 = calcularLuminancia(rgb1);
  var luminancia2 = calcularLuminancia(rgb2);

  return (
    (Math.max(luminancia1, luminancia2) + 0.05) /
    (Math.min(luminancia1, luminancia2) + 0.05)
  );
}

function obtenerComponentesRGB(color) {
  var match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match
    ? {
        r: parseInt(match[1], 16) / 255,
        g: parseInt(match[2], 16) / 255,
        b: parseInt(match[3], 16) / 255,
      }
    : null;
}

function calcularLuminancia(rgb) {
  var r =
    rgb.r <= 0.03928 ? rgb.r / 12.92 : Math.pow((rgb.r + 0.055) / 1.055, 2.4);
  var g =
    rgb.g <= 0.03928 ? rgb.g / 12.92 : Math.pow((rgb.g + 0.055) / 1.055, 2.4);
  var b =
    rgb.b <= 0.03928 ? rgb.b / 12.92 : Math.pow((rgb.b + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function aclararColor(color, porcentaje) {
  var rgb = obtenerComponentesRGBHex(color);
  if (!rgb) return color;

  rgb.r = Math.round(rgb.r + (255 - rgb.r) * porcentaje);
  rgb.g = Math.round(rgb.g + (255 - rgb.g) * porcentaje);
  rgb.b = Math.round(rgb.b + (255 - rgb.b) * porcentaje);

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function obtenerComponentesRGBHex(color) {
  var match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : null;
}

// Función para mezclar el color primario con blanco en un 95%
function mezclarConBlanco(color, porcentajeBlanco) {
  var rgb = obtenerComponentesRGBHex(color);
  if (!rgb) return color;

  rgb.r = Math.round(rgb.r + (255 - rgb.r) * porcentajeBlanco);
  rgb.g = Math.round(rgb.g + (255 - rgb.g) * porcentajeBlanco);
  rgb.b = Math.round(rgb.b + (255 - rgb.b) * porcentajeBlanco);

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

//Navbar

function openNav() {
  document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav() {
  document.getElementById("mobile-menu").style.width = "0%";
}

// //Galeria
// function openImageModal(src) {
//   const modal = document.getElementById("imageModal");
//   const modalImg = document.getElementById("modalImg");

//   modalImg.src = src;
//   modal.style.display = "flex"; // Muestra el modal
// }

// // Cerrar el modal al hacer click en la "X" o fuera de la imagen
// document.querySelector(".close-modal").addEventListener("click", function () {
//   document.getElementById("imageModal").style.display = "none";
// });

// document.getElementById("imageModal").addEventListener("click", function (e) {
//   if (e.target.tagName !== "IMG") {
//     this.style.display = "none";
//   }
// });

// Galeria 1

var currentIndex1 = 0;
var images1 = document.querySelectorAll(".image-gallery-1 li");
var totalImages1 = images1.length;

function showImage1(index1) {
  if (index1 >= 0 && index1 < totalImages1) {
    images1[currentIndex1].style.display = "none";
    currentIndex1 = index1;
    images1[currentIndex1].style.display = "block";
  }
}

function nextImage1() {
  showImage1(currentIndex1 + 1);
}

function prevImage1() {
  showImage1(currentIndex1 - 1);
}

// document.querySelector(".next-btn-1").addEventListener("click", nextImage1);
// document.querySelector(".prev-btn-1").addEventListener("click", prevImage1);

// Mostrar la primera imagen al cargar la página
showImage1(currentIndex1);

var imagesPopup1 = document.querySelectorAll(".image-gallery-1 li img");
var popupContainer1 = document.querySelector(".popup-container-1");
var popupImage1 = document.querySelector(".popup-image-1");
var closeBtn1 = document.querySelector(".close-btn-1");

imagesPopup1.forEach(function (image1) {
  image1.addEventListener("click", function () {
    popupImage1.src = image1.src;
    popupContainer1.style.display = "block";
  });
});

closeBtn1.addEventListener("click", function () {
  popupContainer1.style.display = "none";
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popupContainer1.style.display = "none";
  }
});

popupContainer1.addEventListener("click", function (event) {
  if (event.target === popupContainer1) {
    popupContainer1.style.display = "none";
  }
});

//Galeria 2

var currentIndex = 0;
var images = document.querySelectorAll(".image-gallery li");
var totalImages = images.length;

function showImage(index) {
  if (index >= 0 && index < totalImages) {
    images[currentIndex].style.display = "none";
    currentIndex = index;
    images[currentIndex].style.display = "block";
  }
}

function nextImage() {
  showImage(currentIndex + 1);
}

function prevImage() {
  showImage(currentIndex - 1);
}

document.querySelector(".next-btn").addEventListener("click", nextImage);
document.querySelector(".prev-btn").addEventListener("click", prevImage);

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);

var imagesPopup = document.querySelectorAll(".image-gallery li img");
var popupContainer = document.querySelector(".popup-container");
var popupImage = document.querySelector(".popup-image");
var closeBtn = document.querySelector(".close-btn");

imagesPopup.forEach(function (image) {
  image.addEventListener("click", function () {
    popupImage.src = image.src;
    popupContainer.style.display = "block";
  });
});

closeBtn.addEventListener("click", function () {
  popupContainer.style.display = "none";
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popupContainer.style.display = "none";
  }
});

popupContainer.addEventListener("click", function (event) {
  if (event.target === popupContainer) {
    popupContainer.style.display = "none";
  }
});

//Funcionamiento de los titulos de los pasos al tener o no hover

// Obtener todos los elementos li
const listItems = document.querySelectorAll(".card li");

// Agregar un controlador de eventos para cada elemento li
listItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    // Al hacer hover, ocultar la etiqueta <b> en los otros elementos li
    listItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.querySelector("b").style.display = "none";
      }
    });
  });

  item.addEventListener("mouseout", () => {
    // Al salir del hover, mostrar la etiqueta <b> en todos los elementos li
    listItems.forEach((otherItem) => {
      otherItem.querySelector("b").style.display = "block";
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const textContainers = document.querySelectorAll(".text-container");

//   textContainers.forEach((container) => {
//     const textContent = container.querySelector(".text-content");
//     const readMoreBtn = container.querySelector(".read-more-btn");
//     const originalText = textContent.textContent.trim();

//     if (originalText.length > 300) {
//       const truncatedText = originalText.substring(0, 300) + "...";
//       textContent.textContent = truncatedText;
//       container.classList.add("show-btn");

//       // Obtén el idioma desde el atributo data-lang del botón
//       var lang = readMoreBtn.getAttribute("data-lang");

//       // Define las traducciones para los botones
//       var translations = {
//         es: {
//           ver_mas: 'Ver más <i class="acuarela acuarela-Flecha_abajo"></i>',
//           ver_menos:
//             'Ver menos <i class="acuarela acuarela-Flecha_arriba"></i>',
//         },
//         en: {
//           ver_mas: 'Read more <i class="acuarela acuarela-Flecha_abajo"></i>',
//           ver_menos:
//             'Read less <i class="acuarela acuarela-Flecha_arriba"></i>',
//         },
//       };

//       readMoreBtn.addEventListener("click", function () {
//         if (textContent.classList.contains("expanded")) {
//           textContent.textContent = truncatedText;
//           readMoreBtn.innerHTML = translations[lang]["ver_mas"];
//         } else {
//           textContent.textContent = originalText;
//           readMoreBtn.innerHTML = translations[lang]["ver_menos"];
//         }
//         textContent.classList.toggle("expanded");
//       });
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos todas las secciones que contienen .main-content
  const sections = document.querySelectorAll(".mision, .vision, .philosophy");

  sections.forEach((section) => {
    const mainContent = section.querySelector(".main-content");
    // Busca todos los <p> dentro de .main-content
    const paragraphs = mainContent.querySelectorAll("p");

    paragraphs.forEach((p) => {
      const originalText = p.textContent.trim();
      const readMoreBtn = mainContent.querySelector(".read-more-btn");

      // Si el texto tiene más de 300 caracteres, muestra el truncado
      if (originalText.length > 300) {
        const truncatedText = originalText.substring(0, 300) + "...";
        p.textContent = truncatedText;
        section.classList.add("show-btn");

        // Obtén el idioma desde el atributo data-lang del botón
        var lang = readMoreBtn.getAttribute("data-lang");

        // Define las traducciones para los botones
        var translations = {
          es: {
            ver_mas: 'Ver más <i class="acuarela acuarela-Flecha_abajo"></i>',
            ver_menos:
              'Ver menos <i class="acuarela acuarela-Flecha_arriba"></i>',
          },
          en: {
            ver_mas: 'Read more <i class="acuarela acuarela-Flecha_abajo"></i>',
            ver_menos:
              'Read less <i class="acuarela acuarela-Flecha_arriba"></i>',
          },
        };

        readMoreBtn.addEventListener("click", function () {
          if (p.classList.contains("expanded")) {
            p.textContent = truncatedText;
            readMoreBtn.innerHTML = translations[lang]["ver_mas"];
          } else {
            p.textContent = originalText;
            readMoreBtn.innerHTML = translations[lang]["ver_menos"];
          }
          p.classList.toggle("expanded");
        });
      } else {
        // Si el texto es corto (menos de 300 caracteres), no se muestra el botón
        readMoreBtn.style.display = "none";
      }
    });
  });
});

//Formulario de inscripción
document
  .getElementById("enviarBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    console.log("Botón de envío presionado");

    const enviarBtn = document.getElementById("enviarBtn");
    const dotSpinner = document.getElementById("dotSpinner");

    // Ocultar el botón y mostrar el loader
    enviarBtn.style.display = "none";
    dotSpinner.style.display = "flex";

    // Obtén los datos del formulario utilizando FormData
    const formData = new FormData(document.getElementById("inscripcionForm"));

    // Realizar el fetch a procesar_inscripcion.php
    fetch("../set/procesar_inscripcion.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          const mensaje = document.getElementById("mensaje");
          const formContainer = document.getElementById("form-container");
          const inscribirOtroBtn = document.getElementById("inscribirOtroBtn");
          const mensajeText = mensaje.querySelector("p");

          // Mostrar el mensaje de éxito o error
          mensaje.style.display = "flex";
          formContainer.style.display = "none";
          inscribirOtroBtn.style.display = "block";

          // Limpiar las clases anteriores
          mensaje.classList.remove("success", "error");

          if (data.success) {
            mensajeText.textContent =
              idiomaContenido === "es"
                ? "Inscripción exitosa."
                : "Successful registration.";
            mensaje.classList.add("success");
          } else {
            mensajeText.textContent =
              idiomaContenido === "es"
                ? "Error: " + data.message
                : "Error: " + data.message;
            mensaje.classList.add("error");
          }
        } catch (error) {
          console.error("Error al parsear JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error en el fetch:", error);
      });
  });

// Evento para el botón "Inscribir otro niño"
document
  .getElementById("inscribirOtroBtn")
  .addEventListener("click", function () {
    const formContainer = document.getElementById("form-container");
    const mensaje = document.getElementById("mensaje");
    const inscribirOtroBtn = document.getElementById("inscribirOtroBtn");
    const enviarBtn = document.getElementById("enviarBtn");
    const dotSpinner = document.getElementById("dotSpinner");

    // Mostrar el formulario y ocultar el mensaje

    formContainer.style.display = "flex";
    mensaje.style.display = "none";
    inscribirOtroBtn.style.display = "none";

    // Restaurar el botón y ocultar el spinner
    enviarBtn.style.display = "block";
    dotSpinner.style.display = "none";

    // Limpiar los campos del formulario
    document.getElementById("inscripcionForm").reset();
  });

//Testimonios
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonials__slider");
  const dots = document.querySelectorAll(".testimonials__dot");
  const cards = document.querySelectorAll(".testimonial-card");

  let isDragging = false;
  let startX, scrollLeft;

  // Función para establecer la misma altura para todas las tarjetas solo una vez
  const setEqualHeight = () => {
    let maxHeight = 0;
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.style.height = "auto"; // Restablecer altura para obtener la altura natural
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    // Ajuste de margen opcional
    maxHeight += 10;

    // Aplicar la altura máxima a todas las tarjetas
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });

    // Desactivar futuros cambios al cambiar el tamaño de la pantalla
    window.removeEventListener("resize", setEqualHeight);
  };

  // Llamar a la función para ajustar alturas al cargar la página y al redimensionar
  setEqualHeight();

  // Slider dragging functionality
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });

  // Dots navigation functionality
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      slider.scrollLeft = slider.offsetWidth * (index / 2); // Mostrar dos tarjetas
      updateActiveDot(index);
    });
  });

  const updateActiveDot = (index) => {
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  };

  // Update active dot on scroll
  slider.addEventListener("scroll", () => {
    const index = Math.round((slider.scrollLeft / slider.offsetWidth) * 2);
    updateActiveDot(index);
  });
});
