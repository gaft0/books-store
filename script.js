class Book {
    constructor(title, author, score, description, img, categories, price) {
        this.title = title;
        this.author = author;
        this.score = score;
        this.description = description;
        this.img = img;
        this.categories = categories;
        this.price = price;
        this.id = generateId();
    }

}

let countID = 1;
function generateId() {
    return countID++;
}

let booksArray = [];

// У первой книги цена специально изменена, чтобы ты мог проверить работу подсчета итоговой цены с учетом возможной скидки
booksArray[0] = new Book('Cooking Made Easy', 'Emily Clark', 4, 'Simple and delicious recipes for everyday cooking.', "assets/Cooking Made Easy.png", 'Best Seller Books', 500.99);
booksArray[1] = new Book('Mystery of the Lost Island', 'Jane Smith', 3, 'A gripping mystery novel that keeps you guessing till the end.', "assets/Mystery of the Lost Island.png", 'Best Seller Books', 14.99);
booksArray[2] = new Book('Shadows of Doubt', 'Emma Watson', 3, 'A detective novel filled with twists and unexpected turns.', "assets/Shadows of Doubt.png", 'Best Seller Books', 13.99);
booksArray[3] = new Book('Taste of Italy', 'Gina Rossi', 4, 'Authentic Italian recipes to bring the flavors of Italy home.', "assets/Taste of Italy.png", 'Best Seller Books', 15.75);
booksArray[4] = new Book('Echoes of the Past', 'Michael Brown', 5, 'A historical tale unraveling secrets buried in time.', "assets/Echoes of the Past.png", 'Best Seller Books', 17.50);

booksArray[5] = new Book('The Lost Expedition', 'Tom Hardy', 4, 'An adventurer’s perilous quest in the Amazon jungle.', "assets/The Lost Expedition.png", 'New Releases', 18.25);
booksArray[6] = new Book('Taste of Italy', 'Gina Rossi', 4, 'Authentic Italian recipes to bring the flavors of Italy home.', "assets/Taste of Italy.png", 'New Releases', 15.75);
booksArray[7] = new Book('Learning React', 'Alex Johnson', 5, 'A comprehensive guide to mastering React.js and modern web development.', "assets/Learning React.png", 'New Releases', 29.99);
booksArray[8] = new Book('The Silent Forest', 'David Kim', 3, 'A chilling suspense story set in a haunted woodland.', "assets/The Silent Forest.png", 'New Releases', 12.99);
booksArray[9] = new Book('Mystery of the Lost Island', 'Jane Smith', 3, 'A gripping mystery novel that keeps you guessing till the end.', "assets/Mystery of the Lost Island.png", 'New Releases', 14.99);

function getLocalStorageBasket() {
    const basketData = localStorage.getItem('basket');
    if(basketData) {
        return JSON.parse(basketData);
    }
    return [];
}

function setLocalStorageBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

function addToBasket(book) {
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

function updateBasketCounter() {
    const currentBasket = getLocalStorageBasket();
    const redCircle = document.querySelector('.basket-red-circle');

    if (currentBasket.length > 0) {
        redCircle.style.display = 'block';
        redCircle.textContent = currentBasket.length;
    } else {
        redCircle.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBasketCounter();
});

let ul = document.getElementById('best-seller-books');
for (let i = 0; i < booksArray.length; i++) {
    if (booksArray[i].categories === 'Best Seller Books') {
        ul.innerHTML += `
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

ul = document.getElementById('new-releases');
for (let i = 0; i < booksArray.length; i++) {
    if (booksArray[i].categories === 'New Releases') {
        ul.innerHTML += `
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

function showStars(score) {
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

const input = document.querySelector('.search-container-text');
const fan = document.querySelector('.fan-of-picture-container');
const search = document.querySelector('.result-search-container');
const resultList = document.getElementById('result-search');

input.addEventListener('input', function () {
    const currentInput = this.value.toLowerCase();
    resultList.innerHTML = '';
    
    if (currentInput !== '') {
        fan.style.display = 'none';
        search.style.display = 'block';
        
        const matchTitle = booksArray.filter(book => book.title.toLowerCase().includes(currentInput));
        const matchAuthor = booksArray.filter(book => book.author.toLowerCase().includes(currentInput));
        const matchDescription = booksArray.filter(book => book.description.toLowerCase().includes(currentInput));
        
        const allMatches = [...matchTitle, ...matchAuthor, ...matchDescription];
        const uniqueMatches = [];
        const coincidenceMatches = {};
        
        allMatches.forEach(book => {
            const bookId = booksArray.indexOf(book);
            
            if (!coincidenceMatches[book.id]) {
                coincidenceMatches[book.id] = true;
                uniqueMatches.push(book);
            }
        });
        
        if (uniqueMatches.length > 0) {
            uniqueMatches.forEach(book => {
                resultList.innerHTML += `
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
            resultList.innerHTML = `
                <li class="list-search">
                    <div class="card-text-container" style="text-align: center; padding: 1.5rem;">
                        <span>Nothing found matching your request.</span>
                    </div>
                </li>
            `;
        }
    } else {
        fan.style.display = 'block';
        search.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (event.target.closest('.black-button')) {
        const button = event.target.closest('.black-button');
        const bookId = button.getAttribute('data-book-id');
        const book = booksArray.find(b => b.id == bookId);
        addToBasket(book);
    }
    
    if (event.target.closest('.black-button-search')) {
        const button = event.target.closest('.black-button-search');
        const bookId = button.getAttribute('data-book-id');
        const book = booksArray.find(book => book.id == bookId);
        addToBasket(book);
    }
});