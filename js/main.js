// Seccion del menú principal ---------
//----------
// Nuevo juego
document.getElementById('new-game').addEventListener('click', function() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('character-creation').style.display = 'flex';
    document.getElementById('character-visual').style.display = 'flex'; // Muestra el contenedor de visualización
});

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

//--------------
// Evitar que el formulario se envíe y recargue la página
document.getElementById('character-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    alert("Formulario completado. Personaje creado (simulado)"); 
    // Aquí podrías procesar los datos del formulario
});

//----------------
// -_-_-_-_- Seccion de botones y regreso al menú principal -_-_-_-
//----------------
// Mostrar la sección de Cargar Partida
document.querySelector('.menu-button:nth-child(2)').addEventListener('click', function() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('load-game').style.display = 'block';
});

// Mostrar la sección de Opciones
document.querySelector('.menu-button:nth-child(3)').addEventListener('click', function() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('options').style.display = 'block';
});

// Mostrar la sección de Créditos
document.querySelector('.menu-button:nth-child(4)').addEventListener('click', function() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('credits').style.display = 'block';
});

//volver al menú principal desde la creacion de personaje
document.getElementById('return-to-menu-load').addEventListener('click', function() {
    document.getElementById('character-creation').style.display = 'none';
    document.querySelector('.menu-container').style.display = 'block';
});

// Volver al menú principal desde Cargar Partida
document.getElementById('return-to-menu-load').addEventListener('click', function() {
    document.getElementById('load-game').style.display = 'none';
    document.querySelector('.menu-container').style.display = 'block';
});

// Volver al menú principal desde Opciones
document.getElementById('return-to-menu-options').addEventListener('click', function() {
    document.getElementById('options').style.display = 'none';
    document.querySelector('.menu-container').style.display = 'block';
});

// Volver al menú principal desde Créditos
document.getElementById('return-to-menu-credits').addEventListener('click', function() {
    document.getElementById('credits').style.display = 'none';
    document.querySelector('.menu-container').style.display = 'block';
});
//--------
// Fin de la seccion de botones y regreso -_-_-_
// ------



