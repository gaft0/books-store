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

        if (!redCircle) {
            return;
        }

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

    const removeFromBasket = (bookId) => {
        const basket = getLocalStorageBasket();
        const updatedBasket = basket.filter(book => book.id !== bookId);

        setLocalStorageBasket(updatedBasket);
    }

    const calculateSubtotal = (basket) => {
        return basket.reduce((sum, book) => sum + book.price, 0);
    };

    const searchBooks = (booksArray, currentInput) => {
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

        return uniqueMatches;
    }

    return { getLocalStorageBasket, addToBasket, updateBasketCounter, showStars, removeFromBasket, calculateSubtotal, searchBooks };
})();