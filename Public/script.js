// Inicialización del mapa
const map = L.map('map').setView([21.03, -101.56], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data OpenStreetMap contributors'
}).addTo(map);

let marker;

// Click en el mapa para poner coordenadas
map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    setFormCoordinates(lat, lng);
});

// Función auxiliar para poner el marcador y llenar inputs
function setFormCoordinates(lat, lng) {
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;

    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
}

/**
 * MANEJO DEL FORMULARIO (CREAR O EDITAR)
 */
document.getElementById('place-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('place-id').value; // Checamos si hay ID oculto
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const latitude = parseFloat(document.getElementById('lat').value);
    const longitude = parseFloat(document.getElementById('lng').value);

    const url = id ? `/places/${id}` : '/places'; // Si hay ID usa PUT, si no POST
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, latitude, longitude })
        });

        if (response.ok) {
            alert(id ? 'Lugar actualizado' : 'Lugar registrado');
            resetForm();
            loadPlaces(); // Recargar mapa y tabla
        } else {
            alert('Error al guardar');
        }
    } catch (error) {
        console.error(error);
    }
});

/**
 * FUNCIÓN EDITAR (Se llama desde el botón de la tabla)
 */
window.editPlace = function(id, name, description, lat, lng) {
    // 1. Llenar el formulario con los datos existentes
    document.getElementById('place-id').value = id; // ID oculto
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;

    // 2. Poner el marcador en el mapa en la posición a editar
    setFormCoordinates(lat, lng);

    // 3. Cambiar texto del botón y mostrar cancelar
    document.getElementById('btn-save').innerText = "Actualizar Lugar";
    document.getElementById('btn-cancel').style.display = "inline-block";
}

/**
 * FUNCIÓN BORRAR
 */
window.deletePlace = async function(id) {
    if (!confirm('¿Estás seguro de eliminar este lugar?')) return;

    try {
        await fetch(`/places/${id}`, { method: 'DELETE' });
        alert('Eliminado');
        loadPlaces(); // Recargar tabla y mapa
    } catch (error) {
        console.error(error);
    }
}

function resetForm() {
    document.getElementById('place-form').reset();
    document.getElementById('place-id').value = ''; // Limpiar ID
    document.getElementById('btn-save').innerText = "Guardar Lugar";
    document.getElementById('btn-cancel').style.display = "none";
    if (marker) map.removeLayer(marker);
}

/**
 * CARGA DE DATOS (Mapa y Tabla)
 */
async function loadPlaces() {
    try {
        const res = await fetch('/places');
        const places = await res.json();

        // Limpiar mapa (quitar marcadores viejos para no duplicar)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) map.removeLayer(layer);
        });

        // Limpiar tabla
        const tableBody = document.querySelector('#places-table tbody');
        tableBody.innerHTML = '';

        places.forEach(place => {
            const [lng, lat] = place.location.coordinates;

            // 1. Agregar al Mapa
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${place.name}</b><br>${place.description}`);

            // 2. Agregar a la Tabla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${place.name}</td>
                <td>${place.description}</td>
                <td>${lat.toFixed(4)}</td>
                <td>${lng.toFixed(4)}</td>
                <td>
                    <button class="btn-edit" onclick="editPlace('${place._id}', '${place.name}', '${place.description}', ${lat}, ${lng})">Editar</button>
                    <button class="btn-delete" onclick="deletePlace('${place._id}')">Borrar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error cargando lugares:", error);
    }
}

loadPlaces();
