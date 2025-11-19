// script.js

/**
 * INICIALIZACIÓN DEL MAPA
 * Centrado en las coordenadas iniciales con un nivel de zoom de 13
 */
const map = L.map('map').setView([21.03, -101.56], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data OpenStreetMap contributors'
}).addTo(map);


/**
 * LÓGICA DEL MARCADOR
 * Permite al usuario seleccionar un punto en el mapa.
 */
let marker;

map.on('click', function(e) {
    const { lat, lng } = e.latlng;

    // Rellenar los inputs del formulario automáticamente
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;

    // Si ya existe un marcador, lo eliminamos para poner el nuevo
    if (marker) {
        map.removeLayer(marker);
    }

    // Crear nuevo marcador y abrir popup
    marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup('Ubicación Seleccionada')
        .openPopup();
});


/**
 * MANEJO DEL FORMULARIO
 * Envía los datos a la API sin recargar la página de inmediato.
 */
document.getElementById('place-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Captura de valores
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const latitude = parseFloat(document.getElementById('lat').value);
    const longitude = parseFloat(document.getElementById('lng').value);

    // Petición POST a la API
    const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            latitude,
            longitude
        })
    });

    // Confirmación y recarga
    const data = await response.json();
    alert('Lugar registrado correctamente');
    location.reload();
});


/**
 * CARGA DE LUGARES
 * Obtiene los lugares guardados al cargar la página.
 */
async function loadPlaces() {
    try {
        const res = await fetch('/api/places');
        const places = await res.json();

        places.forEach(place => {
            // GeoJSON guarda como [longitud, latitud], Leaflet usa [latitud, longitud]
            const [lng, lat] = place.location.coordinates;

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`<strong>${place.name}</strong><br>${place.description}`);
        });
    } catch (error) {
        console.error("Error al cargar los lugares:", error);
    }
}

// Ejecutar la carga inicial
loadPlaces();
