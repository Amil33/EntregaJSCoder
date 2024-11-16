//------- Sección de carga del juego
//------------------Tarjeta de aventurero------------------------------
// Función para mostrar la tarjeta inicial de bienvenida usando SweetAlert
function showAdventureCard(characterData) {
    Swal.fire({
        title: `⚔️¡Bienvenido, ${characterData.name}!⚔️`,
        html: `<p>¡Te has registrado en el gremio de aventureros con éxito!</p><p>Esta placa mágica se actualizará automáticamente y es tu identificación oficial como aventurero.</p>`,
        confirmButtonText: '¡Comenzar la Aventura!',
        background: '#cd7f32',
        color: '#fff',
    });
}

// Llamada a la función para mostrar la tarjeta de bienvenida al cargar la página
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slotNumber = urlParams.get("slot");

    if (slotNumber) {
        // Recupera los datos del personaje usando el número de slot
        const characterData = JSON.parse(localStorage.getItem(`characterData${slotNumber}`));

        if (characterData) {
            const infoDiv = document.getElementById("character-info");
            infoDiv.innerHTML = `
                <p>Nombre: ${characterData.name}</p>
                <p>Raza: ${characterData.race}</p>
                <p>Sexualidad: ${characterData.sexuality}</p>
                <p>Edad: ${characterData.age}</p>
                <p>Trasfondo: ${characterData.trasfondo}</p>
            `;
            // Muestra la tarjeta de bienvenida con los datos del personaje
            showAdventureCard(characterData);

            // Llama a la función para aplicar la apariencia del personaje
            displayCharacterAppearance(slotNumber);
        } else {
            alert("No se encontraron datos del personaje.");
        }
    } else {
        alert("Número de slot no especificado.");
    }
};

//--------------Fin de la tarjeta de aventurero---------------------------










//--------------------------------------------
//-------- Sección de Calendario
//------------------------------------------
// Variables para el tiempo del juego
let gameHours = 8;
let gameDays = 1;
let gameMonths = 1;
let gameYears = 733;
const hoursInDay = 24;
const daysInMonth = 33;
const monthsInYear = 12;
const dayDurationMs = 60000; // 1 minuto en tiempo real es 1 hora en el juego

// Elementos del DOM
const clockIcon = document.getElementById("clock-icon");
const clockText = document.getElementById("clock-text");

// Función para actualizar el tiempo en el juego
function updateGameTime() {
    gameHours++;

    // Cuando se alcanzan las 24 horas, avanza al siguiente día
    if (gameHours >= hoursInDay) {
        gameHours = 0;
        gameDays++;

        // Cuando se alcanzan los 33 días, avanza al siguiente mes
        if (gameDays > daysInMonth) {
            gameDays = 1;
            gameMonths++;

            // Cuando se alcanzan los 12 meses, avanza al siguiente año
            if (gameMonths > monthsInYear) {
                gameMonths = 1;
                gameYears++;
            }
        }
    }

    // Actualiza el ícono de día/noche según la hora
    const isDaytime = gameHours >= 6 && gameHours < 18; // Día de 6:00 a 17:59
    clockIcon.textContent = isDaytime ? "☀️" : "🌙";

    // Actualiza el texto del reloj
    clockText.textContent = `${isDaytime ? "Día" : "Noche"} ${gameHours}:00, Día ${gameDays}, Mes ${gameMonths}, Año ${gameYears}`;
}

// Iniciar el ciclo del tiempo en el juego
updateGameTime(); // Mostrar el tiempo inmediatamente
setInterval(updateGameTime, dayDurationMs);
//--------------Fin del Calendario---------------------------












// ------------- Mostrar imagen del personaje ----------------

// Función para aplicar los colores del personaje basado en el slot
function displayCharacterAppearance(slotNumber) {
    const characterData = JSON.parse(localStorage.getItem(`characterData${slotNumber}`));
    const characterRaceImg = document.getElementById('estado-img-race');

    // Verifica que los datos existan
    if (characterData) {
        // Aplica el color de fondo según la raza
        switch (characterData.race) {
            case 'humano':
                characterRaceImg.style.backgroundColor = '#FFA500'; // Color de humano
                break;
            case 'orco':
                characterRaceImg.style.backgroundColor = '#006400'; // Color de orco
                break;
            case 'elfo':
                characterRaceImg.style.backgroundColor = '#90EE90'; // Color de elfo
                break;
            case 'enano':
                characterRaceImg.style.backgroundColor = '#FFD700'; // Color de enano
                break;
            default:
                characterRaceImg.style.backgroundColor = '#000000'; // Color por defecto
                break;
        }
        
        const characterSexualityColor = document.getElementById("estado-race-sexuality");
        characterSexualityColor.style.backgroundColor = characterData.sexuality === "femenino" ? "#FF69B4" : "#1E90FF"; // Rosado para femenino y azul para masculino
    } else {
        characterRaceImg.style.backgroundColor = '#000000'; // Color por defecto si no hay datos
    }
}









//--------------------------------------------
//-------- Sección de monedas
//------------------------------------------
let wallet = 20; // Valor inicial del monedero

const updateWalletDisplay = () => {
    const walletElements = document.getElementsByClassName("wallet-amount");
    for (let element of walletElements) {
        element.textContent = wallet; // Actualiza el contenido de texto de cada elemento
    }
};

//--------------------------------------------
//-------- Sección de gestión de items
//------------------------------------------
// Elemento de contenedor de ítems
// Inicializa la bolsa de ítems como un arreglo vacío
let bagItems = [];

