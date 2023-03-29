import React from "react"
import _ from "lodash"

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pageCount + 1)
    return (
        <>
            {pageCount > 1 && (
                <nav>
                    <ul className="pagination">
                        {pages.map((page) => (
                            <li className={"page-item" + (page === currentPage ? " active" : "")} key={"page_" + page}>
                                <a className="page-link" onClick={() => onPageChange(page)}>
                                    {page}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    )
}

export default Pagination
