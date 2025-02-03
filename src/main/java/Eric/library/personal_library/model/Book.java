package Eric.library.personal_library.model;

import jakarta.persistence.*;
import lombok.*;

@Entity //Database entity - book
@Table(name = "books") //Mapping to books table
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Book {

    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto-increment
    private Long id;

    @Column(nullable = false)
    private String title; //Required title of the book

    private String googleBookUrl;

    public void setGoogleBookUrl(String googleBookUrl) {
        this.googleBookUrl = googleBookUrl;
    }

    public String getGoogleBookUrl() {
        return googleBookUrl;
    }

    private String googleBookId;
    public void setGoogleBookId(String googleBookId) {
        this.googleBookId = googleBookId;
    }

    public String getGoogleBookId() {
        return googleBookId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    private String author;

    public void setAuthor(String author) {
        this.author = author;
    }

    private String genre; //Genre or category

    public void setGenre(String genre) {
        this.genre = genre;
    }

    @Column(length = 5000) //Adjust for desc length
    private String summary; //Short summary, bAcK oF tHe BoOk

    public void setSummary(String summary) {
        this.summary = summary;
    }

    private String isbn; //International Standard Book Number

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    private String imgUrl;

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    private String publishDate;

    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }

    public String getPublishDate() {
        return publishDate;
    }

    private String publisherName;

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public String getPublisherName() {
        return publisherName;
    }

    private int pageCount;

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageCount() {
        return pageCount;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public String getSummary() {
        return summary;
    }

    public String getIsbn() {
        return isbn;
    }

    private String bookPrice;
    public void setBookPrice(String bookPrice) {
        this.bookPrice = bookPrice;
    }
    public String getBookPrice() {
        return bookPrice;
    }
}
