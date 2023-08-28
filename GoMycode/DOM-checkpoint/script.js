
function openBar() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.visibility = "visible";
  }
  

  function closeBar() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.visibility = "hidden";
  }




const cartItems = [];


function addToCart(itemName, price) {

  const existingItem = cartItems.find(item => item.name === itemName);

  if (existingItem) {

    existingItem.quantity++;
  } else {

    cartItems.push({ name: itemName, price: price, quantity: 1 });
  }

  updateCartDisplay();
}


function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceDiv = document.getElementById("total-price");

  if (cartItems.length === 0) {
    cartItemsDiv.textContent = "Your cart is empty";
    totalPriceDiv.textContent = "$ 0.00";
  } else {

    let cartHTML = "";
    let totalPrice = 0;

    cartItems.forEach(item => {
      cartHTML += `${item.name} x${item.quantity}<br>`;
      totalPrice += item.price * item.quantity;
    });

    cartItemsDiv.innerHTML = cartHTML;
    totalPriceDiv.textContent = `$ ${totalPrice.toFixed(2)}`;
  }
}


document.addEventListener("DOMContentLoaded", function(){
    updateCartDisplay();
});
