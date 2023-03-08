import React from 'react';

function Table(props) {
  const { id, children } = props;
  return (
    <table className="table" id={id}>
      {children}
    </table>
  );
}

export default Table;
