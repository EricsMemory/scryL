package Eric.library.personal_library.services;

import Eric.library.personal_library.model.BestsellerBook;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


/**
 * Service class for integrating with the New York Times API.
 * This service is used to fetch and process book-related data
 * provided by the New York Times.
 *
 * It allows querying for bestsellers
 */

@Service
public class NYTimesService {

    @Value("${ny.times.fiction.api.url}")
    private String nytimesFictionBSUrl;

    @Value("${ny.times.nonfiction.api.url}")
    private String nytimesNonFictionBSUrl;

    @Value("${ny.times.api.key}")
    private String nyTimesApiKey;




    private final RestTemplate restTemplate = new RestTemplate();


    public List<BestsellerBook> fictionBestsellerList (){
        String url = nytimesFictionBSUrl + nyTimesApiKey;
        List<BestsellerBook> books = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = restTemplate.getForObject(url, JsonNode.class);
            JsonNode booksArray = rootNode.path("results").path("books");

            for (JsonNode bookNode : booksArray) {
                BestsellerBook book = new BestsellerBook();
                book.setAuthor((bookNode.get("author").asText()));
                book.setTitle(bookNode.get("title").asText());
                book.setDescription(bookNode.get("description").asText());
                book.setIsbn(bookNode.get("primary_isbn13").asText());
                book.setImgUrl(bookNode.get("book_image").asText());

                books.add(book);
            }
        } catch (RestClientException e) {
            e.printStackTrace();
        }

        return books;
    }

    public List<BestsellerBook> nonfictionBestsellerList (){
        String url = nytimesNonFictionBSUrl + nyTimesApiKey;
        List<BestsellerBook> books = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = restTemplate.getForObject(url, JsonNode.class);
            JsonNode booksArray = rootNode.path("results").path("books");

            for (JsonNode bookNode : booksArray) {
                BestsellerBook book = new BestsellerBook();
                book.setAuthor((bookNode.get("author").asText()));
                book.setTitle(bookNode.get("title").asText());
                book.setDescription(bookNode.get("description").asText());
                book.setIsbn(bookNode.get("primary_isbn13").asText());
                book.setImgUrl(bookNode.get("book_image").asText());

                books.add(book);
            }
        } catch (RestClientException e) {
            e.printStackTrace();
        }

        return books;
    }


}
