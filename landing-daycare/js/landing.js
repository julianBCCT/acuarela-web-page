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
