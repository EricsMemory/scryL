package Eric.library.personal_library.model;

public class BestsellerBook {

    private String title;
    private String author;
    private String description;
    private String isbn;
    private String googleBookUrl;
    private String imgUrl;


    public BestsellerBook(String title, String author, String googleBookUrl, String imgUrl) {
        this.title = title;
        this.author = author;
        this.googleBookUrl = googleBookUrl;
        this.imgUrl = imgUrl;
    }

    public BestsellerBook() {
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGoogleBookUrl() {
        return googleBookUrl;
    }

    public void setGoogleBookUrl(String googleBookUrl) {
        this.googleBookUrl = googleBookUrl;
    }

    public String getImgUrl() {
        return imgUrl;
    }
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
