import React from 'react';
import type { Children } from '../../../types';

function TBody(props: Children) {
  const { children } = props;
  return (
    <tbody className="table__body">{children}</tbody>
  );
}

export default TBody;
