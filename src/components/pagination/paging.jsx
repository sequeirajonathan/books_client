import React from "react";
import {Container,Pagination} from "react-bootstrap";


export default function Paging({ booksPerPage, totalBooks, paginate, currentPage }) {
  const pages = [];
  const active = currentPage;

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pages.push(
      <Pagination.Item key={i} active={i === active} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid className="mt-3">
      <Pagination>{pages}</Pagination>
    </Container>
  );
}
