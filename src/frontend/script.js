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

async function searchByTitle() {
    const title = document.getElementById("searchTitle").value;
    if (!title) return alert("Enter a title!");

    const response = await fetch(`${API_BASE_URL}/searchByTitle/${title}`, {method: "GET"});
    const books = await response.json();
    console.log(books);
    displayBooks(books);


}

// 📌 Get all books and display them
    async function getAllBooks() {
        const response = await fetch(`${API_BASE_URL}/allBooks`, {method: "GET"});
        const books = await response.json();

        displayBooks(books);
    }

// 📌 Display books in the table
    function displayBooks(books) {

        const container = document.getElementById("results");
        container.classList.add("overflow-y-auto", "max-h-[500px]");
        container.scrollTo({top: 0, behavior: "smooth"});
        container.innerHTML = ""; // Clear previous results

        if (books) {
            for (let i = 0; i < books.length; i++) {
                const book = books[i];

                // Parent container for each book
                const bookCard = document.createElement("div");
                bookCard.classList.add("flex", "flex-row", "items-start", "border-t-[0.3px]", "border-b-[0.3px]", "border-gray-500", "justify-start", "p-6", "bg-[#222222]", "text-white", "shadow-lg", "my-4");

                // 📌 Left Section (Book Cover + Shelf)
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("flex", "flex-col", "items-center", "justify-start", "mr-6");

                // Book Cover Image
                const bookCover = document.createElement("img");
                bookCover.classList.add("w-full", "max-w-[200px]", "h-auto", "object-contain", "ml-6", "p-0", "mt-7", "mb-2", "shadow-md", "shadow-white");
                bookCover.setAttribute("src", book.imgUrl || "https://via.placeholder.com/150");
                bookCover.setAttribute("alt", `Cover of ${book.title}`);
                imageContainer.appendChild(bookCover);

                // Bookshelf Image
                const bookShelf = document.createElement("img");
                bookShelf.classList.add("max-w-[400px]", "ml-6", "mt-0");
                bookShelf.setAttribute("src", "images/black-shelf.png");
                bookShelf.setAttribute("alt", "Transparent image of a shelf");
                imageContainer.appendChild(bookShelf);

                // 📌 Right Section (Book Details)
                const bookInfoContainer = document.createElement("div");
                bookInfoContainer.classList.add("flex", "flex-col", "p-8", "w-3/5");

                // Book Title
                const bookTitle = document.createElement("h3");
                bookTitle.classList.add("text-4xl", "font-bold", "my-2");
                bookTitle.textContent = book.title;
                bookInfoContainer.appendChild(bookTitle);

                // Mini Description (Author + Links)
                const miniDesc = document.createElement("div");
                miniDesc.classList.add("flex", "flex-row", "items-center", "my-2");

                // Book Author
                const bookAuthor = document.createElement("p");
                bookAuthor.classList.add("text-sm", "italic");
                bookAuthor.textContent = `by ${book.author || "Unknown Author"}`;
                miniDesc.appendChild(bookAuthor);

                // Add to Reading Log Button
                const addToLogBtn = document.createElement("button");
                addToLogBtn.classList.add("bg-green-500", "text-white", "px-4", "py-2", "ml-4", "rounded-lg", "hover:bg-green-800", "text-xs");
                addToLogBtn.textContent = "Add to Reading Log";
                miniDesc.appendChild(addToLogBtn);

                // Google Books Link Button
                const googleLink = document.createElement("a");
                googleLink.setAttribute("href", book.googleBookUrl || "#");
                googleLink.setAttribute("target", "_blank");

                const googleBtn = document.createElement("button");
                googleBtn.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "ml-4", "rounded-lg", "hover:bg-blue-800", "text-xs");
                googleBtn.innerHTML = `Google Books - <span>${book.bookPrice || "N/A"}</span>`;
                googleLink.appendChild(googleBtn);

                miniDesc.appendChild(googleLink);
                bookInfoContainer.appendChild(miniDesc);

                // 📌 Metadata Section
                const metaDataContainer = document.createElement("div");
                metaDataContainer.classList.add("flex", "flex-row", "justify-between", "mt-4");

                // Summary Section
                const summaryContainer = document.createElement("div");
                summaryContainer.classList.add("w-3/4");

                const bookSummary = document.createElement("p");
                bookSummary.classList.add("border-[0.3px]", "border-gray-500", "text-sm", "bg-[#222222]", "text-white", "p-6", "rounded-lg", "m-2");
                bookSummary.textContent = book.summary || "No summary available.";
                summaryContainer.appendChild(bookSummary);

                metaDataContainer.appendChild(summaryContainer);

                // Detail Window (Book Metadata)
                const detailWindow = document.createElement("div");
                detailWindow.classList.add("flex", "flex-col", "items-start", "border-[0.3px]", "border-gray-500", "leading-relaxed", "text-sm", "whitespace-pre-wrap", "bg-[#222222]", "text-white", "p-4", "rounded-lg", "w-1/4", "max-h-fit", "m-2");

                const publishDate = document.createElement("p");
                publishDate.textContent = `Publish Date: ${book.publishDate || "Unknown"}`;
                detailWindow.appendChild(publishDate);

                const publisher = document.createElement("p");
                publisher.textContent = `Publisher: ${book.publisherName || "Unknown"}`;
                detailWindow.appendChild(publisher);

                const bookGenre = document.createElement("p");
                bookGenre.textContent = `Genre: ${book.genre || "Unknown"}`;
                detailWindow.appendChild(bookGenre);

                const pageCount = document.createElement("p");
                pageCount.textContent = `Page Count: ${book.pageCount || "N/A"}`;
                detailWindow.appendChild(pageCount);

                metaDataContainer.appendChild(detailWindow);
                bookInfoContainer.appendChild(metaDataContainer);

                // Append sections to bookCard
                bookCard.appendChild(imageContainer); // Left section
                bookCard.appendChild(bookInfoContainer); // Right section

                // Append the bookCard to the main container
                container.appendChild(bookCard);

                console.log("Book displayed:", book);
            }
        }
    }