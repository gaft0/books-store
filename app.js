"use strict"
import { UIModule } from './ui.js';
import { DataModule } from './data.js';
import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const AppModule = (() => {
    const init = async () => {    
        const booksArray = await DataModule.getBooks();
        if (document.querySelector(SELECTORS.tapeOfCardsContainer)) {
            UIModule.showCurrentCategories(booksArray);
            CartModule.rerenderButton();
        }
        if (document.querySelector(SELECTORS.basket)) {
            UIModule.renderBasket();
        }

        CartModule.updateBasketCounter();

        const input = document.querySelector(SELECTORS.searchContainerText); 
        const fan = document.querySelector(SELECTORS.fanOfPictureContainer);
        const award = document.querySelector(SELECTORS.award);
        const search = document.querySelector(SELECTORS.resultSearchContainer);
        const resultList = document.getElementById(SELECTORS.resultSearch);

        if ((award || fan) && input && search && resultList) {
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
                    UIModule.renderSearchBooks(booksArray, currentInput, fan, award, search, resultList, CartModule.showStars);
                } else {
                    if  (fan) {
                        fan.style.display = 'block';
                    }
                    if  (award) {
                        award.style.display = 'block';
                    }
                    search.style.display = 'none';
                }
            }, 300);

            input.addEventListener('input', debounceSearch);
        }

        document.addEventListener('click', (event) => {
            const button = event.target.closest(SELECTORS.blackButton) || event.target.closest(SELECTORS.blackButtonSearch);
            if (button) {
                const bookId = button.getAttribute(SELECTORS.dataBookID);
                const book = booksArray.find(book => book.id == bookId);
                
                if (book) {
                    CartModule.addToBasket(book);
                    CartModule.updateBasketCounter();
                    CartModule.rerenderButton();
                    if (document.querySelector(SELECTORS.basket)) {
                        UIModule.renderBasket();
                    }
                }
            }

            const urn = event.target.closest(SELECTORS.urn);
            if (urn) {
                const bookId = urn.getAttribute(SELECTORS.dataBookID);

                CartModule.removeFromBasket(bookId);
                CartModule.rerenderButton();
                CartModule.updateBasketCounter();

                if (document.querySelector(SELECTORS.basket)) {
                    UIModule.renderBasket();
                }
            }
        });

        const loader = document.querySelector(SELECTORS.loader);
        if (loader) {
            loader.style.display = 'none';
        }
    };

    return { init };
})();