// Elemento de contenedor de ítems en la tienda
const itemsContainer = document.getElementById("items-container");

// Cargar los ítems al inicio de la página
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    displayBag();
    displayInventory();
});

async function loadItems() {
    try {
        const response = await fetch('../js/items.json');
        if (!response.ok) throw new Error('Error al cargar los ítems');
        items = await response.json();
        console.log("Ítems cargados:", items);
        displayItems();  // Llamada a displayItems después de cargar los ítems
    } catch (error) {
        console.error(error);
    }
}


// Función para mostrar los ítems en la tienda
function displayItems() {
    console.log("Mostrando ítems:", items);
    itemsContainer.innerHTML = ""; // Limpia el contenedor antes de añadir los ítems
    items.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item-card");
        itemElement.innerHTML = `
            <div class="item-image" style="background-color: grey; width: 100px; height: 100px;"></div>
            <p><strong>Nombre:</strong> ${item.name}</p>
            <p><strong>Descripción:</strong> ${item.description}</p>
            <p><strong>Precio:</strong> ${item.price} monedas</p>
            <button onclick="addToBag(${index})">Agregar a la bolsa</button>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Función para agregar un ítem a la bolsa
function addToBag(index) {
    const item = items[index];
    bagItems.push(item);
    displayBag(); // Muestra el contenido de la bolsa después de añadir un ítem
    console.log(`Ítem ${item.name} agregado a la bolsa.`);
}

// Función para mostrar los ítems en la bolsa
function displayBag() {
    const bagContainer = document.getElementById("bag-container");
    bagContainer.innerHTML = ""; // Limpia el contenido actual de la bolsa
    bagItems.forEach((item, index) => {
        const bagItemElement = document.createElement("div");
        bagItemElement.classList.add("bag-item");
        bagItemElement.innerHTML = `
            <p><strong>Nombre:</strong> ${item.name}</p>
            <p><strong>Precio:</strong> ${item.price} monedas</p>
            <button onclick="removeFromBag(${index})">Eliminar</button>
        `;
        bagContainer.appendChild(bagItemElement);
    });
}

// Función para eliminar un ítem de la bolsa
function removeFromBag(index) {
    bagItems.splice(index, 1); // Elimina el ítem en la posición especificada
    displayBag(); // Actualiza la bolsa después de eliminar el ítem
    console.log(`Ítem en posición ${index} eliminado de la bolsa.`);
}

// Inventario del personaje
const inventoryContainer = document.getElementById("inventory-container");

// Función para mostrar los ítems en el inventario
const displayInventory = () => {
    inventoryContainer.innerHTML = ""; // Limpia el contenido actual del inventario
    bagItems.forEach(item => {
        const inventoryItemElement = document.createElement("div");
        inventoryItemElement.classList.add("inventory-item");
        inventoryItemElement.textContent = item.name; // Opcional: Muestra el nombre del ítem
        inventoryContainer.appendChild(inventoryItemElement);
    });
};

//finalizePurchase para actualizar el inventario
function finalizePurchase() {
    if (bagItems.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Bolsa vacía',
            text: 'Tu bolsa está vacía, ¡agrega algunos artículos primero!',
        });
        return;
    }

    let total = 0;
    bagItems.forEach(item => {
        total += item.price;
    });

    if (wallet >= total) {
        wallet -= total;
        updateWalletDisplay();

        // Añade los ítems comprados al inventario
        displayInventory();

        // Crear la lista de artículos comprados
        const itemList = bagItems.map(item => `<li>${item.name} - ${item.price} monedas</li>`).join('');
        
        // Mostrar SweetAlert
        Swal.fire({
            icon: 'success',
            title: '¡Compra finalizada, aventurero!',
            html: `
                <p>¡Vuelva prontos!</p>
                <p>Artículos comprados:</p>
                <ul class="swal-list">${itemList}</ul>
                <p>Total gastado: <strong>${total} monedas</strong></p>
            `,
            confirmButtonText: '¡Entendido!'
        });

        // Vaciar la bolsa
        bagItems = [];
        displayBag();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Fondos insuficientes',
            text: 'No tienes suficientes monedas para completar la compra.',
        });
    }
}













// Elementos de las secciones de estado y tienda
const estadoContainer = document.querySelector('.estado__container');
const tiendaContainer = document.querySelector('#shop-interface');

// Función para mostrar una ventana y ocultar la otra si está abierta
function toggleDisplay(elementToShow, elementToHide) {
    // Si el elemento a mostrar está visible, lo oculta
    if (elementToShow.style.display === 'block') {
        elementToShow.style.display = 'none';
    } else {
        // Oculta el otro elemento y muestra el actual
        elementToHide.style.display = 'none';
        elementToShow.style.display = 'block';
        
        // Si se muestra la tienda, carga los ítems
        if (elementToShow === tiendaContainer) {
            displayItems();
        }
    }
}

// Alterna visibilidad de "Estado"
document.querySelector('.nav-link[href="#estado"]').addEventListener('click', function(event) {
    event.preventDefault(); // Previene el comportamiento de anclaje predeterminado
    toggleDisplay(estadoContainer, tiendaContainer);
});

// Alterna visibilidad de la "Tienda" al hacer clic en "Entrar a la Tienda"
document.getElementById("open-shop-btn").addEventListener("click", () => {
    toggleDisplay(tiendaContainer, estadoContainer); // Alterna visibilidad directamente
});







