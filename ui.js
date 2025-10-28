import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const UIModule = (() => {
    const showCurrentCategories = (booksArray) => {
        const newReleasesContainer = document.querySelector(SELECTORS.newReleases);
        const bestSellerBooksContainer = document.querySelector(SELECTORS.bestSellerBooks);
        const topRatedBooksContainer = document.querySelector(SELECTORS.topRatedBooks);
        const ourSuggestionContainer = document.querySelector(SELECTORS.ourSuggestion);
        const mostPopularBooksContainer = document.querySelector(SELECTORS.mostPopularBooks);

        if (newReleasesContainer && bestSellerBooksContainer && newReleasesContainer && topRatedBooksContainer && ourSuggestionContainer && mostPopularBooksContainer) {
            return;
        }

        const renderNewReleases = document.createDocumentFragment();
        const renderBestSellerBooks = document.createDocumentFragment();
        const renderTopRatedBooks = document.createDocumentFragment();
        const renderOurSuggestion = document.createDocumentFragment();
        const renderMostPopularBooks = document.createDocumentFragment();

        for (let i = 0; i < booksArray.length; i++) {
            const currentBook = booksArray[i];
            const li = document.createElement('li');
            li.innerHTML = renderCategories(currentBook, CartModule.showStars);
            
            switch (booksArray[i].categories) {
                case 'New Releases':
                    renderNewReleases.appendChild(li);
                    break;
                case 'Best Seller Books':
                    renderBestSellerBooks.appendChild(li);
                    break;
                case 'Top Rated Books':
                    renderTopRatedBooks.appendChild(li);
                    break;
                case 'Our Suggestion':
                    renderOurSuggestion.appendChild(li);
                    break;
                case 'Most Popular Books':
                    renderMostPopularBooks.appendChild(li);
                    break;
            }
        }

        if(newReleasesContainer) {
            newReleasesContainer.innerHTML = '';
            newReleasesContainer.appendChild(renderNewReleases);
        }
        if(bestSellerBooksContainer) {
            bestSellerBooksContainer.innerHTML = '';
            bestSellerBooksContainer.appendChild(renderBestSellerBooks);
        }
        if(topRatedBooksContainer) {
            topRatedBooksContainer.innerHTML = '';
            topRatedBooksContainer.appendChild(renderTopRatedBooks);
        }
        if(ourSuggestionContainer) {
            ourSuggestionContainer.innerHTML = '';
            ourSuggestionContainer.appendChild(renderOurSuggestion);
        }
        if(mostPopularBooksContainer) {
            mostPopularBooksContainer.innerHTML = '';
            mostPopularBooksContainer.appendChild(renderMostPopularBooks);
        }
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

    const renderSearchBooks = (booksArray, currentInput, fan, award, search, resultList, showStars) => {
        const resultSearch = CartModule.searchBooks(booksArray, currentInput);

        if (fan) {
            fan.style.display = 'none';
        }
        if (award) {
            award.style.display = 'none';
        }
        search.style.display = 'block';
        const addBookContainer = document.createDocumentFragment();

        if (resultSearch.length > 0) {
            resultSearch.forEach(book => {
                const li = document.createElement('li');
                li.className = 'list-search';
                li.innerHTML = `
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
                `;
                addBookContainer.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'list-search';
            li.innerHTML = `
                <div class="card-text-container" id="render-card-text-container">
                    <span>Nothing found matching your request.</span>
                </div>
            `;
            addBookContainer.appendChild(li);
        }

        resultList.innerHTML = '';
        resultList.appendChild(addBookContainer);
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
            const totalItems = basket.reduce((sum, book) => {
                return sum + book.quantity;
            }, 0);
            basketCounter.textContent = `${totalItems} items`;
        }
    
        const subtotalCash = document.getElementById(SELECTORS.subtotal);
        const shippingCash = document.getElementById(SELECTORS.shipping);
        const textAboutShipping = document.querySelector(SELECTORS.basketOrderPromotion);
        const finalCost = document.getElementById(SELECTORS.total);

        if (!subtotalCash || !shippingCash || !textAboutShipping || !finalCost) {
            return;
        }

        const addBookContainer = document.createDocumentFragment();
        for (let i = 0; i < basket.length; i++) {
            const li = document.createElement('li');
            li.className = 'render-basket-cart-container';
            li.innerHTML = `
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
                    <div class="change-quantity-container">
                        <button class="remove-book" data-book-id="${basket[i].id}">-</button>
                        <span class="current-number-books">${basket[i].quantity}</span>
                        <button class="add-book" data-book-id="${basket[i].id}">+</button>
                    </div>
                    <div class="cash-and-urn-container">
                        <div class="cash">₹${(basket[i].price * basket[i].quantity).toFixed(2)}</div>
                        <img src="assets/urn.svg" alt="Urn" class="urn" data-book-id="${basket[i].id}">
                    </div>
            `;
            addBookContainer.appendChild(li);
        }
        basketElement.appendChild(addBookContainer);

        changeNumberOfBooks();
        
        const subtotalCashNumber = CartModule.calculateSubtotal(basket);
        subtotalCash.textContent = `₹${subtotalCashNumber.toFixed(2)}`;

        const needForFreeShipping = 500;
        const shippingCost = 80;
        const freeShipping = 0;

        if (subtotalCashNumber > needForFreeShipping) {
            shippingCash.textContent = `₹${freeShipping}`;
        } else {
            textAboutShipping.style.display = 'block';
        }

        if (subtotalCashNumber < needForFreeShipping && basket.length !== 0) {
            shippingCash.textContent = `₹${shippingCost}`;

            textAboutShipping.innerHTML = `<div class="basket-order-promotion">Spend ₹${Math.round((needForFreeShipping - subtotalCashNumber) * 100) / 100}
            more to get <span class="basket-order-promotion-second-weight">FREE Shipping!</span></div>`;

            finalCost.textContent = `₹${Math.round((subtotalCashNumber + shippingCost) * 100) / 100}`;
        } else if (basket.length !== 0) {
            textAboutShipping.style.display = 'none';
            finalCost.textContent = `₹${subtotalCashNumber.toFixed(2)}`;
        } else {
            subtotalCash.textContent = `₹${freeShipping}`;
            shippingCash.textContent = `₹${freeShipping}`;
            finalCost.textContent = `₹${freeShipping}`;
            textAboutShipping.style.display = 'none';
        }

        CartModule.rerenderButton();
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

    const changeNumberOfBooks = () => {
        const removeBook = document.querySelectorAll(SELECTORS.removeBook);
        const addBook = document.querySelectorAll(SELECTORS.addBook);

        removeBook.forEach(removeBook => {
            removeBook.addEventListener('click', () => {
                const currentID = removeBook.getAttribute(SELECTORS.dataBookID);
                CartModule.basketDecreaseQuantity(currentID);
                CartModule.updateBasketCounter();
                renderBasket();
            });
        })

        addBook.forEach(addBook => {
            addBook.addEventListener('click', () => {
                const currentID = addBook.getAttribute(SELECTORS.dataBookID);
                CartModule.basketIncreaseQuantity(currentID);
                CartModule.updateBasketCounter();
                renderBasket();
            });
        })
    }

    return { showCurrentCategories, renderCategories, renderSearchBooks, renderBasket, changeNumberOfBooks };
})();

