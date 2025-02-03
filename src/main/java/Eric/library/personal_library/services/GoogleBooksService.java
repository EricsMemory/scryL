package Eric.library.personal_library.services;

import Eric.library.personal_library.model.Book;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Integrates with Google Books API to find
 * books by ISBN
 */
@Service
public class GoogleBooksService {

    /**
     * The base URL used for interacting with the Google Books API.
     * This URL is injected from the application.properties file.
     */
    @Value("${google.books.api.url}")
    private String googleBooksApiUrl;

    /**
     * The API key used for authenticating requests to the Google Books API.
     * This value is injected at runtime from the application.properties file.
     */
    @Value("${google.books.api.key}")
    private String googleBooksApiKey;

    /**
     * Provides an instance of RestTemplate used for making HTTP requests
     */
    private final RestTemplate restTemplate = new RestTemplate();

    public Book addBookByISBN(String isbn) {
        String url = googleBooksApiUrl + isbn + "&projection=full" + "&key" + googleBooksApiKey;

        try {
            //Call Google API
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonResponse = new JSONObject(response);

            //Extract book details from response
            JSONArray items = jsonResponse.optJSONArray("items");
            if (items != null && items.length() > 0) {
                JSONObject volumeInfo = items.getJSONObject(0).getJSONObject("volumeInfo");

                //Create a new book with extracted metadata
                Book book = new Book();
                book.setTitle(volumeInfo.optString("title", "Unknown Title"));
                book.setAuthor(volumeInfo.optJSONArray("authors") != null ?
                        volumeInfo.getJSONArray("authors").join(", ").replace("\"", "") : "Unknown Author");
                book.setGenre(volumeInfo.optJSONArray("categories") != null ?
                        volumeInfo.getJSONArray("categories").join(", ").replace("\"", "") : "Unknown Genre");
                book.setSummary(volumeInfo.optString("description", "No description available."));
                book.setIsbn(isbn);
                book.setImgUrl(volumeInfo.optString("imageLinks", "No image available."));

                // Extract image links
                JSONObject imageLinks = volumeInfo.optJSONObject("imageLinks");
                if (imageLinks != null) {
                    book.setImgUrl(imageLinks.optString("thumbnail", ""));
                } else {
                    book.setImgUrl("");  // No image available
                }
                return book;
            }
        } catch (RestClientException e) {
            System.err.println("Error fetching book data: " + e.getMessage());
        }

        return null;
    }

    public Book searchBookByISBN(String isbn) {

        String url = googleBooksApiUrl + isbn + "&projection=full" + "&key=" + googleBooksApiKey; //May want to extra this into a method since it's repeated

        try {
            //Call Google API
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonResponse = new JSONObject(response);

            //Extract book details from response
            JSONArray items = jsonResponse.optJSONArray("items");
            if (items != null && items.length() > 0) {
                JSONObject volumeInfo = items.getJSONObject(0).getJSONObject("volumeInfo");

                //Create a new book with extracted metadata
                Book book = new Book();
                book.setGoogleBookUrl(volumeInfo.optString("infoLink", "No Google Book URL available."));
                book.setTitle(volumeInfo.optString("title", "Unknown Title"));
                book.setPublishDate(volumeInfo.optString("publishedDate", "Unknown Publish Date"));
                book.setPublisherName(volumeInfo.optString("publisher", "Unknown Publisher"));
                book.setAuthor(volumeInfo.optJSONArray("authors") != null ?
                        volumeInfo.getJSONArray("authors").join(", ").replace("\"", "") : "Unknown Author");
                book.setGenre(volumeInfo.optJSONArray("categories") != null ?
                        volumeInfo.getJSONArray("categories").join(", ").replace("\"", "") : "Unknown Genre");
                book.setSummary(volumeInfo.optString("description", "No description available."));
                book.setIsbn(isbn);
                book.setPageCount(volumeInfo.optInt("pageCount", 0));
                book.setImgUrl(volumeInfo.optString("imageLinks", "No image available."));
                book.setGoogleBookId(items.getJSONObject(0).optString("id", "No Id available"));

                // Extract price
                JSONObject saleInfo = items.getJSONObject(0).getJSONObject("saleInfo");
                if (saleInfo != null) {
                    JSONObject retailPrice = saleInfo.optJSONObject("retailPrice"); // Check for discounted price
                    JSONObject listPrice = saleInfo.optJSONObject("listPrice");
                    if (retailPrice != null) {
                        double price = retailPrice.optDouble("amount", 0.0);
                        book.setBookPrice(String.format("$%.2f", price)); // Format price
                    } else if (listPrice != null) {
                        double price = listPrice.optDouble("amount", 0.0);
                        book.setBookPrice(String.format("$%.2f", price)); // Format price
                    } else {
                        book.setBookPrice("No retail price available.");
                    }
                } else {
                    book.setBookPrice("No sale info available.");
                }

                // Extract image links
                JSONObject imageLinks = volumeInfo.optJSONObject("imageLinks");
                if (imageLinks != null) {
                    book.setImgUrl(imageLinks.optString("thumbnail", ""));
                } else {
                    book.setImgUrl("");  // No image available
                }

                return book;
            }
        } catch (RestClientException e) {
            System.err.println("Error fetching book data: " + e.getMessage());
        }

        return null;


    }
}


