const API_BASE_URL = "http://localhost:8080/api/books";  // Change this if needed

// 🚀 Fetch all books on page load
document.addEventListener("DOMContentLoaded", () => {
    getAllBooks().then(r => {
        console.log(r);
    });
});

// 📌 Add book by ISBN
async function fetchBookByISBN() {
    const isbn = document.getElementById("fetchIsbn").value;
    if (!isbn) return alert("Enter an ISBN!");

    const response = await fetch(`${API_BASE_URL}/addByISBN/${isbn}`, {method: "POST"});
    if (response.ok) {
        alert("Book fetched and saved!");
        await getAllBooks();
    } else {
        alert("No book found for this ISBN.");
    }
}

async function searchByISBN() {
    const isbn = document.getElementById("searchIsbn").value;
    if (!isbn) return alert("Enter an ISBN!");

    const response = await fetch(`${API_BASE_URL}/searchByISBN/${isbn}`, {method: "GET"});
    const book = await response.json();

    if (book) {
        console.log(book);
        const googleLink = document.getElementById("googleLink");
        const bookDisplay = document.getElementById("results");
        const bookCover = document.getElementById("bookCover");
        const bookTitle = document.getElementById("bookTitle");
        const bookAuthor = document.getElementById("bookAuthor");
        const bookSummary = document.getElementById("bookSummary");
        const bookGenre = document.getElementById("bookGenre");
        const pageCount = document.getElementById("pageCount");
        const publishDate = document.getElementById("publishDate");
        const publisher = document.getElementById("publisherName");
        const bookPrice = document.getElementById("bookPrice");
        bookDisplay.style.visibility = "visible";
        googleLink.setAttribute("href", book.googleBookUrl);
        bookCover.setAttribute("src", book.imgUrl);
        bookTitle.textContent = book.title;
        bookAuthor.textContent = "by " + book.author;
        bookGenre.textContent = "Categories: " + book.genre;
        pageCount.textContent = "Page Count: " + book.pageCount;
        publisher.textContent = "Publisher(s): " + book.publisherName;
        publishDate.textContent = "Publish Date: " + book.publishDate;
        bookSummary.innerHTML = book.summary;
        bookPrice.textContent = book.bookPrice;

    }
}

// 📌 Get all books and display them
    async function getAllBooks() {
        const response = await fetch(`${API_BASE_URL}/allBooks`, {method: "GET"});
        const books = await response.json();

        displayBooks(books);
    }

// 📌 Display books in the table
    function displayBooks(books) {
        const booksList = document.getElementById("booksList");
        booksList.innerHTML = "";

        books.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="p-3 border border-gray-300">
                ${book.imgUrl ? `<img src="${book.imgUrl}" alt="Book Cover" style="width: 200px;">` : "No Image"}
                <h4>${book.title}</h4>
            </td>
            <td class="p-3 border border-gray-300">${book.author}</td>
            <td class="p-3 border border-gray-300">${book.genre || "N/A"}</td>
           <!-- <td>${book.summary || "No summary available."}</td> -->
            <td class="p-3 border border-gray-300">${book.isbn || "N/A"}</td>
        `;
            booksList.appendChild(row);
        });
    }