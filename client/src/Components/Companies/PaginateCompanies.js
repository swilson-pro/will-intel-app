import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'

const PaginateCompanies = ({pageCount, setPageCount, data, getCompaniesForPage}) => {



    const [currentItems, setCurrentItems] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 20;

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

        getCompaniesForPage(event.selected+1)
    }
    return (
        <>
        {/* <div>
            {currentItems.map(contact => {
                return (
                    <div>
                        <h3 key={contact.id}>{contact.name}</h3>
                    </div>
                )
            })}
        </div> */}
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
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

export default PaginateCompanies