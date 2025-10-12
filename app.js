"use strict"
import { UIModule } from './ui.js';
import { DataModule } from './data.js';
import { SELECTORS } from './constants.js';
import { CartModule } from './cart.js';

export const AppModule = (() => {
    const booksArray = DataModule.getBooks();

    const init = () => {
        UIModule.renderBestSellersBooks(booksArray, CartModule.showStars);
        UIModule.renderNewReleases(booksArray, CartModule.showStars);
        CartModule.updateBasketCounter();

        const input = document.querySelector(SELECTORS.searchContainerText); 
        const fan = document.querySelector(SELECTORS.fanOfPictureContainer);
        const search = document.querySelector(SELECTORS.resultSearchContainer);
        const resultList = document.getElementById(SELECTORS.resultSearch);

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

        document.addEventListener('click', (event) => {
            const button = event.target.closest(SELECTORS.blackButton) || event.target.closest(SELECTORS.blackButtonSearch);
            if (!button) {
                return;
            }

            const bookId = button.getAttribute('data-book-id');
            const book = booksArray.find(book => book.id === bookId);

            if (book) {
                CartModule.addToBasket(book);
            }
        });
    };

    return { init };
})();