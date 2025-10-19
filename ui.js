import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const UIModule = (() => {
    const showCurrentCategories = (booksArray) => {
        const newReleasesContainer = document.querySelector(SELECTORS.newReleases);
        const bestSellerBooksContainer = document.querySelector(SELECTORS.bestSellerBooks);

        if (!newReleasesContainer || !bestSellerBooksContainer) {
            return;
        }

        let renderNewReleases = '';
        let renderBestSellerBooks = '';

        for (let i = 0; i < booksArray.length; i++) {
            const currentBook = booksArray[i];
            const render = renderCategories(currentBook, CartModule.showStars);
            
            switch (booksArray[i].categories) {
                case 'New Releases':
                    renderNewReleases += render;
                    break;
                case 'Best Seller Books':
                    renderBestSellerBooks += render;
                    break;
            }
        }

        newReleasesContainer.innerHTML = renderNewReleases;
        bestSellerBooksContainer.innerHTML = renderBestSellerBooks;
    }

    const renderCategories = (currentBook, showStars) => {
        return `
            <li>
                <div class="card-container">
                    <img src="${currentBook.img}" alt="Picture of the card" class="picture-of-the-card">
                    <div class="card-text-container">
                        <span>${currentBook.title}</span>
                        <div>
                            <div class="render-author-and-score">
                                <span class="author">${currentBook.author} •</span>
                                <div class="star-container">
                                    ${showStars(currentBook.score)}
                                </div>
                            </div>
                            <span class="description-card">${currentBook.description}</span>
                            <button class="black-button" data-book-id="${currentBook.id}">
                                <img src="assets/card-basket.svg">
                                <span class="black-button-text">Add To Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    const renderSearchBooks = (booksArray, currentInput, fan, search, resultList, showStars) => {
        const resultSearch = CartModule.searchBooks(booksArray, currentInput);

        fan.style.display = 'none';
        search.style.display = 'block';
        let addBookContainer = '';

        if (resultSearch.length > 0) {
            resultSearch.forEach(book => {
                addBookContainer += `
                    <li class="list-search">
                        <div class="card-text-container">
                            <span>${book.title}</span>
                            <div class="render-search-container">
                                <div>
                                    <div class="render-author-and-score">
                                        <span class="author">${book.author} •</span>
                                        <div class="star-container">
                                            ${showStars(book.score)}
                                        </div>
                                    </div>
                                </div>
                                <button class="black-button-search" data-book-id="${book.id}">
                                    <img src="assets/card-basket.svg">
                                </button>
                            </div>
                        </div>
                    </li>
                `;
            });
        } else {
            addBookContainer = `
                <li class="list-search">
                    <div class="card-text-container" id="render-card-text-container">
                        <span>Nothing found matching your request.</span>
                    </div>
                </li>
            `;
        }

        resultList.innerHTML = addBookContainer;
    }

    const renderBasket = () => {
        const basket = CartModule.getLocalStorageBasket();
        const basketElement = document.querySelector(SELECTORS.basket);
        const basketCounter = document.querySelector(SELECTORS.basketText);
        
        if (!basketElement) {
            return;
        }

        basketElement.innerHTML = '';

        if (basketCounter) {
            basketCounter.textContent = `${basket.length} items`;
        }
    
        const subtotalCash = document.getElementById(SELECTORS.subtotal);
        const shippingCash = document.getElementById(SELECTORS.shipping);
        const textAboutShipping = document.querySelector(SELECTORS.basketOrderPromotion);
        const finalCost = document.getElementById(SELECTORS.total);

        if (!subtotalCash || !shippingCash || !textAboutShipping || !finalCost) {
            return;
        }

        let addBookContainer = '';
        for (let i = 0; i < basket.length; i++) {
            addBookContainer += `
                <li class="render-basket-cart-container">
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
        basketElement.innerHTML = addBookContainer;
        
        const subtotalCashNumber = CartModule.calculateSubtotal(basket);
        subtotalCash.textContent = `₹${subtotalCashNumber.toFixed(2)}`;

        const needForFreeShipping = 500;
        const shippingCost = 80;
        const freeShipping = 0;

        if (subtotalCashNumber < needForFreeShipping && basket.length !== 0) {
            shippingCash.textContent = `₹${shippingCost}`;

            textAboutShipping.innerHTML = `<div class="basket-order-promotion">Spend ₹${needForFreeShipping - subtotalCashNumber} 
            more to get <span class="basket-order-promotion-second-weight">FREE Shipping!</span></div>`;

            finalCost.textContent = `₹${Math.round((subtotalCashNumber + shippingCost) * 100) / 100}`;
        } else if (basket.length !== 0) {
            textAboutShipping.style.display = 'none';
            finalCost.textContent = `₹${subtotalCashNumber}`;
        } else {
            subtotalCash.textContent = `₹${freeShipping}`;
            shippingCash.textContent = `₹${freeShipping}`;
            finalCost.textContent = `₹${freeShipping}`;
            textAboutShipping.style.display = 'none';
        }
    }

    const showBlackStars = (score) => {
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

    return { showCurrentCategories, renderCategories, renderSearchBooks, renderBasket };
})();

