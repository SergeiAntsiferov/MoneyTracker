import React, { useEffect, useState } from 'react';
import Pagination from '../components/UI/Table/Pagination';
import Select, { SelectObject } from '../components/UI/Select';
import Table from '../components/UI/Table/Table';
import TBody from '../components/UI/Table/TBody';
import TData from '../components/UI/Table/TData';
import TFoot from '../components/UI/Table/TFoot';
import THead from '../components/UI/Table/THead';
import TRow from '../components/UI/Table/TRow';
import { catchHandler } from '../utils/error_handling/error_handling';
import { sendData } from '../utils/functions/basic';
import { UniversalObject } from '../types';
import { useAppSelector } from '../redux/hooks';
import { store } from '../redux/store';

function Transactions() {
  const [isLoading, setIsLoading] = useState<Boolean>(false); // loading state
  const [transactions, setTransactions] = useState([]); // displayed transactions
  const [transactionsIDs, setTransactionsIDs] = useState([]); // id's of displayed transactions
  const headers = useAppSelector(state => state.general?.headers) // headers default

  const limitOptions = [ // display limit options
    { id: 1, title: 50 },
    { id: 2, title: 100 },
    { id: 3, title: 200 },
    { id: 4, title: 1000 },
  ];

  const [limit, setLimit] = useState<number>(limitOptions[0].title);


  useEffect(() => {
    getTransactionsIDs();
  }, []);

  // get transactions ID's
  async function getTransactionsIDs(sort?: { sort: {field: string, sorting: number | null} }): Promise<void> {
    try {
      setIsLoading(true);
      let requestData = {}; // request's data
      if (sort) requestData = sort; // if there is sort parametres, add it
      const result = await sendData('POST', '/get_transactions', requestData);
      if (result) setTransactionsIDs(result); // write id's to state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      catchHandler(error, 'getTransactionsIDs');
    }
  }

  // get transactions
  async function getTransactions(range: {range: number[]}) {
    try {
      setIsLoading(true);
      if (range) {
        const result = await sendData('POST', '/get_transactions', range);
        if (result) setTransactions(result);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      catchHandler(error, 'getTransactions');
    }
  }

  // Choose page
  async function choosePage(number: number) {
    const fromIndex = number * limit - limit; // count start index
    const toIndex = number * limit; // count end index
    const range = transactionsIDs.slice(fromIndex, toIndex); // cut out range from initial array
    if (range.length > 0) {
      setIsLoading(true);
      await getTransactions({ range }); // get transactions
      setIsLoading(false);
    } else setTransactions([]); // reset transactions
  }

  async function sortTransactions(field: string, sorting: number | null) {
    await getTransactionsIDs({
      sort: {
        field,
        sorting,
      },
    });
  }

  // Определить данные объекта
  function defineData(object: UniversalObject, field: string) {
    const keys = field.split('.'); // разделить ключ схемы через точку

    // Углубиться в объект и получить данные
    function deepIntoTheObject(data: UniversalObject | null | undefined, deep: number): any {
      // если нет данных - возвращаем null
      if (!data) return null;
      // Если глубина равна длине массива вложенности ключей
      if (deep === (keys.length)) return data;
      // Иначе берем зачение текущей глубины и идем дальше
      return deepIntoTheObject(data?.[keys?.[deep]], deep + 1);
    }

    // Вернуть значение
    return deepIntoTheObject(object, 0);
  }

  return (
    <div className="page transactions">
      <Table id="transactions">
        <THead
          name="Transactions"
          headers={headers}
          sortHandler={sortTransactions}
        >
          <Select
            id="transactions__select"
            array={limitOptions}
            defaultValue={limitOptions[0]}
            onChoose={(choice: {id: string, title: number}) => setLimit(choice.title)}
          />
        </THead>
        <TBody>
          {transactions.map((row) => {
            const { _id } = row;
            return (
              <TRow key={_id}>
                {headers?.map((item) => {
                  const { field } = item;
                  return (
                    <TData key={field} loading={isLoading}>
                      {defineData(row, field)}
                    </TData>
                  );
                })}
              </TRow>
            );
          })}
          {transactions.length === 0
          && isLoading && (
          <TRow>
            {headers?.map((item) => <TData key={item.field} loading />)}
          </TRow>
          )}
        </TBody>
        <TFoot>
          <Pagination
            array={transactionsIDs}
            limit={limit}
            handler={choosePage}
          />
        </TFoot>
      </Table>
    </div>
  );
}

export default Transactions;
