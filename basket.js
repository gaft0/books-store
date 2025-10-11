function showBasketBooks() {
    const basket = getLocalStorageBasket();
    const basketElement = document.getElementById('basket');
    const basketCounter = document.querySelector('.basket-text');
    
    basketElement.innerHTML = '';
    
    if (basketCounter) {
        basketCounter.textContent = `${basket.length} items`;
    }

    const subtotalCash = document.getElementById('subtotal');

    let subtotalCashNumber = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotalCashNumber += basket[i].price;
    }
    subtotalCash.textContent = `₹${Math.round((subtotalCashNumber) * 100) / 100}`;
    
    const shippingCash = document.getElementById('shipping');
    const textAboutShipping = document.querySelector('.basket-order-promotion');
    const finalCost = document.getElementById('total');

    const needForFreeShipping = 500;
    const shippingCost = 80;
    const freeShipping = 0;

    if (subtotalCashNumber < needForFreeShipping && basket.length !== 0) {
        shippingCash.textContent = `₹${shippingCost}`;
        textAboutShipping.innerHTML = `<div class="basket-order-promotion">Spend ₹${needForFreeShipping - subtotalCashNumber} more to get <span style="font-weight: 700;">FREE Shipping!</span></div>`;
        finalCost.textContent = `₹${Math.round((subtotalCashNumber + shippingCost) * 100) / 100}`;
    } else if (basket.length !== 0) {
        textAboutShipping.style.display = 'none';
        finalCost.textContent = `₹${subtotalCashNumber}`;
    } else {
        shippingCash.textContent = `₹${freeShipping}`;
        finalCost.textContent = `₹${freeShipping}`;
        textAboutShipping.style.display = 'none';
    }

    for (let i = 0; i < basket.length; i++) {
        basketElement.innerHTML += `
            <li style="display: flex;">
                <div class="basket-cart-container">
                    <img src="${basket[i].img}" alt="Picture of the card" class="picture-of-the-card" id="basket-picture-of-the-card">
                    <div class="card-text-container" id="basket-card-name">
                        <span>${basket[i].title}</span>
                        <div>
                            <span class="author" id="basket-author">${basket[i].author}</span>
                            <div class="star-container">
                                ${showBlackStars(basket[i].score)}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cash-and-urn-container">
                    <div class="cash">₹${basket[i].price.toFixed(2)}</div>
                    <img src="assets/urn.svg" alt="Urn" class="urn" data-book-id="${basket[i].id}">
                </div>
            </li>
        `;
    }
}

document.addEventListener('click', (event) => {
    if (event.target.closest('.urn')) {
        const button = event.target.closest('.urn');
        const bookId = button.getAttribute('data-book-id');
        removeFromBasket(Number(bookId));
    }
});

function showBlackStars(score) {
    const totalStars = 5;
    let result = '';

    for (let i = 0; i < totalStars; i++) {
        if (score > i) {
            result += '<img src="assets/black-star.svg" class="star">';
        } else {
            result += '<img src="assets/white-star.svg" class="star">';
        }
    }

    return result;
}


function removeFromBasket(bookId) {
    const basket = getLocalStorageBasket();
    const updatedBasket = basket.filter(book => book.id !== bookId);

    setLocalStorageBasket(updatedBasket);
    showBasketBooks();
    updateBasketCounter();
}

showBasketBooks();