import React from 'react';
import type { Children } from '../../../types';

function TRow(props: Children) {
  const { children } = props;

  return (
    <tr className="table__row">{children}</tr>
  );
}

export default TRow;
