"use strict"

const basketElement = document.querySelector(".basket");
const basketTotalElement = document.querySelector(".basketTotal");
const itemsTotalCounter = document.querySelector(".cartIconWrap span");
const itemsTotalPrice = document.querySelector(".basketTotalValue");

function getTotalItemsCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalItemsPrice() {
  return Object
  .values(basket)
  .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderNewProduct(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalElement.insertAdjacentHTML("beforebegin", productRow);
}

function renderProduct(productId) {
  const basketRowElement = basketElement
    .querySelector(`.basketRow[data-id="${productId}"]`);
  console.log(basketRowElement);

  if (!basketRowElement) {
    renderNewProduct(productId);
    return;
  }

  const product = basket[productId];
  basketRowElement.querySelector('.productCount').textContent = product.count;
  basketRowElement
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function addToCart(id, name, price) {
  if (!(id in basket)) {
      basket[id] = {id: id, name: name, price: price, count: 0};
  }

  basket[id].count++;
  itemsTotalCounter.textContent = getTotalItemsCount();
  itemsTotalPrice.textContent = getTotalItemsPrice();

  renderProduct(id);
}

document.querySelector(".cartIcon").addEventListener("click", () => {
  basketElement.classList.toggle("hidden");
});

const basket = new Object();

document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if(!event.target.closest(".addToCart")) {
      return;
  }

  const featuredItemEl = event.target.closest(".featuredItem");

  const id = Number(featuredItemEl.dataset.id);
  const name = featuredItemEl.dataset.name;
  const price = Number(featuredItemEl.dataset.price);

  console.log(`id: ${id}, name: ${name}, price: ${price}`);
  addToCart(id, name, price);
  
  console.log(basket);
});