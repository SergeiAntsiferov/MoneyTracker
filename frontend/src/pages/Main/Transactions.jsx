import React, { useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader';
import Pagination from '../../components/UI/Table/Pagination';
import Select from '../../components/UI/Select';
import Table from '../../components/UI/Table/Table';
import TBody from '../../components/UI/Table/TBody';
import TData from '../../components/UI/Table/TData';
import TFoot from '../../components/UI/Table/TFoot';
import THead from '../../components/UI/Table/THead';
import TRow from '../../components/UI/Table/TRow';
import { catchHandler } from '../../utils/error_handling/error_handling';
import { sendData } from '../../utils/functions/basic';

function Transactions() {
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [transactions, setTransactions] = useState([]); // displayed transactions
  const [transactionsIDs, setTransactionsIDs] = useState([]); // id's of displayed transactions
  const limitOptions = [ // display limit options
    { id: 1, title: 50 },
    { id: 2, title: 100 },
    { id: 3, title: 200 },
    { id: 4, title: 1000 },
  ];
  const [limit, setLimit] = useState(limitOptions[0].title);
  const headers = [ // Table headers
    { title: 'Email', field: 'customer.email' },
    { title: 'Location', field: 'storeLocation' },
    { title: 'Date', field: 'saleDate' },
  ];

  useEffect(() => {
    getTransactionsIDs();
  }, []);

  // get transactions ID's
  async function getTransactionsIDs(sort) {
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
  async function getTransactions(range) {
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
  async function choosePage(number) {
    const fromIndex = number * limit - limit; // count start index
    const toIndex = number * limit; // count end index
    const range = transactionsIDs.slice(fromIndex, toIndex); // cut out range from initial array
    if (range.length > 0) {
      setIsLoading(true);
      await getTransactions({ range }); // get transactions
      setIsLoading(false);
    } else setTransactions([]); // reset transactions
  }

  function sortTransactions(field, sorting) {
    getTransactionsIDs({
      sort: {
        field,
        sorting,
      },
    });
  }

  return (
    <Table id="transactions">
      <THead
        name="Transactions"
        headers={headers}
        sortHandler={sortTransactions}
      >
        <Select
          id="transactions__select"
          array={limitOptions}
          value={limit}
          onChoose={(choice) => setLimit(choice.title)}
        />
      </THead>
      <TBody>
        {transactions.map((item) => {
          const {
            _id, customer, saleDate, storeLocation,
          } = item;
          return (
            <TRow key={_id}>
              <TData loading={isLoading}>{customer?.email}</TData>
              <TData loading={isLoading}>{storeLocation}</TData>
              <TData loading={isLoading}>{saleDate}</TData>
            </TRow>
          );
        })}
      </TBody>
      <TFoot>
        <Pagination
          array={transactionsIDs}
          limit={limit}
          handler={choosePage}
        />
      </TFoot>
    </Table>
  );
}

export default Transactions;
