// Seccion del menú principal ---------
//----------
// Nuevo juego
document.getElementById('new-game').addEventListener('click', function() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('character-creation').style.display = 'flex';
    document.getElementById('character-visual').style.display = 'flex'; // Muestra el contenedor de visualización
});
//----------------
// -_-_-_-_- Seccion de navegación por el menu -_-_-_-
//----------------
// Función para mostrar una sección y ocultar el menú principal
function showSection(sectionId) {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}
// Event listeners para mostrar cada sección
document.querySelector('.menu-button:nth-child(2)').addEventListener('click', () => showSection('load-game'));
document.querySelector('.menu-button:nth-child(3)').addEventListener('click', () => showSection('options'));
document.querySelector('.menu-button:nth-child(4)').addEventListener('click', () => showSection('credits'));
// Función para regresar al menú principal y ocultar otras secciones
function returnToMenu(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
    document.querySelector('.menu-container').style.display = 'block';
}
// Event listeners para regresar al menú principal desde cada sección
document.getElementById('return-to-menu-character-creation').addEventListener('click', () => returnToMenu('character-creation'));
document.getElementById('return-to-menu-load-game').addEventListener('click', () => returnToMenu('load-game'));
document.getElementById('return-to-menu-options').addEventListener('click', () => returnToMenu('options'));
document.getElementById('return-to-menu-credits').addEventListener('click', () => returnToMenu('credits'));
//--------
// Fin de la seccion de botones y regreso -_-_-_
// ------










//------------------------------------------------------------
// Algoritmo de actualizacion visual de personaje
// -----------------------------------------------------------
// Obtener los elementos de los rectángulos
const baseColorRect = document.getElementById('base-color');
const sexColorRect = document.getElementById('sex-color');
// Obtener los elementos del formulario
const raceSelect = document.getElementById('race');
const sexualitySelect = document.getElementById('sexuality');
const ageInput = document.getElementById('age');
const cuadroHabilidades = document.getElementById("cuadro-habilidades");
const trasfondoSelect = document.getElementById('trasfondo');
const cuadroTrasfondo = document.getElementById("cuadro-trasfondo");
// Definir límites de edad y habilidades según la raza seleccionada
const edadesPorRaza = {
    humano: {min: 18, max: 40, habilidades: "Resistencia humana, adaptable."},
    elfo: {min: 25, max: 300, habilidades: "Magia avanzada, longevidad."},
    orco: {min: 10, max: 80, habilidades: "Fuerza bruta, agresividad."},
    enano: {min: 20, max: 100, habilidades: "Resistencia física, tenacidad."}
}; 
// Función para actualizar el color de la raza
function updateRaceColor() {
    const race = raceSelect.value;
    switch (race) {
        case 'humano':
            baseColorRect.style.backgroundColor = '#FFA500'; // Naranja para humano
            cuadroHabilidades.textContent = edadesPorRaza.humano.habilidades; // Habilidades para humano
            break;
        case 'orco':
            baseColorRect.style.backgroundColor = '#006400'; // Verde oscuro para orco
            cuadroHabilidades.textContent = edadesPorRaza.orco.habilidades; // Habilidades para orco
            break;
        case 'elfo':
            baseColorRect.style.backgroundColor = '#90EE90'; // Verde claro para elfo
            cuadroHabilidades.textContent = edadesPorRaza.elfo.habilidades; // Habilidades para elfo
            break;
        case 'enano':
            baseColorRect.style.backgroundColor = '#FFD700'; // Amarillo para enano
            cuadroHabilidades.textContent = edadesPorRaza.enano.habilidades; // Habilidades para enano
            break;
        default:
            baseColorRect.style.backgroundColor = '#000000'; // Por defecto
            cuadroHabilidades.textContent = "Habilidades raciales"; // Texto por defecto
            break;
    }
    // Actualizar el rango de edad permitido según la raza
    if (edadesPorRaza[race]) {
        const { min, max } = edadesPorRaza[race];
        ageInput.min = min;
        ageInput.max = max;
        ageInput.value = min; // Establecer el valor por defecto a la edad mínima
    }
}
// Definir beneficios según el trasfondo seleccionado
const beneficiosPorTrasfondo = {
    peleador: "Gran fuerza física y habilidades de combate cuerpo a cuerpo.",
    medico: "Conocimiento en medicina, puede curar y ayudar a otros.",
    socialista: "Habilidad para gestionar relaciones sociales y políticas."
};
// Función para actualizar el cuadro de beneficios del trasfondo
function updateTrasfondoDetails() {
    const trasfondoSeleccionado = trasfondoSelect.value;
    cuadroTrasfondo.textContent = beneficiosPorTrasfondo[trasfondoSeleccionado] || "Detalles de trasfondo";
}

