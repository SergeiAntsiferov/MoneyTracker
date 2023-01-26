import React from 'react';

function TData({ children, ...props }) {
  const { isButton, clickHandler } = props;

  function onClick() {
    if (clickHandler) clickHandler();
    else return false;
  }

  return (
    <td
      className={isButton ? 'table__data-button' : 'table__data'}
      onClick={onClick}
    >
      {children}
    </td>
  );
}

export default TData;
