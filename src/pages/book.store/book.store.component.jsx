import React, { useState, useEffect } from "react";
import axios from "axios";
import DataFix from "./book.store.helper";
import { Container, CardDeck, Card, Spinner } from "react-bootstrap";
import Paging from "../../components/pagination/paging";
import "./book.store.component.css";

export default function Store({ searchedBook }) {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchedError, setSearchedError] = useState("");
  const [booksPerPage] = useState(4);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        await axios.get(`https://mysql-bookstore-api.herokuapp.com/insert`);
        const store = await axios.get(
          `https://mysql-bookstore-api.herokuapp.com/store`
        );
        setCollection(store.data);
        setLoading(false);
      } catch (error) {
        setSearchedError(error);
      }
    };

    fetchCollection();
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  } else {
    if (Array.isArray(collection)) {
      const stackedBooks = DataFix(collection);

      const filteredCollection = stackedBooks.filter((collection) =>
        collection.title.toLowerCase().includes(searchedBook.toLowerCase())
      );

      // Get current books
      const indexOfLastBook = currentPage * booksPerPage;
      const indexOfFirstPost = indexOfLastBook - booksPerPage;
      const currentPost = filteredCollection.slice(
        indexOfFirstPost,
        indexOfLastBook
      );
      //Change page
      const paginate = (pageNumber) => {
        setcurrentPage(pageNumber);
      };

      return (
        <Container>
          {searchedError ? (
            <h1>Error Loading Books {searchedError}</h1>
          ) : (
            <CardDeck>
              {currentPost.map((collection, idx) => {
                return (
                  <Card key={idx} className="mt-5" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={collection.url}
                      className="book-image"
                    />
                    <Card.Body>
                      <Card.Title>{collection.title}</Card.Title>
                      <small className="text-muted">
                        BookCode: {collection.bookCode}
                      </small>
                      <small className="text-muted">
                        BookCode: {collection.bookCode}
                      </small>
                      <Card.Link href="#">Update Book</Card.Link>
                      <Card.Link href="#">Delete Book</Card.Link>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Author: {collection.authorName}
                      </small>
                    </Card.Footer>
                  </Card>
                );
              })}
            </CardDeck>
          )}
          <Paging
            booksPerPage={booksPerPage}
            totalBooks={filteredCollection.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Container>
      );
    } else {
      return <Spinner animation="grow" />;
    }
  }
}
