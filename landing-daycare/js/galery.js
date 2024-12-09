// Función para alternar la edición de redes sociales
// function toggleSocialMediaEdit(button) {
//     const socialMediaCard = button.closest('.social-media');
//     const inputs = socialMediaCard.querySelectorAll('.change_sm');
//     const links = socialMediaCard.querySelectorAll('a');
//     const isEditing = button.getAttribute('data-editing') === 'true';

//     if (isEditing) {
//         // Guardar cambios y ocultar inputs
//         inputs.forEach((input, index) => {
//             const newValue = input.value.trim();
//             if (newValue) {
//                 links[index].href = newValue; // Actualizar el href
//             }
//             input.style.display = 'none'; // Ocultar inputs
//         });

//         button.setAttribute('data-editing', 'false');
//         button.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
//                 <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
//             </svg>Editar
//         `;
//     } else {
//         inputs.forEach(input => {
//             input.style.display = 'inline-block';
//         });

//         button.setAttribute('data-editing', 'true');
//         button.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
//                 <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
//             </svg>Guardar
//         `;
//     }
// }
function handleSocialMediaEdit(button) {
    const socialMediaCard = button.closest('.social-media');
    const isEditing = button.getAttribute('data-editing') === 'true';

    // Alternar entre los modos de edición y guardar
    toggleSocialMediaEdit(button);

    // Si el estado actual es "true" (modo edición), llamamos a saveSocialMedia al salir del modo edición
    if (isEditing) {
        saveSocialMedia(socialMediaCard);
    }
}


function toggleSocialMediaEdit(button) {
    const socialMediaCard = button.closest('.social-media');
    const inputs = socialMediaCard.querySelectorAll('.change_sm');
    const isEditing = button.getAttribute('data-editing') === 'true';

    if (isEditing) {
        // Cambiar a modo de visualización
        inputs.forEach(input => {
            input.style.display = 'none'; // Ocultar inputs
        });

        button.setAttribute('data-editing', 'false');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>Editar
        `;
    } else {
        // Cambiar a modo de edición
        inputs.forEach(input => {
            input.style.display = 'inline-block'; // Mostrar inputs
        });

        button.setAttribute('data-editing', 'true');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
            </svg>Guardar
        `;
    }
}


// Función para alternar la edición de imágenes
function toggleImageEdit(button) {
    const panel = button.closest('.galeria').querySelector('.edit-images-panel');
    const isVisible = panel.style.display === 'block';

    panel.style.display = isVisible ? 'none' : 'block';

    button.innerHTML = isVisible
        ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>Editar`
        : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
            </svg>Guardar`;
}

function handleImageChange(input, imageIndex) {
    const file = input.files[0];

    if (!file) {
        console.error("No file selected.");
        return;
    }

    // Crear un objeto FormData y añadir el archivo con la clave 'files'
    const formDataImg = new FormData();
    formDataImg.append("files", file); // 'files' es la clave que espera el servidor

    console.log(formDataImg);

    const endpoint = `https://acuarelacore.com/api/upload/`;

    fetch(endpoint, {
        method: "POST",
        body: formDataImg, // Enviar el FormData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("La respuesta no fue correcta: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const hash = data.hash; // Extraer el hash de la respuesta
            if (hash) {
                console.log(`Imagen cargada correctamente con el hash: ${hash}`);

                // Actualizar la galería
                updateGallery(hash, imageIndex);
            } else {
                console.error("Hash no encontrado en la respuesta");
            }
        })
        .catch(error => {
            console.error("Error al cargar la imagen:", error);
        });
}



// Función para actualizar el array de la galería con el nuevo hash
function updateGallery(hash, imageIndex) {
    const gallery = document.querySelector('.edit-images-panel ul');
    const li = gallery.querySelector(`li:nth-child(${imageIndex})`);

    if (li) {
        const img = li.querySelector('img');
        img.src = `https://acuarelacore.com/api/${hash}`;
        console.log(`Gallery updated for image index ${imageIndex}`);
    } else {
        console.warn(`No gallery item found for index ${imageIndex}`);
    }
}

// Agregar nueva imagen al formulario de galería
function addNewImage() {
    const ul = document.querySelector('.edit-images-panel ul');
    const newLi = document.createElement('li');
    const newIndex = ul.children.length + 1;

    newLi.innerHTML = `
        <img src="https://via.placeholder.com/100" alt="New Image" />
        <input type="file" accept="image/*" onchange="handleImageChange(this, ${newIndex})" />
        <button class="delete-btn" onclick="deleteImage(${newIndex})">Eliminar</button>
    `;

    ul.appendChild(newLi);
}

// Función para eliminar imagen del array de la galería
function deleteImage(imageIndex) {
    console.log(`Image ${imageIndex} deleted.`);
    const li = document.querySelector(`.edit-images-panel ul li:nth-child(${imageIndex})`);
    if (li) li.remove();
}