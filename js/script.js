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


// Abrir o modal do carrinho
cartBtn.addEventListener('click', () => {
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
   }
   //adicionar no carrinho.
});

//function para adicionar no carrinho