//Asegurarse que el cuadro de trasfondo se actualiza
trasfondoSelect.addEventListener('change', updateTrasfondoDetails);

// Función para actualizar el color de la sexualidad
function updateSexualityColor() {
    const sexuality = sexualitySelect.value;

    if (sexuality === 'masculino') {
        sexColorRect.style.backgroundColor = '#0000FF'; // Azul para masculino

    } else if (sexuality === 'femenino') {
        sexColorRect.style.backgroundColor = '#FFC0CB'; // Rosado para femenino

    } else {
        sexColorRect.style.backgroundColor = '#808080'; // Gris para otros
    }
}

// Actualizar los colores de raza al cambiar las selecciones
raceSelect.addEventListener('change', function() {
    updateRaceColor();
});

sexualitySelect.addEventListener('change', function() {
    updateSexualityColor();
});

// Mostrar la visualización solo cuando sea necesario
document.getElementById('character-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('character-visual').classList.remove('hidden'); // Mostrar la visualización
    updateRaceColor();
    updateSexualityColor();
});

//-------------------------------------------------------------
// Fin del algoritmo de actualizacion de visualizacion del Personaje
// -----------------------------------------------------------










//---------------------------------------------------------------------
// ------------------ Funciones de guardado y carga de datos
//-------------------------------------------------------------------

// Encuentra el primer slot vacío disponible en el localStorage
const findEmptySlot = () => {
    for (let i = 1; i <= 3; i++) { // Supongamos que tienes 3 slots
        const slotKey = `characterData${i}`;
        if (!localStorage.getItem(slotKey)) {
            return slotKey; // Devuelve el primer slot vacío encontrado
        }
    }
    return null; // Si todos los slots están llenos, devuelve null
};

// Guarda el personaje en un slot específico
const saveCharacter = (slotNumber) => {
    const characterData = {
        name: document.getElementById("name").value,
        race: document.getElementById("race").value,
        sexuality: document.getElementById("sexuality").value,
        age: document.getElementById("age").value,
        trasfondo: document.getElementById("trasfondo").value
    };
    const slotKey = `characterData${slotNumber}`;
    localStorage.setItem(slotKey, JSON.stringify(characterData));
};

// Guarda el personaje en el primer slot vacío
const saveCharacterInEmptySlot = () => {
    const characterData = {
        name: document.getElementById("name").value,
        race: document.getElementById("race").value,
        sexuality: document.getElementById("sexuality").value,
        age: document.getElementById("age").value,
        trasfondo: document.getElementById("trasfondo").value
    };

    const emptySlotKey = findEmptySlot();
    if (emptySlotKey) {
        localStorage.setItem(emptySlotKey, JSON.stringify(characterData));

        // Extrae el número de slot a partir de `emptySlotKey`, que es algo como "characterData1"
        const slotNumber = emptySlotKey.replace("characterData", "");
        window.open(`pages/inicio.html?slot=${slotNumber}`, "_blank"); // Abre la página de inicio con el personaje creado
    } else {
        alert("Todos los slots están llenos. Por favor, borra un slot antes de crear un nuevo personaje.");
    }
};


//---------------------------------------------------------------------
// ------------------ Eventos de guardado en el formulario
//-------------------------------------------------------------------
document.getElementById("character-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío del formulario
    alert("Formulario completado. Personaje creado (simulado)");
    saveCharacterInEmptySlot(); // Llama a la función que guarda en el primer slot vacío
});

//---------------------------------------------------------------------
// ------------------ Carga de partidas
//-------------------------------------------------------------------

// Define la función loadCharacter para que funcione con el onclick en el HTML
const loadCharacter = (slotNumber) => {
    const slotKey = `characterData${slotNumber}`;
    const savedData = localStorage.getItem(slotKey);

    if (savedData) {
        const characterData = JSON.parse(savedData);
        window.open(`pages/inicio.html?slot=${slotNumber}`, "_blank"); // Abre la página de inicio con el personaje cargado
    } else {
        alert("No se encontró una partida guardada en este slot.");
    }
};

//---------------------------------------------------------------------
// ------------------ Borrar datos de un slot específico
//-------------------------------------------------------------------
const deleteCharacter = (slotNumber) => {
    const slotKey = `characterData${slotNumber}`;
    if (localStorage.getItem(slotKey)) {
        localStorage.removeItem(slotKey);
        alert(`Partida guardada en el Slot ${slotNumber} ha sido eliminada.`);
    } else {
        alert(`No hay datos en el Slot ${slotNumber} para borrar.`);
    }
};

//---------------------------------------------------------------------
// ------------------ Eventos para los botones de borrar slots
//-------------------------------------------------------------------
document.querySelectorAll(".delete-slot").forEach((button, index) => {
    button.addEventListener("click", () => {
        deleteCharacter(index + 1); // Borra el personaje del slot correspondiente
    });
});







