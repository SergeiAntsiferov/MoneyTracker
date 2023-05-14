import React, { useEffect, useState } from 'react';
import PaginationButton from './PaginationButton';


type PaginationProps = {
  array: number[] | string[], // array of element's id
  limit: number, // limit - display limit per page
  handler: Function // page choose handler
}

// Строка пагинации
function Pagination(props: PaginationProps) {
  const { array, limit, handler } = props;

  const [loadingPage, setLoadingPage] = useState<number | null>(null); // загружаемая страница
  const [activePage, setActivePage] = useState<number>(1); // активная страница
  const [pages, setPages] = useState<number[]>([]); // массив страниц
  const [step, setStep] = useState(0); // текущий шаг (при большом количестве страниц)
  const numberOfpages = 5; // количество страниц для выбора
  const lastPage = pages.length;
  const showFirst = step > 0;
  const showLast = step * numberOfpages + numberOfpages < lastPage;

  // Обработка выбора страницы
  async function chooseHandler(number: number) {
    if (loadingPage !== number) {
      setActivePage(number); // Записать активную страницу в состояние
      setLoadingPage(number); // выбранная страница загружается
      await handler(number); // ожидание выполнения функции обработчика
      setLoadingPage(null); // выбранная страница загружена
    }
  }

  useEffect(() => {
    countPages(); // пересчёт страниц при изменении длины массива или лимита
  }, [array, limit]);

  // Создать массив из номеров страниц
  function countPages() {
    if (limit) { // если указан лимит
      const ratio = array.length / limit; // отношение длины к лимиту
      if (ratio > 1) { // если отношение больше 1
        // записывается массив чисел длиной ratio округлённого в большую сторону
        const arrayOfPages = Array.from({ length: Math.ceil(ratio) }, (_, i) => i)
        setPages(arrayOfPages);
        // Если текущая страница меньше пересчитанного количества страниц
        if (activePage < ratio) chooseHandler(activePage); // выбрать ее же
        else chooseHandler(1); // иначе выбрать первую страницу
      } else {
        setPages([]); // иначе записывается пустой массив
        chooseHandler(1);
      }
    } else {
      setPages([]); // иначе записывается пустой массив
      chooseHandler(1);
    }
  }

  // Обработчик шагв
  function stepHandler(direction: string) {
    switch (direction) {
      case '<': {
        if (step * numberOfpages - numberOfpages < 0) return setStep(0);
        return setStep(step - 1);
      }
      // case '<<': {
      //   if (step * numberOfpages - numberOfpages * 10 < 0) return setStep(0);
      //   return setStep(step - 10);
      // }
      case '>': {
        if (step * numberOfpages + numberOfpages > pages.length) return setStep(step);
        return setStep(step + 1);
      }
      // case '>>': {
      //   if (step * numberOfpages + numberOfpages * 10 > pages.length) return setStep(step);
      //   return setStep(step + 10);
      // }
      default:
    }
  }

  // Если страницы отсутствуют, компонент не покажется
  if (!pages || pages.length === 0) return null;
  return (
    <tr className="table__pagination">
      {/* {showFirst && <TData onClick={() => stepHandler('<<')}>{'<<'}</TData>} */}
      {showFirst && <PaginationButton onClick={() => stepHandler('<')}>{'<'}</PaginationButton>}
      {showFirst && (
      <PaginationButton onClick={() => chooseHandler(1)} active={activePage === 1}>
        1
      </PaginationButton>
      )}
      {showFirst && <PaginationButton>...</PaginationButton>}

      {pages.slice(step * numberOfpages, step * numberOfpages + numberOfpages).map((index) => {
        const pageNumber = index + 1; // номер страницы
        return (
          <PaginationButton
            key={index}
            onClick={() => chooseHandler(pageNumber)}
            active={activePage === pageNumber}
            loading={loadingPage === pageNumber}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      {showLast && <PaginationButton>...</PaginationButton>}
      {showLast && (
      <PaginationButton onClick={() => chooseHandler(lastPage)} active={activePage === lastPage}>
        {lastPage}
      </PaginationButton>
      )}
      {showLast && <PaginationButton onClick={() => stepHandler('>')}>{'>'}</PaginationButton>}
      {/* {showLast && <TData onClick={() => stepHandler('>>')}>{'>>'}</TData>} */}
    </tr>
  );
}

export default Pagination;
