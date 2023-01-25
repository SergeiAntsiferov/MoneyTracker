import React from 'react';

function TData({ children, ...props }) {
  const { button, handler } = props;

  function clickHadler() {
    if (handler) handler();
    else return false;
  }

  return (
    <td
      className={button ? 'table__data-button' : 'table__data'}
      onClick={clickHadler}
    >
      {children}
    </td>
  );
}

export default TData;
