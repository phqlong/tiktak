import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
// import "./pagination.scss"

const PaginationProduct = ({ page, pages, onPageChange }) => {

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    return (
        <Pagination>
            <PaginationItem disabled={page === 1}>
                <PaginationLink first onClick={() => handlePageChange(1)}></PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={page === 1}>
                <PaginationLink previous onClick={() => handlePageChange(page - 1)}></PaginationLink>
            </PaginationItem>

            {[...Array(pages)].map((_, i) =>
                // map [0..pages-1] to key i: 0 -> pages-1 
                <PaginationItem active={i + 1 === page} key={i + 1}>
                    <PaginationLink onClick={() => handlePageChange(i + 1)}>{i + 1}</PaginationLink>
                </PaginationItem>
            )}

            <PaginationItem disabled={page === pages}>
                <PaginationLink next onClick={() => handlePageChange(page + 1)}></PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={page === pages}>
                <PaginationLink last onClick={() => handlePageChange(pages)}></PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationProduct
