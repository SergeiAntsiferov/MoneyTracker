import React from 'react';

function Table(props) {
  const { id, children } = props;
  return (
    <div className="table__wrapper">
      <table className="table" id={id}>
        {children}
      </table>
    </div>
  );
}

export default Table;
