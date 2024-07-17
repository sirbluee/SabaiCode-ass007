class Book {
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.available = true; // by default, a book is available
  }
}
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  searchBooks(input) {
    if (input) {
      return this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(input.toLowerCase()) ||
          book.author.toLowerCase().includes(input.toLowerCase()) ||
          book.genre.toLowerCase().includes(input.toLowerCase())
      );
    } else {
      return this.books;
    }
  }

  updateBookList(input) {
    const filteredBooks = this.searchBooks(input);
    this.setState({ filteredBooks });
  }

  listAvailableBooks() {
    return this.books.filter((book) => book.available);
  }
}
class User {
  constructor(name) {
    this.name = name;
    this.borrowedBooks = [];
  }

  borrowBook(library, title) {
    let book = library.books.find((b) => b.title === title && b.available);
    if (book) {
      this.borrowedBooks.push(book);
      book.available = false;
      return `${title} has been borrowed by ${this.name}`;
    } else {
      return `${title} is not available for borrowing`;
    }
  }

  returnBook(library, title) {
    let bookIndex = this.borrowedBooks.findIndex((b) => b.title === title);
    if (bookIndex !== -1) {
      let book = this.borrowedBooks[bookIndex];
      this.borrowedBooks.splice(bookIndex, 1);
      book.available = true;
      return `${title} has been returned to the library`;
    } else {
      return `${this.name} did not borrow ${title}`;
    }
  }

  viewBorrowedBooks() {
    return this.borrowedBooks;
  }
}

class Admin extends User {
  constructor(name) {
    super(name);
  }

  // Admins might have extra functionalities
}

class Student extends User {
  constructor(name) {
    super(name);
    this.borrowLimit = 5;
  }

  borrowBook(library, title) {
    if (this.borrowedBooks.length >= this.borrowLimit) {
      return `${this.name} has reached the borrowing limit`;
    }
    return super.borrowBook(library, title);
  }
}

let library = new Library("City Library");

let book1 = new Book("Harry Potter", "J.K. Rowling", "Fantasy");
let book2 = new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy");

library.addBook(book1);
library.addBook(book2);

let student = new Student("Alice");
let admin = new Admin("Bob");

console.log(student.borrowBook(library, "Harry Potter")); // Borrow success
console.log(student.borrowBook(library, "The Hobbit")); // Borrow success
console.log(student.borrowBook(library, "Harry Potter")); // Already borrowed

console.log(student.viewBorrowedBooks()); // View borrowed books

console.log(student.returnBook(library, "Harry Potter")); // Return success
console.log(student.viewBorrowedBooks()); // View borrowed books after returning


console.log(admin.borrowBook(library, "Alice")); // Borrow success