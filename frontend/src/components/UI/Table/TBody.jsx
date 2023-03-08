import React from 'react';

function TBody(props) {
  const { children } = props;
  return (
    <tbody className="table__body">{children}</tbody>
  );
}

export default TBody;
