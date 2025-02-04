package Eric.library.personal_library.controller;

import Eric.library.personal_library.model.Book;
import Eric.library.personal_library.repository.BookRepository;
import Eric.library.personal_library.services.GoogleBooksService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for handing book ops
 * Provides endpoints for adding, retrieving, searching, and deleting
 */
@RestController
@RequestMapping("/api/books")
public class BookController {

    //Instance of book repo
    private final BookRepository bookRepository;
    private final GoogleBooksService googleBooksService;


    public BookController(BookRepository bookRepository, GoogleBooksService googleBooksService) {
        this.bookRepository = bookRepository;
        this.googleBooksService = googleBooksService;
    }

    /**
     * Adds new book to database
     * @param isbn The book to be added (passed in request body)
     * @return The saved book object with generated ID
     */
    @PostMapping("/addByISBN/{isbn}")
    public ResponseEntity<?> fetchAndSaveBookByISBN(@PathVariable String isbn){
        Book book = googleBooksService.addBookByISBN(isbn);

        if (book !=null) {
            //Save the book to the database
            Book savedBook = bookRepository.save(book);
            return ResponseEntity.ok(savedBook);
        } else {
            return ResponseEntity.badRequest().body("Book not found.");
        }
    }

    @GetMapping("/searchByISBN/{isbn}")
    public ResponseEntity<?> searchBookByISBN(@PathVariable String isbn){
        Book book = googleBooksService.searchBookByISBN(isbn);

        if (book !=null) {
            //Return book metadata in response body
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.badRequest().body("Book not found.");
        }
    }

    @GetMapping("/searchByTitle/{name}")
    public ResponseEntity<?> searchBookByTitle(@PathVariable String name){
        List<Book> books = googleBooksService.searchBookByTitle(name);

        if (books !=null) {
            System.out.println(books);
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.badRequest().body("Book not found.");
        }
    }

    /**
     * Retrieves book by unique id
     * @param id Primary/unique id to retrieve book by
     * @return Retrieved book or a 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return (ResponseEntity<Book>) bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves the list of all books stored in the database.
     * @return A list of Book objects representing all books in the database.
     */
    @GetMapping("/allBooks")
    public List<Book> getAllBooks(){
        System.out.println(bookRepository.findAll());
        return bookRepository.findAll();
    }

    /**
     * Searches for books in the repository that contain the specified title.
     * This search is case-insensitive and matches partial titles.
     * @param title The title or partial title of the book to search for.
     * @return A list of books that have titles matching the search criteria.
     */
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    /**
     * Deletes a book from the repository based on the specified id.
     * If the book with the given id does not exist, no action is performed.
     *
     * @param id The unique identifier of the book to delete.
     * @return A ResponseEntity with an HTTP status of 204 (No Content) indicating the deletion was successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id){
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
