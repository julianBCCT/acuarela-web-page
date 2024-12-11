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


// const galeria = []; // Array global para almacenar imágenes temporalmente

// function handleImageChange(input) {
//     console.log("Ejecutando handleImageChange");
//     const file = input.files[0];

//     if (!file) {
//         console.error("No se seleccionó ningún archivo.");
//         return;
//     }

//     galeria.push(file); // Agregar la imagen al array galería
//     console.log(galeria);

//     const formDataImg = new FormData();
//     galeria.forEach((imagen, index) => {
//         formDataImg.append(`files[${index}]`, imagen); // Ajustar el nombre de los archivos
//     });
//     fetch("../set/handleGallery.php", {
//         method: "POST",
//         body: formDataImg,
//     })
//         .then(response => {
//             console.log("Estado de la respuesta:", response.status);
//             return response.json();
//         })
//         .then(data => {
//             //console.log("Respuesta JSON:", data);
    
//             if (data && data.results && data.results.length > 0) {
//                 data.results.forEach(result => {
//                     if (result.hash) {
//                         updateGallery(result.hash);
//                         console.log(result.hash);
//                     } else {
//                         console.error("No se encontró un hash válido en el resultado.");
//                     }
//                 });
//             } else {
//                 console.error("No se encontraron resultados en la respuesta.");
//             }
//         })
//         .catch(error => {
//             console.error("Error al cargar la imagen:", error);
//         });   
// }

const galeria = []; // Array global para almacenar imágenes temporalmente
//console.log(galeria);

function handleImageChange(input) {
    //console.log("Ejecutando handleImageChange");
    const file = input.files[0];

    if (!file) {
        console.error("No se seleccionó ningún archivo.");
        return;
    }

    // Obtener el tipo de input desde el atributo data-type
    const inputType = input.dataset.type;

    galeria.push(file); // Agregar la imagen al array galería
    //console.log(galeria);

    const formDataImg = new FormData();
    galeria.forEach((imagen, index) => {
        formDataImg.append(`files[${index}]`, imagen); // Ajustar el nombre de los archivos
    });

    fetch("../set/handleGallery.php", {
        method: "POST",
        body: formDataImg,
    })
        .then(response => {
            console.log("Estado de la respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.length > 0) {
                console.log(data);
                data.results.forEach(result => {
                    if (result.hash) {
                        console.log("Archivo galery.js"+result.hash);
                        // Ejecutar función específica según el tipo de input
                        if (inputType === "galeria") {
                            updateGallery(result.hash.id);
                        } else if (inputType === "logo") {
                            console.log("Actualizar logo con hash:", result.hash);
                            updateLogo(result.hash.id); 
                        } else if (inputType === "portada") {
                            console.log("Actualizar portada con hash:", result.hash.id);
                            updatePortada(result.hash.id);
                        } else {
                            console.warn("Tipo de input desconocido:", inputType);
                        }
                        // if (inputType === "galeria") {
                        //     updateGallery(result.hash);
                        // } else if (inputType === "logo") {
                        //     console.log("Actualizar logo con hash:", result.hash);
                        //     updateLogo(result.hash); 
                        // } else if (inputType === "portada") {
                        //     console.log("Actualizar portada con hash:", result.hash);
                        //     updatePortada(result.hash);
                        // } else {
                        //     console.warn("Tipo de input desconocido:", inputType);
                        // }
                    } else {
                        console.error("No se encontró un hash válido en el resultado.");
                    }
                });
            } else {
                console.error("No se encontraron resultados en la respuesta.");
            }
        })
        .catch(error => {
            console.error("Error al cargar la imagen:", error);
        });

    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    input.value = "";
}



// function addNewImage(galeriaIds) {
//     console.log("IDs de la galería recibidos:", galeriaIds);
//     getFormattedGallery(galeriaIds);
//     const ul = document.querySelector('.edit-images-panel ul');
//     const newLi = document.createElement('li');
//     const newIndex = ul.children.length + 1;

//     console.log("Ejecutado AddNewImage, índice:", newIndex);
//     newLi.innerHTML = `
//         <img src="https://via.placeholder.com/100" alt="New Image" />
//         <input type="file" accept="image/*" data-type="galeria" onchange="handleImageChange(this, ${newIndex})" />
//         <button class="delete-btn" onclick="deleteImage(${newIndex})">Eliminar</button>
//     `;

