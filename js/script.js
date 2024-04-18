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

   const existingItem = cart.find(item =>
      item.name === name
   )

   if (existingItem) {
      //se o item existe, apenas adiciona mais uma quantidade no contador de quantity += 1;
      existingItem.quantity += 1;
   } else {
      cart.push({
         name,
         price,
         quantity: 1,
      });
   }

   updateCartModal()
}

//Atualizar o carrinho
function updateCartModal() {
   cartItemsContainer.innerHTML = "";
   let total = 0;
   let totalItems = 0;

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

            <button class="remove-from-cart-btn" data-name="${item.name}">
               Remover
            </button>

         </div>
      `
      total += item.price * item.quantity;
      totalItems += item.quantity;

      cartItemsContainer.appendChild(cartItemElement);
   })

   cartTotal.textContent = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   cartCounter.innerHTML = totalItems;
}

//Função para Remover item do carrinho
cartItemsContainer.addEventListener('click', (event) => {
   if (event.target.classList.contains("remove-from-cart-btn")) {
      const name = event.target.getAttribute("data-name")

      removerItemCart(name);
   }
})

function removerItemCart(name) {
   const index = cart.findIndex(item => item.name === name);

   if (index !== -1) {
      const item = cart[index];

      if (item.quantity > 1) {
         item.quantity -= 1;
         updateCartModal();
         return;
      }

      cart.splice(index, 1);
      updateCartModal();
   }
}

addressInput.addEventListener('input', (event) => {
   let inputValue = event.target.value;

   if (inputValue !== "") {
      addressInput.classList.remove("border-red-500");
      addresWorn.classList.add("hidden");
   }
})


//Finalizar pedido
checkOut.addEventListener('click', () => {

   const isOpen = checkRestaurantOpen();
   if (!isOpen) {
      Toastify({
         text: "O Restaurante está fechado",
         duration: 3000,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
            background: "#ef4444",
         },
      }).showToast();
      return;
   }
   if (cart.length === 0) return;
   if (addressInput.value === "") {
      addresWorn.classList.remove("hidden");
      addressInput.classList.add("border-red-500")
   }

   //Enviar o pedido para api whats
   const carItems = cart.map((item) => {
      return (
         `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
      )
   }).join("")

   const message = encodeURIComponent(carItems);
   const phone = "41992700202"

   window.open(`http://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

   cart = [];
   updateCartModal();
})


//verificar a hora de manipular o card horario
function checkRestaurantOpen() {
   const data = new Date();
   const hora = data.getHours();
   return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
   spanItem.classList.remove("bg-red-500");
   spanItem.classList.add("bg-green-600")
} else {
   spanItem.classList.remove("bg-green-500");
   spanItem.classList.add("bg-red-600")
}