import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const UIModule = (() => {
    const renderBestSellersBooks = (booksArray, showStars) => {
        const ul = document.querySelector(SELECTORS.bestSellerBooks);
        let addBookContainer = '';

        for (let i = 0; i < booksArray.length; i++) {
            if (booksArray[i].categories === 'Best Seller Books') {
                addBookContainer += `
                    <li>
                        <div class="card-container">
                            <img src="${booksArray[i].img}" alt="Picture of the card" class="picture-of-the-card">
                            <div class="card-text-container">
                                <span>${booksArray[i].title}</span>
                                <div>
                                    <div style="display: flex;">
                                        <span class="author">${booksArray[i].author} •</span>
                                        <div class="star-container">
                                            ${showStars(booksArray[i].score)}
                                        </div>
                                    </div>
                                    <span class="description-card">${booksArray[i].description}</span>
                                    <button class="black-button" data-book-id="${booksArray[i].id}">
                                        <img src="assets/card-basket.svg">
                                        <span class="black-button-text">Add To Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }
        }
        
        ul.innerHTML = addBookContainer;
    }

    const renderNewReleases = (booksArray, showStars) => {
        const ul = document.querySelector(SELECTORS.newReleases);
        let addBookContainer = '';

        for (let i = 0; i < booksArray.length; i++) {
            if (booksArray[i].categories === 'New Releases') {
                addBookContainer += `
                    <li>
                        <div class="card-container">
                            <img src="${booksArray[i].img}" alt="Picture of the card" class="picture-of-the-card">
                            <div class="card-text-container">
                                <span>${booksArray[i].title}</span>
                                <div>
                                    <div style="display: flex;">
                                        <span class="author">${booksArray[i].author} •</span>
                                        <div class="star-container">
                                            ${showStars(booksArray[i].score)}
                                        </div>
                                    </div>
                                    <span class="description-card">${booksArray[i].description}</span>
                                    <button class="black-button" data-book-id="${booksArray[i].id}">
                                        <img src="assets/card-basket.svg">
                                        <span class="black-button-text">Add To Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }
        }

        ul.innerHTML = addBookContainer;
    }

    const renderSearchBooks = (booksArray, currentInput, fan, search, resultList, showStars) => {
        let addBookContainer = '';
        fan.style.display = 'none';
        search.style.display = 'block';
        
        const matchTitle = booksArray.filter(book => book.title.toLowerCase().includes(currentInput));
        const matchAuthor = booksArray.filter(book => book.author.toLowerCase().includes(currentInput));
        const matchDescription = booksArray.filter(book => book.description.toLowerCase().includes(currentInput));
        
        const allMatches = [...matchTitle, ...matchAuthor, ...matchDescription];
        const uniqueMatches = [];
        const coincidenceMatches = {};
        
        allMatches.forEach(book => {
            if (!coincidenceMatches[book.id]) {
                coincidenceMatches[book.id] = true;
                uniqueMatches.push(book);
            }
        });

        if (uniqueMatches.length > 0) {
            uniqueMatches.forEach(book => {
                addBookContainer += `
                    <li class="list-search">
                        <div class="card-text-container">
                            <span>${book.title}</span>
                            <div style="display: flex; justify-content: space-between;">
                                <div>
                                    <div style="display: flex;">
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
                    <div class="card-text-container" style="text-align: center; margin: 6rem 1.5rem 1.5rem 1.5rem;">
                        <span>Nothing found matching your request.</span>
                    </div>
                </li>
            `;
        }

        resultList.innerHTML = addBookContainer;
    }

    const renderBasket = () => {
        const basket = CartModule.getLocalStorageBasket();
        const basketElement = document.getElementById('basket');
        const basketCounter = document.querySelector('.basket-text');
        
        basketElement.innerHTML = '';
        
        if (basketCounter) {
            basketCounter.textContent = `${basket.length} items`;
        }
    
        const subtotalCash = document.getElementById('subtotal');
        const subtotalCashNumber = CartModule.calculateSubtotal(basket);
        
        subtotalCash.textContent = `₹${subtotalCashNumber.toFixed(2)}`;

        const shippingCash = document.getElementById('shipping');
        const textAboutShipping = document.querySelector('.basket-order-promotion');
        const finalCost = document.getElementById('total');

        const needForFreeShipping = 500;
        const shippingCost = 80;
        const freeShipping = 0;

        let addBookContainer = '';
        for (let i = 0; i < basket.length; i++) {
            addBookContainer += `
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
        basketElement.innerHTML = addBookContainer;
        
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

    return { renderBestSellersBooks, renderNewReleases, renderSearchBooks, renderBasket };
})();

