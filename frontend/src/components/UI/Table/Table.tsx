import React, { ReactNode } from 'react';

type TableProps = {
  id: string,
  children?: ReactNode
}

function Table (props: TableProps) {
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
