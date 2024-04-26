//Contraste entre colores

document.addEventListener("DOMContentLoaded", function() {
    var colorPrimario = getComputedStyle(document.documentElement).getPropertyValue('--color-primario').trim();
    var colorTexto = '#060606'; // Negro por defecto

    var contraste = calcularContraste(colorPrimario, colorTexto);
    
    if (contraste < 4.5) {
        document.documentElement.style.setProperty('--color-botones', 'white'); // Establece el color de texto en blanco
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

//Galeria

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
