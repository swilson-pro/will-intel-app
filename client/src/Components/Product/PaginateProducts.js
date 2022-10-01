import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

const PaginateProducts = ({pageCount, data, getProductsForPage}) => {

    const [currentItems, setCurrentItems] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(data.slice(itemOffset, endOffset));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);

        getProductsForPage(event.selected+1)
    }
    return (
        <>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previoius"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
        />
        </>
    )

}

export default PaginateProducts