//Contraste entre colores

document.addEventListener("DOMContentLoaded", function () {
    var colorPrimario = getComputedStyle(document.documentElement).getPropertyValue('--color-primario').trim();
    var colorSecundario = getComputedStyle(document.documentElement).getPropertyValue('--color-secundario').trim();
    var colorTexto = '#060606'; // Negro por defecto

    var contraste1 = calcularContraste(colorPrimario, colorTexto);
    var contraste2 = calcularContraste(colorSecundario, colorTexto);

    if (contraste1 < 4.5) {
        document.documentElement.style.setProperty('--color-botones', 'white');
    }
    if (contraste2 < 4.5) {
        document.documentElement.style.setProperty('--color-pasos', 'white');
    }
});

function calcularContraste(color1, color2) {
    // Obtener los componentes RGB de cada color
    var rgb1 = obtenerComponentesRGB(color1);
    var rgb2 = obtenerComponentesRGB(color2);

    // Calcular la luminancia de cada color
    var luminancia1 = calcularLuminancia(rgb1);
    var luminancia2 = calcularLuminancia(rgb2);

    // Calcular el contraste
    var contraste = (Math.max(luminancia1, luminancia2) + 0.05) / (Math.min(luminancia1, luminancia2) + 0.05);

    return contraste;
}

function obtenerComponentesRGB(color) {
    var match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return match ? {
        r: parseInt(match[1], 16) / 255,
        g: parseInt(match[2], 16) / 255,
        b: parseInt(match[3], 16) / 255
    } : null;
}

function calcularLuminancia(rgb) {
    var r = rgb.r <= 0.03928 ? rgb.r / 12.92 : Math.pow((rgb.r + 0.055) / 1.055, 2.4);
    var g = rgb.g <= 0.03928 ? rgb.g / 12.92 : Math.pow((rgb.g + 0.055) / 1.055, 2.4);
    var b = rgb.b <= 0.03928 ? rgb.b / 12.92 : Math.pow((rgb.b + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}


//Navbar

function openNav() {
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-menu").style.width = "0%";
}

// Galeria 1

var currentIndex1 = 0;
var images1 = document.querySelectorAll('.image-gallery-1 li');
var totalImages1 = images1.length;

function showImage1(index1) {
    if (index1 >= 0 && index1 < totalImages1) {
        images1[currentIndex1].style.display = 'none';
        currentIndex1 = index1;
        images1[currentIndex1].style.display = 'block';
    }
}

function nextImage1() {
    showImage1(currentIndex1 + 1);
}

function prevImage1() {
    showImage1(currentIndex1 - 1);
}

document.querySelector('.next-btn-1').addEventListener('click', nextImage1);
document.querySelector('.prev-btn-1').addEventListener('click', prevImage1);

// Mostrar la primera imagen al cargar la página
showImage1(currentIndex1);

var imagesPopup1 = document.querySelectorAll('.image-gallery-1 li img');
var popupContainer1 = document.querySelector('.popup-container-1');
var popupImage1 = document.querySelector('.popup-image-1');
var closeBtn1 = document.querySelector('.close-btn-1');

imagesPopup1.forEach(function (image1) {
    image1.addEventListener('click', function () {
        popupImage1.src = image1.src;
        popupContainer1.style.display = 'block';
    });
});

closeBtn1.addEventListener('click', function () {
    popupContainer1.style.display = 'none';
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        popupContainer1.style.display = 'none';
    }
});

popupContainer1.addEventListener('click', function (event) {
    if (event.target === popupContainer1) {
        popupContainer1.style.display = 'none';
    }
});

//Galeria 2

var currentIndex = 0;
var images = document.querySelectorAll('.image-gallery li');
var totalImages = images.length;

function showImage(index) {
    if (index >= 0 && index < totalImages) {
        images[currentIndex].style.display = 'none';
        currentIndex = index;
        images[currentIndex].style.display = 'block';
    }
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

document.querySelector('.next-btn').addEventListener('click', nextImage);
document.querySelector('.prev-btn').addEventListener('click', prevImage);

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);


var imagesPopup = document.querySelectorAll('.image-gallery li img');
var popupContainer = document.querySelector('.popup-container');
var popupImage = document.querySelector('.popup-image');
var closeBtn = document.querySelector('.close-btn');

imagesPopup.forEach(function (image) {
    image.addEventListener('click', function () {
        popupImage.src = image.src;
        popupContainer.style.display = 'block';
    });
});

closeBtn.addEventListener('click', function () {
    popupContainer.style.display = 'none';
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        popupContainer.style.display = 'none';
    }
});

popupContainer.addEventListener('click', function (event) {
    if (event.target === popupContainer) {
        popupContainer.style.display = 'none';
    }
});

//Funcionamiento de los titulos de los pasos al tener o no hover

// Obtener todos los elementos li
const listItems = document.querySelectorAll('.card li');

// Agregar un controlador de eventos para cada elemento li
listItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        // Al hacer hover, ocultar la etiqueta <b> en los otros elementos li
        listItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('b').style.display = 'none';
            }
        });
    });

    item.addEventListener('mouseout', () => {
        // Al salir del hover, mostrar la etiqueta <b> en todos los elementos li
        listItems.forEach(otherItem => {
            otherItem.querySelector('b').style.display = 'block';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textContainers = document.querySelectorAll('.text-container');

    textContainers.forEach(container => {
        const textContent = container.querySelector('.text-content');
        const readMoreBtn = container.querySelector('.read-more-btn');
        const originalText = textContent.textContent.trim();

        if (originalText.length > 300) {
            const truncatedText = originalText.substring(0, 300) + '...';
            textContent.textContent = truncatedText;
            container.classList.add('show-btn');

            // Obtén el idioma desde el atributo data-lang del botón
            var lang = readMoreBtn.getAttribute('data-lang');

            // Define las traducciones para los botones
            var translations = {
                "es": {
                    "ver_mas": 'Ver más <i class="acuarela acuarela-Flecha_abajo"></i>',
                    "ver_menos": 'Ver menos <i class="acuarela acuarela-Flecha_arriba"></i>'
                },
                "en": {
                    "ver_mas": 'Read more <i class="acuarela acuarela-Flecha_abajo"></i>',
                    "ver_menos": 'Read less <i class="acuarela acuarela-Flecha_arriba"></i>'
                }
            };

            readMoreBtn.addEventListener('click', function () {
                if (textContent.classList.contains('expanded')) {
                    textContent.textContent = truncatedText;
                    readMoreBtn.innerHTML = translations[lang]["ver_mas"];
                } else {
                    textContent.textContent = originalText;
                    readMoreBtn.innerHTML = translations[lang]["ver_menos"];
                }
                textContent.classList.toggle('expanded');
            });
        }
    });
});