import React, { useEffect, useState } from 'react';
import Pagination from '../../components/UI/Pagination';
import { catchHandler } from '../../utils/error_handling/error_handling';
import { sendData } from '../../utils/functions/basic';

function Transactions() {
  const [transactions, setTransactions] = useState([]); // displayed transactions
  const [transactionsId, setTransactionsId] = useState([]); // id's of displayed transactions
  const limit = 200;

  useEffect(() => {
    getTransactions();
  }, []);

  // get transactions
  async function getTransactions(range) {
    try {
      if (range) {
        const result = await sendData('POST', '/get_transactions', { range });
        if (result) setTransactions(result);
        else return;
      } else {
        const result = await sendData('POST', '/get_transactions');
        if (result) {
          setTransactionsId(result); // write id's to state

          if (result.length > limit) { // if result more than limit
            const firstRange = result.slice(0, limit); // range of id for 1 page
            await getTransactions(firstRange); // get elements for 1 page
          } else {
            await getTransactions(result);// get all elements
          }
        } else return;
      }
    } catch (error) {
      catchHandler(error, 'getTransactions');
    }
  }

  // Choose page
  async function choosePage(number) {
    const fromIndex = number * limit - limit;
    const toIndex = number * limit;
    const range = transactionsId.slice(fromIndex, toIndex);
    await getTransactions(range);
  }

  // console.log(transactions);
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <td className="table__data">Transactions</td>
        </tr>
        <tr className="table__row">
          <td className="table__data">Email</td>
          <td className="table__data">Location</td>
          <td className="table__data">Date</td>
        </tr>
      </thead>
      <tbody className="table__body">
        {transactions.map((item) => {
          const {
            _id, customer, saleDate, storeLocation,
          } = item;
          return (
            <tr className="table__row" key={_id}>
              <td className="table__data">{customer?.email}</td>
              <td className="table__data">{storeLocation}</td>
              <td className="table__data">{saleDate}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="table__foot">
        <Pagination
          array={transactionsId}
          limit={limit}
          handler={choosePage}
        />
      </tfoot>
    </table>
  );
}

export default Transactions;
