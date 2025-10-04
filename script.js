class Book {
    constructor(title, author, score, description, img, categories) {
        this.title = title;
        this.author = author;
        this.score = score;
        this.description = description;
        this.img = img;
        this.categories = categories;
    }

}

let booksArray = [];

booksArray[0] = new Book('Cooking Made Easy', 'Emily Clark', 4, 'Simple and delicious recipes for everyday cooking.', "assets/Cooking Made Easy.png", 'Best Seller Books');
booksArray[1] = new Book('Mystery of the Lost Island', 'Jane Smith', 3, 'A gripping mystery novel that keeps you guessing till the end.', "assets/Mystery of the Lost Island.png", 'Best Seller Books');
booksArray[2] = new Book('Shadows of Doubt', 'Emma Watson', 3, 'A detective novel filled with twists and unexpected turns.', "assets/Shadows of Doubt.png", 'Best Seller Books');
booksArray[3] = new Book('Taste of Italy', 'Gina Rossi', 4, 'Authentic Italian recipes to bring the flavors of Italy home.', "assets/Taste of Italy.png", 'Best Seller Books');
booksArray[4] = new Book('Echoes of the Past', 'Michael Brown', 5, 'A historical tale unraveling secrets buried in time.', "assets/Echoes of the Past.png", 'Best Seller Books');

booksArray[5] = new Book('The Lost Expedition', 'Tom Hardy', 4, 'An adventurer’s perilous quest in the Amazon jungle.', "assets/The Lost Expedition.png", 'New Releases');
booksArray[6] = new Book('Taste of Italy', 'Gina Rossi', 4, 'Authentic Italian recipes to bring the flavors of Italy home.', "assets/Taste of Italy.png", 'New Releases');
booksArray[7] = new Book('Learning React', 'Alex Johnson', 5, 'A comprehensive guide to mastering React.js and modern web development.', "assets/Learning React.png", 'New Releases');
booksArray[8] = new Book('The Silent Forest', 'David Kim', 3, 'A chilling suspense story set in a haunted woodland.', "assets/The Silent Forest.png", 'New Releases');
booksArray[9] = new Book('Mystery of the Lost Island', 'Jane Smith', 3, 'A gripping mystery novel that keeps you guessing till the end.', "assets/Mystery of the Lost Island.png", 'New Releases');

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
                            <button class="black-button">
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
                            <button class="black-button">
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


