import React from "react";
import styled from "styled-components";

const Pagination = ({ posts, totalPosts, paginate }) => {
  const pageNumbers = []

  for(let i =1; i <= Math.ceil(totalPosts/posts); i++) {
      pageNumbers.push(i)
  }

  return (
    <Nav>
      <PageUl className="pagination">
        {pageNumbers.map(number => {
           return <li key={number} onClick={() => paginate(number)}>{number}</li>
        })}
      </PageUl>
    </Nav>
  );
};

export default Pagination;

const Nav = styled.nav`
display: flex;
justify-content: center;
`

const PageUl= styled.ul`
list-style: none;
display: flex;

li {
    margin: 0 10px;
    cursor: pointer;
}
`