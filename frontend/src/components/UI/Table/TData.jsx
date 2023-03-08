import React from 'react';

function TData(props) {
  const {
    onClick, loading, children, active,
  } = props;

  if (onClick) {
    return (
      <td
        onClick={onClick}
        className={`table__data-button ${active ? 'table__data-button_active' : ''} ${loading ? 'loading' : ''}`}
      >
        {children}
      </td>
    );
  } return (
    <td className={`table__data ${loading ? 'loading' : ''}`}>
      {children}
    </td>
  );
}

export default TData;
