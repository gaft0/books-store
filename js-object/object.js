const book = {
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    year: 2008,
}

console.log(`Name: ${book.title}. Author: ${book.author}.`);

book.year = 2000;
console.log(`Year: ${book.year}.`);

book.genre = 'Fairy tale';
console.log(`Genre: ${book.genre}.`);

class Book {
    constructor(title, author, year, genre) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

    showBook() {
        return `Name: ${this.title}. Author: ${this.author}. Year: ${this.year}. Genre: ${this.genre}`;
    }
}

const firstBook = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', 2008, 'Fairy tale');
const secondBook = new Book('1984', 'George Orwell', 1948, 'Dystopia');
const thirdBook = new Book('And Then There Were None', 'Agatha Christie', 1939, 'Detective');

const arrayBooks = [firstBook, secondBook, thirdBook];
const totalBooks = 3;

for (let i = 0; i < totalBooks; i++) {
    console.log(arrayBooks[i]);
}