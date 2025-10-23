"use strict"
import { UIModule } from './ui.js';
import { DataModule } from './data.js';
import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const AppModule = (() => {
    const booksArray = DataModule.getBooks();

    const init = () => {
        if (document.querySelector(SELECTORS.bestSellerBooks) && document.querySelector(SELECTORS.newReleases)) {
            UIModule.showCurrentCategories(booksArray);
        }
        if (document.querySelector(SELECTORS.basket)) {
            UIModule.renderBasket();
        }

        CartModule.updateBasketCounter();

        const input = document.querySelector(SELECTORS.searchContainerText); 
        const fan = document.querySelector(SELECTORS.fanOfPictureContainer);
        const search = document.querySelector(SELECTORS.resultSearchContainer);
        const resultList = document.getElementById(SELECTORS.resultSearch);

        if (input && fan && search && resultList) {
            const debounce = (func, ms) => {
                let timeout;
                return function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(this, arguments), ms);
                };
            };

            const debounceSearch = debounce(function() {
                const currentInput = this.value.toLowerCase();
                
                if (currentInput !== '') {
                    UIModule.renderSearchBooks(booksArray, currentInput, fan, search, resultList, CartModule.showStars);
                } else {
                    fan.style.display = 'block';
                    search.style.display = 'none';
                }
            }, 300);

            input.addEventListener('input', debounceSearch);
        }

        document.addEventListener('click', (event) => {
            const button = event.target.closest(SELECTORS.blackButton) || event.target.closest(SELECTORS.blackButtonSearch);
            if (button) {
                const bookId = button.getAttribute('data-book-id');
                const book = booksArray.find(book => book.id == bookId);
                
                if (book) {
                    CartModule.addToBasket(book);
                    CartModule.updateBasketCounter();
                    if (document.querySelector(SELECTORS.basket)) {
                        UIModule.renderBasket();
                    }
                }
            }

            const urn = event.target.closest(SELECTORS.urn);
            if (urn) {
                const bookId = Number(urn.getAttribute('data-book-id'));

                CartModule.removeFromBasket(bookId);
                CartModule.updateBasketCounter();

                if (document.querySelector(SELECTORS.basket)) {
                    UIModule.renderBasket();
                }
            }
        });

        UIModule.changeNumberOfBooks();
    };

    return { init };
})();