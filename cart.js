import { SELECTORS } from "./constants.js";

export const CartModule = (() => {
    const getLocalStorageBasket = () => {
        const basketData = localStorage.getItem('basket');
        if(basketData) {
            return JSON.parse(basketData);
        }
        return [];
    }

    const setLocalStorageBasket = (basket) => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    const addToBasket = (book) => {
        const currentBasket = getLocalStorageBasket();
        const repeatedBook = currentBasket.find(basketBook => basketBook.id === book.id);

        if (!repeatedBook) {
            currentBasket.push({
                title: book.title,
                author: book.author,
                score: book.score,
                description: book.description,
                img: book.img,
                categories: book.categories,
                price: book.price,
                id: book.id,
                quantity: 1,
            });
            setLocalStorageBasket(currentBasket);
            updateBasketCounter();
        }
    }

    const updateBasketCounter = () => {
        const currentBasket = getLocalStorageBasket();
        const redCircle = document.querySelector(SELECTORS.basketRedCircle);

        if (currentBasket.length > 0) {
            redCircle.style.display = 'block';
            redCircle.textContent = currentBasket.length;
        } else {
            redCircle.style.display = 'none';
        }
    }

    const showStars = (score) => {
            const totalStars = 5;
            let result = '';
            for (let i = 0; i < totalStars; i++) {
                if (score > i) {
                    result += `<img src="assets/green-star.svg" class="star">`;
                } else {
                    result += `<img src="assets/gray-star.svg" class="star">`;
                }
            }
            return result;
        }

    return { getLocalStorageBasket, setLocalStorageBasket, addToBasket, updateBasketCounter, showStars };
})();