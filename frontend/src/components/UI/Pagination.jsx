import React, { useEffect, useState } from 'react';
import Loader from './Loader';

// Строка пагинации
// array - массив id элементов
// limit - лимит отображения на одной странице
// handler - обработчик выбора страницы
function Pagination(props) {
  const { array, limit, handler } = props;

  const [isLoading, setIsLoading] = useState(false); // загружаемая страница
  const [activePage, setActivePage] = useState(1); // активная страница
  const [pages, setPages] = useState([]); // массив страниц
  const [page, setPage] = useState(activePage);

  // Обработка выбора страницы
  async function chooseHandler(number) {
    setActivePage(number); // Записать активную страницу в состояние
    setIsLoading(true); // выбранная страница загружается
    await handler(number); // ожидание выполнения функции обработчика
    setIsLoading(false); // выбранная страница загружена
  }

  useEffect(() => {
    countPages(); // пересчёт страниц при изменении длины массива или лимита
  }, [array]);

  // Создать массив из номеров страниц
  function countPages() {
    if (limit) { // если указан лимит
      const ratio = array.length / limit; // отношение длины к лимиту
      if (ratio > 1) { // если отношение больше 1
        // записывается массив чисел длиной ratio округлённого в большую сторону
        setPages([...Array(Math.ceil(ratio)).keys()]);
      } else setPages([]); // иначе записывается пустой массив
    } else setPages([]); // иначе записывается пустой массив
    setActivePage(1); // Записать активную страницу в состояние
  }

  function choosePrevious() {
    if (activePage > 1) {
      const previous = activePage - 1;
      chooseHandler(previous);
      setPage(previous);
    } else chooseHandler(activePage);
  }

  function chooseNext() {
    if (activePage < pages.length) {
      const next = activePage + 1;
      chooseHandler(next);
      setPage(next);
    } else chooseHandler(activePage);
  }

  function inputPage(e) {
    if (!e.target.value) {
      setPage('');
    }

    const result = +e.target.value.replace(/[^0-9]/g, '');
    if (result === 0) setPage(1);
    else if (result > pages.length) setPage(pages.length);
    else {
      setPage(result);
      if (e.key === 'Enter') chooseHandler(result);
    }
  }

  // Если страницы отсутствуют, компонент не покажется
  if (!pages || pages.length === 0) return null;
  return (
    <tr className="table__row" id="pagination">
      <td className="table__data pagination__pages">
        {`Showing ${activePage * limit - limit + 1} to ${activePage * limit} of ${array.length} entries`}
      </td>
      <td className="table__data pagination__pages">
        <div onClick={choosePrevious} className="pagination__navigate">Previous</div>

        {isLoading ? <Loader /> : (
          <div className="pagination__page">
            <input
              className="pagination__input"
              onChange={inputPage}
              onKeyUp={inputPage}
              value={page}
            />
            {`of ${pages.length}`}
          </div>
        )}
        <div onClick={chooseNext} className="pagination__navigate">Next</div>
        {/* {pages.map((index) => {
          const pageNumber = index + 1; // номер страницы
          return (
            <div
              key={index}
              onClick={() => chooseHandler(pageNumber)}
              className={activePage === pageNumber ?
              'pagination__page pagination__page_active' :
              'pagination__page'}
            >
              {isLoading ? <Loader /> : pageNumber}
            </div>
          );
        })} */}
      </td>
    </tr>
  );
}

export default Pagination;
