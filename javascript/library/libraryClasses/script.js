class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const book3 = new Book("1984", "George Orwell", 328, true);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 279, false);
const book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 214, true);

let library = [];
library.push(book1, book2, book3, book4, book5);

const table = document.querySelector("table");

function createTable(book) {
  const row = document.createElement("tr");

  const tdTitle = document.createElement("td");
  const tdAuthor = document.createElement("td");
  const tdPages = document.createElement("td");
  const tdRead = document.createElement("td");
  const tdDel = document.createElement("td");

  const del = document.createElement("button");
  del.id = "deleteBtn";
  const change = document.createElement("button");
  del.textContent = "remove";

  row.appendChild(tdTitle);
  row.appendChild(tdAuthor);
  row.appendChild(tdPages);
  row.appendChild(tdRead);
  row.appendChild(tdDel);

  row.appendChild(del);
  table.appendChild(row);

  tdTitle.textContent = book.title;
  tdAuthor.textContent = book.author;
  tdPages.textContent = book.pages;

  if (book.read == true) {
    tdRead.textContent = "readed";
  } else {
    tdRead.textContent = " not readed";
  }

  tdRead.appendChild(change);

  change.textContent = "change";

  change.addEventListener("click", () => {
    book.read = !book.read;
    if (book.read == true) {
      tdRead.textContent = "readed";
    } else {
      tdRead.textContent = " not readed";
    }
    tdRead.appendChild(change);
  });

  del.addEventListener("click", () => {
    let index = library.indexOf(book);
    library.splice(index, 1);
    table.removeChild(row);
  });

  tdDel.appendChild(del);
}
function addToLibrary(book) {
  library.push(book);
  createTable(book);
}
const dialog = document.querySelector("dialog");

const openbtn = document.getElementById("open");

const closeBtn = document.getElementById("close");

const form = document.querySelector("form");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");

openbtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  event.preventDefault();
  if (inputTitle.value && inputAuthor.value && inputPages.value) {
    let book = new Book(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      inputRead.checked
    );
    addToLibrary(book);
    console.log(book);
    form.reset();
    dialog.close();
  } else {
    alert("Please fill in all fields except 'Read'.");
  }
});

createTable(book1);
createTable(book2);
createTable(book3);
createTable(book4);
