import React from 'react';

function TRow(props) {
  const { children } = props;

  return (
    <tr className="table__row">{children}</tr>
  );
}

export default TRow;
