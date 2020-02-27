import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const pageBar = (props) => {
  const {handlePageClick} = props;

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={100}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
    />
  );
};

pageBar.propTypes = {
  handlePageClick: PropTypes.func,
};

export default pageBar;
