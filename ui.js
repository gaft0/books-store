import { SELECTORS } from './constants.js';

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
                    <div class="card-text-container" style="text-align: center; padding: 1.5rem;">
                        <span>Nothing found matching your request.</span>
                    </div>
                </li>
            `;
        }

        resultList.innerHTML = addBookContainer;
    }

    return { renderBestSellersBooks, renderNewReleases, renderSearchBooks};
})();

