package Eric.library.personal_library.repository;

import Eric.library.personal_library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing Book entities.
 * Extends JpaRepository to provide CRUD ops
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long>{

    /**
     * Finds books that contain the given title (case-insensitive)
     * @param title The title or part of hte title to search
     * @return List of books matching title criteria
     */
    //Custom PSQL queries
    List<Book> findByTitleContainingIgnoreCase(String title);
}

