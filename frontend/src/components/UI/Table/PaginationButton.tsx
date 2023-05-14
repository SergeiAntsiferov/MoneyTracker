import React, { MouseEventHandler, ReactNode } from 'react';

type PaginationButtonProps = {
  onClick?: MouseEventHandler //
  loading?: Boolean, //
  active?: Boolean, //
  children?: ReactNode //
}

function PaginationButton(props: PaginationButtonProps) {
  const {
    onClick, 
    loading, 
    children, 
    active,
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
