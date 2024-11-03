//------- Sección de carga del juego
// Obtén el parámetro 'slot' de la URL
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
    } else {
        alert("No se encontraron datos del personaje.");
    }
} else {
    alert("Número de slot no especificado.");
}
//--------------- Fin de la carga del juego







//--------------------------------------------
//-------- Sección de monedas
//------------------------------------------
let wallet = 20; // Valor inicial del monedero

const updateWalletDisplay = () => {
    document.getElementById("wallet-amount").textContent = wallet;
};

const buyItem = (item) => {
    if (wallet >= item.price) {
        wallet -= item.price; // Resta el costo del ítem del monedero
        updateWalletDisplay(); // Actualiza el monedero en la interfaz
        alert(`Compraste ${item.name} por ${item.price} monedas.`);
    } else {
        alert("No tienes suficiente dinero para comprar este ítem.");
    }
};

//--------------------------------------------
//-------- Sección de gestión de items
//------------------------------------------
const loadItems = async () => {
    try {
        const response = await fetch('../js/items.json');
        if (!response.ok) {
            throw new Error('Error al cargar los ítems');
        }
        items = await response.json(); // Asigna los datos directamente al array global items
        console.log(items); // Aquí puedes ver los ítems cargados en la consola
        
        // Aquí puedes inicializar el inventario del jugador o mostrar los ítems en la UI
        initializeInventory(items);
    } catch (error) {
        console.error(error);
    }
};

const initializeInventory = (items) => {
    // Inicializa el inventario del jugador con los ítems cargados
    // También podrías mostrar los ítems en la interfaz del usuario
};

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadItems);

//---- Tienda
const itemsContainer = document.getElementById("items-container");
const bag = [];

// Genera la lista de ítems en la tienda
const displayItems = () => {
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
};

//------- Agregar a la bolsa de compras
const bagContainer = document.getElementById("bag-container");

// Agrega el ítem a la bolsa y actualiza la interfaz de la bolsa
const addToBag = (itemIndex) => {
    const item = items[itemIndex];
    bag.push(item);
    updateBag();
};

// Actualiza la interfaz de la bolsa
const updateBag = () => {
    bagContainer.innerHTML = ""; // Limpia el contenedor antes de añadir los ítems en la bolsa
    
    bag.forEach((item, index) => {
        const bagItemElement = document.createElement("div");
        bagItemElement.classList.add("bag-item");

        bagItemElement.innerHTML = `
            <p>${item.name} - ${item.price} monedas</p>
            <button onclick="removeFromBag(${index})">Quitar</button>
        `;

        bagContainer.appendChild(bagItemElement);
    });
};

// Quita el ítem de la bolsa y actualiza la interfaz de la bolsa
const removeFromBag = (itemIndex) => {
    bag.splice(itemIndex, 1); // Elimina el ítem de la bolsa
    updateBag(); // Actualiza la visualización de la bolsa
};

const finalizePurchase = () => {
    let totalCost = bag.reduce((sum, item) => sum + item.price, 0);

    if (wallet >= totalCost) { // Usamos wallet en lugar de playerMoney
        wallet -= totalCost;
        alert("Compra realizada con éxito. ¡Buena suerte en tu aventura!");
        bag.length = 0; // Vacía la bolsa después de la compra
        updateWalletDisplay();
        updateBag();
    } else {
        alert("No tienes suficiente dinero para esta compra.");
    }
};

let items = []; // Inicializamos items como un array vacío

// Función para mostrar la tienda
const showShop = () => {
    displayItems(); // Llama a la función para mostrar los ítems en la tienda
    const shopInterface = document.getElementById("shop-interface");
    shopInterface.style.display = "block"; // Cambia la visibilidad de la tienda
};

// Evento click para el botón "Entrar a la Tienda"
document.getElementById("open-shop-btn").addEventListener("click", () => {
    // Carga los ítems desde el JSON si no están cargados
    if (items.length === 0) {
        fetch('../js/items.json')
            .then(response => response.json())
            .then(data => {
                items = data; // Asigna los datos al array de ítems
                showShop(); // Muestra la tienda después de cargar los ítems
            })
            .catch(error => console.error("Error al cargar los ítems:", error));
    } else {
        showShop(); // Si ya están cargados, simplemente muestra la tienda
    }
});



