function showBasketBooks() {
    const basket = getLocalStorageBasket();
    const basketElement = document.getElementById('basket');
    const basketCounter = document.querySelector('.basket-text');
    
    basketElement.innerHTML = '';
    
    if (basketCounter) {
        basketCounter.textContent = `${basket.length} items`;
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