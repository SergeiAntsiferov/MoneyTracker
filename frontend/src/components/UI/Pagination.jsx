import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Select from './Select';

// Строка пагинации
// array - array of element's id
// limit - display limit per page
// handler - page choose handler
function Pagination(props) {
  const { array, limit, handler } = props;

  const [isLoading, setIsLoading] = useState(false); // loading state
  const [activePage, setActivePage] = useState(1); // active page
  const [pages, setPages] = useState([]); // array of pages
  const [page, setPage] = useState(activePage);

  // Page choose handling
  async function chooseHandler(number) {
    setActivePage(number); // Write active page to state
    setIsLoading(true); // loading in process
    await handler(number); // waiting for the handler function to execute
    setIsLoading(false); // loading completed
  }

  useEffect(() => {
    countPages(); // recount pages if an array was changed
  }, [array, limit]);

  // Create an array from pages
  function countPages() {
    if (limit) { // if there is a limit
      const ratio = array.length / limit; // length to limit ratio
      if (ratio > 1) { // if ratio more than 1
        // create an array of numbers where length is a ratio rounded up
        setPages([...Array(Math.ceil(ratio)).keys()]);
      } else setPages([]); // else empty array
    } else setPages([]); // else empty array
    chooseHandler(1); // set active page = 1 after recount
  }

  // go to the previous page
  function choosePrevious() {
    if (activePage > 1) {
      const previous = activePage - 1;
      chooseHandler(previous);
      setPage(previous);
    } else chooseHandler(activePage);
  }

  // go to the next page
  function chooseNext() {
    if (activePage < pages.length) {
      const next = activePage + 1;
      chooseHandler(next);
      setPage(next);
    } else chooseHandler(activePage);
  }

  // Handle input
  function inputPage(e) {
    const result = +e.target.value.replace(/[^0-9]/g, ''); // leave only integers
    if (result === 0) setPage(''); // set empty if integer is 0
    else if (result > pages.length) setPage(pages.length); // set last page if integer more than it
    else {
      setPage(result); // set page
      if (e.key === 'Enter') chooseHandler(result); /// handle choosed page by pressing Enter
    }
  }

  // if there are no pages, component didn't displayed
  if (!pages || pages.length === 0) return null;
  return (
    <tr className="table__row" id="pagination">
      <td className="table__data pagination__pages">
        {isLoading ? <Loader /> : `Showing ${activePage * limit - limit + 1} to ${activePage * limit} of ${array.length} entries`}
      </td>
      <td className="table__data pagination__pages">
        <div onClick={choosePrevious} className="pagination__navigate">{isLoading ? <Loader /> : 'Previous'}</div>
        <div className="pagination__page">
          <input
            className="pagination__input"
            onChange={inputPage}
            onKeyUp={inputPage}
            value={page}
          />
          {`of ${pages.length}`}
        </div>
        <div onClick={chooseNext} className="pagination__navigate">{isLoading ? <Loader /> : 'Next'}</div>
      </td>
    </tr>
  );
}

export default Pagination;
