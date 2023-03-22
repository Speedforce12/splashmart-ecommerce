import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Paginator = ({ data, ordersPerPage, setPageNumber }) => {
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={<span className='mr-4'>...</span>}
        pageCount={Math.ceil(data?.length / ordersPerPage)}
        onPageChange={changePage}
        containerClassName='flex items-center justify-center mt-8 mb-4'
        pageClassName='block border-[1px] shadow-md border-solid border-gray-300 hover:bg-blue-500 w-10 h-10 flex items-center justify-center rounded-md mr-4'
        activeClassName='bg-blue-800 text-white'
        previousClassName={
          "mx-2 py-2 px-4 bg-white text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white"
        }
        nextClassName={
          "mx-2 py-2 px-4 bg-white text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white"
        }
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </>
  );
};

export default Paginator;
