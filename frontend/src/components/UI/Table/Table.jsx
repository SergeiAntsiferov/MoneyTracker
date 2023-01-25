import React from 'react';

function Table({ children, ...props }) {
  const { id } = props;
  return (
    <table className="table" id={id}>
      {children}
    </table>
  );
}

export default Table;
