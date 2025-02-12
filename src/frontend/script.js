const API_BASE_URL = "http://localhost:8080/api/books";  // Change this if needed

// 🚀 Fetch all books on page load
document.addEventListener("DOMContentLoaded", async function () {
    await displayBestsellers("fictionBestsellers", "Fiction Bestsellers");
    await displayBestsellers("nonfictionBestsellers", "Non-fiction Bestsellers");
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

async function searchByTitle(event) {
    if (event.key === "Enter") {
        const title = document.getElementById("searchInput").value;
        if (!title) return alert("Enter a title!");

        try {
            const response = await fetch(`${API_BASE_URL}/searchByTitle/${title}`, {
                method: "GET",
                headers: {
                    "Accept-Encoding": "gzip, deflate, br"
                }
            });

            const books = await response.json();
            displaySearchResults(books);
            console.log(books);

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }
}

// 📌 Get all books and display them
async function getAllBooks() {
    const response = await fetch(`${API_BASE_URL}/allBooks`, {method: "GET"});
    const books = await response.json();

    displayBooks(books);
}

function displaySearchResults (books) {

    const leftPanel = document.getElementById("left-panel");

    leftPanel.innerHTML = "";
    if (books) {
        for (let i = 0; i < books.length; i++) {
            const book = books[i];

            //Book Pill as a Button
            const bookButton = document.createElement("button");
            bookButton.classList.add("bg-white", "w-auto", "h-full", "text-black", "p-4", "text-sm", "rounded-lg", "shadow-lg", "m-4");
            bookButton.setAttribute("id", "bookButton");
            bookButton.setAttribute("onclick", `displaySearchFocus(${JSON.stringify(book)})`);
            const bookPill = document.createElement("span");
            bookPill.classList.add("flex", "flex-row", "items-center", "justify-between", "text-black", "rounded-lg", "m-4");
            bookPill.setAttribute("id", "bookPill");

            //Left side of each book result pill
            const pillLeft = document.createElement("span");
            const bookTitle = document.createElement("h3");
            const bookAuthor = document.createElement("p");
            bookAuthor.textContent = "by " + book.author;
            bookAuthor.classList.add("text-xs", "italic");
            pillLeft.classList.add("flex", "flex-col");
            bookTitle.textContent = book.title;
            bookTitle.classList.add("text-lg", "font-bold");
            pillLeft.appendChild(bookTitle);
            pillLeft.appendChild(bookAuthor);
            bookPill.appendChild(pillLeft);

            //Right side of each book result pill
            const pillRight = document.createElement("span");
            const bookCover = document.createElement("img");
            pillRight.classList.add("flex", "flex-col");
            bookCover.setAttribute("src", book.imgUrl || "https://via.placeholder.com/150");
            bookCover.setAttribute("alt", `Cover of ${book.title}`);
            bookCover.classList.add("w-24", "h-24", "object-contain", "shadow-md");
            pillRight.appendChild(bookCover);
            bookPill.appendChild(pillRight);

            //Appending inner pill to the button
            bookButton.appendChild(bookPill);
            //Appending button to the left side of the panel
            leftPanel.appendChild(bookButton);

        }
    }
}

function displaySearchFocus(book){
    const rightPanel = document.getElementById("right-panel");
    const bookCover = document.createElement("img");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const imgSpace = document.createElement("div");
    const metadata = document.createElement("div");
    const bookSummary = document.createElement("p");
    const buttonDiv = document.createElement("div");
    const addToLogBtn = document.createElement("button");
    const googleButton = document.createElement("button");
    const googleLink = document.createElement("a");
    const publishDate = document.createElement("p");
    const publisher = document.createElement("p");
    const isbn = document.createElement("p");



    rightPanel.classList.add("flex", "flex-col", "m-2", "p-2", "text-center");
    rightPanel.innerHTML = "";


    imgSpace.classList.add("flex", "flex-row", "m-2");
    metadata.classList.add("flex", "flex-col", "m-2");


    //Adding metadata to right panel
    bookTitle.textContent = book.title;
    bookTitle.classList.add("text-4xl", "font-bold", "my-2");
    rightPanel.appendChild(bookTitle);

    //Author
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add("text-sm", "italic");
    rightPanel.appendChild(bookAuthor);


    rightPanel.appendChild(imgSpace);

    buttonDiv.appendChild(googleLink);
    buttonDiv.appendChild(addToLogBtn);
    rightPanel.appendChild(buttonDiv);

    //Buttons
    buttonDiv.classList.add("flex", "flex-row", "justify-between", "my-4", "p-2");
    rightPanel.appendChild(buttonDiv);

    googleButton.classList.add("bg-blue-500", "shadow-xl", "text-white", "px-4", "py-2", "ml-4", "rounded-lg", "hover:bg-blue-800", "text-xs");
    googleButton.textContent = "Google Books " + book.bookPrice;
    googleLink.classList.add("w-1/2");
    googleLink.setAttribute("href", book.googleBookUrl || "#");
    googleLink.setAttribute("target", "_blank");
    googleLink.appendChild(googleButton);

    //Image Url
    bookCover.classList.add("w-72", "h-72", "object-contain", "shadow-2xl", "mx-auto","my-4");
    bookCover.setAttribute("src", book.imgUrl);
    imgSpace.appendChild(bookCover);

    //Book Summary
    bookSummary.textContent = book.summary;
    bookSummary.classList.add("text-sm", "text-start", "m-4", "bg-white", "p-4", "rounded-lg", "shadow-lg");
    rightPanel.appendChild(bookSummary);

    //Publisher
    publisher.classList.add("text-xs", "text-start", "italic", "mt-4", "ml-2");
    publisher.textContent = "Publisher: " + book.publisherName;
    metadata.appendChild(publisher);

    //Date
    publishDate.classList.add("text-xs","text-start" ,"italic", "ml-2");
    publishDate.textContent = "Publish Date: " + book.publishDate;
    metadata.appendChild(publishDate);

    //ISBN
    isbn.classList.add("text-xs", "text-start", "italic", "ml-2");
    isbn.textContent = "ISBN: " + book.isbn;
    metadata.appendChild(isbn);



    imgSpace.appendChild(metadata);


    addToLogBtn.classList.add("bg-green-500", "shadow-xl", "w-1/2", "text-white", "px-4", "py-2", "ml-4", "rounded-lg", "hover:bg-green-800", "text-xs");
    addToLogBtn.textContent = "Add to Reading Log";


    // // Google Books Link Button
    // const googleLink = document.createElement("a");
    // googleLink.setAttribute("href", book.googleBookUrl || "#");
    // googleLink.setAttribute("target", "_blank");
    //
    // const googleBtn = document.createElement("button");
    // googleBtn.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "ml-4", "rounded-lg", "hover:bg-blue-800", "text-xs");
    // googleBtn.innerHTML = `Google Books - <span>${book.bookPrice || "N/A"}</span>`;
    // googleLink.appendChild(googleBtn);








}

// 📌 Display books in the table
function displayBooks(books) {

    const container = document.getElementById("results");
    container.classList.add("overflow-y-auto", "max-h-[75dvh]");
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

async function displayBestsellers(genre, title) {
    const container = document.getElementById(genre);
    container.classList.add("relative");

    const containerTitle = document.createElement("h1");
    containerTitle.textContent = title;
    containerTitle.classList.add("sticky", "translate-x-[-50%]", "top-0", "left-[50%]", "text-center", "w-[60vh]", "p-6", "text-xl", "font-bold", "overflow-x-auto", "whitespace-nowrap");
    container.appendChild(containerTitle);

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("flex", "flex-row", "w-max", "bg-brown-100", "shadow-lg", "m-4", "rounded-lg", "p-8");
    container.appendChild(innerContainer);


    try {
        const response = await fetch(`${API_BASE_URL}/${genre}`, {method: "GET"});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const books = await response.json();
        console.log(books);

        if (books && books.length) {
            books.forEach((book, index) => {
                const bookCard = document.createElement("div");
                bookCard.classList.add("flex", "w-[350px]", "h-auto", "flex-col", "m-8", "p-8", "rounded-lg", "shadow-xl", "bg-white");


                const bookCover = document.createElement("img");
                bookCover.classList.add("max-w-[150px]", "min-w-[150px]", "h-auto", "object-contain", "m-3", "mb-8");
                bookCover.setAttribute("src", book.imgUrl || "https://via.placeholder.com/150");
                bookCover.setAttribute("alt", `Cover of ${book.title}`);
                bookCard.appendChild(bookCover)

                const bookTitle = document.createElement("h3");
                bookTitle.classList.add("text-lg", "font-bold", "text-black", "text-start");
                bookTitle.textContent = book.title;
                bookCard.appendChild(bookTitle);

                const bookAuthor = document.createElement("p");
                bookAuthor.classList.add("text-base", "italic", "bold", "mb-4");
                bookAuthor.textContent = `by ${book.author || "Unknown Author"}`;
                bookCard.appendChild(bookAuthor);

                const bookDesc = document.createElement("p");
                bookDesc.classList.add("text-sm");
                bookDesc.textContent = book.description;
                bookCard.appendChild(bookDesc);


                innerContainer.appendChild(bookCard);
            });
            autoScroll(container);

        } else {
            container.innerHTML = "<p>No bestsellers available.</p>";
        }
    } catch (error) {
        console.error("Error fetching bestsellers:", error);
        container.innerHTML = "<p>Failed to load bestsellers.</p>";
    }


}

function autoScroll(container) {
    let scrollSpeed = 1; // Adjust speed (higher = faster)
    let scrollInterval = 40; // Adjust interval for smoothness

    function scrollStep() {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0; // ✅ Loop back to the start smoothly
        } else {
            container.scrollLeft += scrollSpeed;
        }
    }

    console.log("Starting autoScroll for", container.id);
    console.log("Container scrollWidth:", container.scrollWidth, "Container clientWidth:", container.clientWidth);

    return setInterval(scrollStep, scrollInterval);

}

// Search Bar Logic

const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("searchMenu");

function showDropdown(){
        dropdown.classList.remove("hidden");
}
function hideDropdown() {
    setTimeout(() => {
        dropdown.classList.add("hidden");
    }, 200); // Delay so clicks can register
}

