import React from 'react';

function PaginationButton(props) {
  const {
    onClick, loading, children, active,
  } = props;

  const defineClassName = () => {
    let result = 'table__pagination-button';
    if (active) result += ' table__pagination-button_active';
    if (!onClick) result += ' table__pagination-button_disabled';
    if (loading) result += ' loading';
    return result;
  };

  return (
    <td onClick={onClick} className={defineClassName()}>
      {children}
    </td>
  );
}

export default PaginationButton;
