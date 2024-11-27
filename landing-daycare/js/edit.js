document.querySelectorAll('[data-field="content"]').forEach((el) => {
    el.setAttribute('contenteditable', 'false');
});

document.querySelectorAll('p').forEach(p => {
    p.setAttribute('contenteditable', 'false');
});

function enableEdit(lapiz) {
    // Obtener la sección contenedora (cualquier sección padre del lápiz)
    const section = lapiz.closest('div');
    if (!section) return; // Asegurar que el lápiz esté dentro de una sección

    // Buscar todos los elementos editables dentro de la sección
    const fields = section.querySelectorAll('[contenteditable]');

    // Alternar entre "Guardar" y "Editar" basado en el estado actual
    const isEditing = lapiz.getAttribute('data-editing') === 'true';

    if (isEditing) {
        // Cambiar a modo "Editar" desactivando contenteditable
        fields.forEach(field => {
            field.setAttribute('contenteditable', 'false');
            field.style.border = ''; // Quitar borde visual
        });
        lapiz.setAttribute('data-editing', 'false');
        lapiz.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>Editar
        `;

        // Guardar cambios de toda la sección
        saveChanges(section);
    } else {
        // Cambiar a modo "Guardar" activando contenteditable
        fields.forEach(field => {
            field.setAttribute('contenteditable', 'true');
            field.style.border = '1px dashed #007bff'; // Borde visual para indicar edición
        });
        lapiz.setAttribute('data-editing', 'true');
        lapiz.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
            </svg>Guardar
        `;
    }
}

/*function saveChanges(section) {
    const data = {};

    // Recopilar todos los campos editables dentro de la sección
    const fields = section.querySelectorAll('[contenteditable]');
    fields.forEach(field => {
        const fieldName = field.getAttribute('data-field');
        data[fieldName] = field.textContent.trim();
    });

    console.log("Datos guardados:", data);

    // Enviar los datos al servidor
    fetch('save-section.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Cambios guardados en el servidor:", result);
        alert("Cambios guardados correctamente.");
    })
    .catch(error => {
        console.error("Error al guardar cambios:", error);
        alert("Error al guardar los cambios.");
    });
}*/

// Habilitar la edición de un servicio
function enableServiceEdit(button) {
    const item = button.closest('li'); // Buscar el elemento <li>
    const paragraph = item.querySelector('p'); // Obtener el contenido editable

    // Alternar entre edición y guardado
    const isEditing = paragraph.getAttribute('contenteditable') === 'true';

    if (isEditing) {
        // Finalizar edición
        paragraph.setAttribute('contenteditable', 'false');
        paragraph.style.border = ''; // Quitar borde visual
        saveServiceChange(item.dataset.id, paragraph.textContent.trim());
    } else {
        // Habilitar edición
        paragraph.setAttribute('contenteditable', 'true');
        paragraph.style.border = '1px dashed #007bff'; // Indicar edición
        paragraph.focus(); // Colocar el cursor en el texto
    }
}

// Eliminar un servicio
function deleteServiceItem(button) {
    const item = button.closest('li'); // Buscar el elemento <li>
    const serviceId = item.dataset.id; // Obtener el ID del servicio

    // Confirmar eliminación
    if (confirm('¿Seguro que deseas eliminar este servicio?')) {
        item.remove(); // Eliminar del DOM
        fetch('delete-service.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: serviceId }) // Enviar el ID al servidor
        })
        .then(response => response.json())
        .then(result => {
            alert('Servicio eliminado correctamente.');
        })
        .catch(error => console.error('Error al eliminar servicio:', error));
    }
}

// Agregar un nuevo servicio
function addNewService() {
    const list = document.getElementById('services-list'); // Buscar la lista de servicios
    const newItem = document.createElement('li'); // Crear un nuevo elemento <li>
    const newId = list.children.length; // Asignar un nuevo ID basado en la cantidad de elementos

    newItem.dataset.id = newId; // Asignar el ID al nuevo elemento
    newItem.innerHTML = `
        <p contenteditable="true" style="border: 1px dashed #007bff;">Nuevo Servicio</p>
        <span class="edit-icon" onclick="enableServiceEdit(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg></span>
                        <button class="delete-btn" onclick="deleteServiceItem(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
    `;
    list.appendChild(newItem); // Añadir el nuevo servicio a la lista

    // Guardar el nuevo servicio en el servidor
    saveServiceChange(newId, 'Nuevo Servicio');
}

function exitEditMode() {
    // Aquí puedes agregar lógica adicional antes de salir del modo de edición
    alert('Saliendo del modo de edición...');
    // Redirigir a una URL específica
    window.location.href = '';
}
