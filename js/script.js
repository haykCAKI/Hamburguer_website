const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartMoral = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkOut = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("adress");
const addresWorn = document.getElementById("adress-warn");

//start array vazio
let cart = [];


// Abrir o modal do carrinho
cartBtn.addEventListener('click', () => {
   updateCartModal();
   cartMoral.style.display = "flex";
   
});

// Fechar o modal quando clicar fora
cartMoral.addEventListener("click", (event) => {
   if (event.target === cartMoral) {
      cartMoral.style.display = "none";
   }
});

// Apertar o fechar no modal para fechar
closeModalBtn.addEventListener("click", () => {
   cartMoral.style.display = "none";
});

menu.addEventListener("click", (event) => {

   let parentButton = event.target.closest(".add-to-cart-btn");

   if (parentButton) {
      const name = parentButton.getAttribute("data-name");
      const price = parseFloat(parentButton.getAttribute("data-price"));

      //adicionar no carrinho.
      addToCart(name, price);
   }

});

//function para adicionar no carrinho
function addToCart(name, price) {

   const existingItem = cart.find(item => {
      item.name === name
   })

   if (existingItem) {
      //se o item existe, apenas adiciona mais uma quantidade no contador de quantity += 1;
      existingItem.quantity += 1;
   } else {
      cart.push({
         name,
         price,
         quantity: 1,
      })
   }

   updateCartModal()
}

//Atualizar o carrinho
function updateCartModal() {
   cartItemsContainer.innerHTML = "";
   let total = 0;

   cart.forEach(item => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

      cartItemElement.innerHTML = `
         <div class="flex items-center justify-between">
            <div>
               <p class="font-medium">${item.name}</p>
               <p>Qtd: ${item.quantity}</p>
               <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>

            <button>
               Remover
            </button>

         </div>
      `
      total += item.price * item.quantity;

      cartItemsContainer.appendChild(cartItemElement);
   })

   cartTotal.textContent = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   cartCounter.innerHTML = cart.length;
}