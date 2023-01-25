import React, { useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader';
import Pagination from '../../components/UI/Pagination';
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
  const [transactionsId, setTransactionsId] = useState([]); // id's of displayed transactions

  const limitOptions = [ // display limit options
    { id: 1, title: 50, value: 50 },
    { id: 2, title: 100, value: 100 },
    { id: 3, title: 200, value: 200 },
    { id: 4, title: 'All', value: transactionsId.length },
  ];

  const headers = [ // Table headers
    { title: 'Email', field: 'email' },
    { title: 'Location', field: 'storeLocation' },
    { title: 'Date', field: 'saleDate' },
  ];

  const [limit, setLimit] = useState(limitOptions[0]);

  useEffect(() => {
    getTransactions();
  }, []);

  // get transactions
  async function getTransactions(range) {
    try {
      setIsLoading(true);

      if (range) {
        // setIsLoading(true);
        const result = await sendData('POST', '/get_transactions', { range });
        if (result) setTransactions(result);
        else return;
      } else {
        setIsLoading(true);
        const result = await sendData('POST', '/get_transactions');
        setIsLoading(false);

        if (result) {
          setTransactionsId(result); // write id's to state
          if (result.length > limit.value) { // if result more than limit
            const firstRange = result.slice(0, limit.value); // range of id for 1 page
            await getTransactions(firstRange); // get elements for 1 page
          } else {
            await getTransactions(result);// get all elements
          }
        } else return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      catchHandler(error, 'getTransactions');
    }
  }

  // Choose page
  async function choosePage(number) {
    let range;
    const { value, title } = limit;
    if (title === 'All') range = title;
    else {
      const fromIndex = number * value - value; // count start index
      const toIndex = number * value; // count end index
      range = transactionsId.slice(fromIndex, toIndex); // cut out range from initial array
    }
    await getTransactions(range);
  }

  return (
    <Table id="transactions">
      <THead name="Transactions" headers={headers}>
        <Select
          id="transactions__select"
          array={limitOptions}
          value={limit.title}
          onChoose={(choice) => setLimit(choice)}
        />
      </THead>
      <TBody>
        {transactions.map((item) => {
          const {
            _id, customer, saleDate, storeLocation,
          } = item;
          return (
            <TRow key={_id}>
              <TData>{customer?.email}</TData>
              <TData>{storeLocation}</TData>
              <TData>{saleDate}</TData>
            </TRow>
          );
        })}
      </TBody>
      <TFoot>
        <Pagination
          array={transactionsId}
          limit={limit.value}
          handler={choosePage}
        />
      </TFoot>
    </Table>
  );
}

export default Transactions;