//     ul.appendChild(newLi);
// }

// //  // Función para formatear el array
// // function getFormattedGallery(galeriaIds) {
// //     const galeryArray = [...galeriaIds];
// //     return galeryArray.map(id => ({ id })); // Convierte cada ID en un objeto con clave `id`
// // }

// function updateGallery(galeryArray) {
//     // Convertir el array de objetos a JSON
//     const bodyResponse = JSON.stringify(galeryArray);

//     console.log('Este es el array de ids que traemos'+bodyResponse);
//     // Enviar el array al backend
//     fetch("../set/updateGalery.php", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json", // Enviar datos como JSON
//         },
//         body: bodyResponse,
//     })
//         .then(response => {
//             console.log("Estado de la respuesta:", response.status);
//             return response.json();
//         })
//         .then(data => {
//             console.log("Respuesta JSON:", data);
//         })
//         .catch(error => {
//             console.error("Error al actualizar la galería:", error);
//         });
// }




// Función para formatear el array
function getFormattedGallery(galeriaIds) {
    return galeriaIds.map(id => ({ id })); // Convierte cada ID en un objeto con clave `id`
}

// Función para combinar arrays de galería sin duplicados
function combineGalleryArrays(existingArray, newArray) {
    const combinedArray = [...existingArray];

    newArray.forEach(newItem => {
        if (!combinedArray.find(item => item.id === newItem.id)) {
            combinedArray.push(newItem); // Agrega solo si no existe
        }
    });

    return combinedArray;
}

// Array global que contiene los IDs ya existentes
let galeryArray = [];
let galeryIds = [];

// Función para agregar una nueva imagen
function addNewImage(galeriaIds) {
    //console.log("Funcion AddNewImage: IDs de la galería recibidos:", galeriaIds);

    galeryIds = [...galeriaIds];


    //console.log("Funcion AddNewImage: Array combinado:", galeryArray);


    // Agregar una nueva imagen visualmente al DOM
    const ul = document.querySelector('.edit-images-panel ul');
    const newLi = document.createElement('li');
    const newIndex = ul.children.length + 1;

    newLi.innerHTML = `
        <img src="https://via.placeholder.com/100" alt="New Image" />
        <input type="file" accept="image/*" data-type="galeria" onchange="handleImageChange(this, ${newIndex})" />
        <button class="delete-btn" onclick="deleteImage(${newIndex})">Eliminar</button>
    `;

    ul.appendChild(newLi);
}

function convertToIdObjects(array) {
    return array.map(item => ({ id: item })); // Convierte cada elemento en un objeto con clave `id`
}


// Función para actualizar la galería en el backend
function updateGallery(galeryArray) {

    finalArrayGalery = [galeryArray, ...galeryIds];
    const formattedArray = convertToIdObjects(finalArrayGalery);

    //console.log(formattedArray);
    // Convertir el array de objetos a JSON
    const bodyResponse = JSON.stringify(formattedArray);

    console.log('Funcion UpdateGallery: ' + bodyResponse);

    // Enviar el array al backend
    fetch("../set/updateGalery.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Enviar datos como JSON
        },
        body: bodyResponse,
    })
        .then(response => {
            console.log("Estado de la respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Respuesta JSON:", data);
        })
        .catch(error => {
            console.error("Error al actualizar la galería:", error);
        });
}



function updateLogo(logoArray) {
    // Convertir el array de objetos a JSON
    const bodyResponse = JSON.stringify({
        id: logoArray, // Pasamos directamente el array de objetos completo
    });
    console.log(bodyResponse);

    // Enviar el array al backend
    fetch("../set/updateLogo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Enviar datos como JSON
        },
        body: bodyResponse,
    })
        .then(response => {
            console.log("Estado de la respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Respuesta JSON:", data);
        })
        .catch(error => {
            console.error("Error al actualizar el logo:", error);
        });
}

function updatePortada(portadaArray) {
    // Convertir el array de objetos a JSON
    const bodyResponse = JSON.stringify({
        id: portadaArray, // Pasamos directamente el array de objetos completo
    });

    console.log(bodyResponse);

    // Enviar el array al backend
    fetch("../set/updatePortada.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Enviar datos como JSON
        },
        body: bodyResponse,
    })
        .then(response => {
            console.log("Estado de la respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Respuesta JSON:", data);
        })
        .catch(error => {
            console.error("Error al actualizar la portada:", error);
        });
}


