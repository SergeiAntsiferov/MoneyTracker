import React, { useState } from 'react';

function Table() {
  return (
    <table className="table">
      <thead className="table__head" />
      <tbody className="table__body">
        <tr className="table__row">
          <td className="table__data">data1</td>
          <td className="table__data">data2</td>
          <td className="table__data">data3</td>
        </tr>
        <tr className="table__row">
          <td className="table__data">data1</td>
          <td className="table__data">data2</td>
          <td className="table__data">data3</td>
        </tr>
        <tr className="table__row">
          <td className="table__data">data1</td>
          <td className="table__data">data2</td>
          <td className="table__data">data3</td>
        </tr>
      </tbody>
      <tfoot className="table__foot" />
    </table>
  );
}

export default Table;
