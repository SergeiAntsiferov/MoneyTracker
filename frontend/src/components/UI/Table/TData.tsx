import React, { MouseEventHandler, ReactNode } from 'react';

type TDataProps = {
  onClick?: MouseEventHandler,
  active?: Boolean,
  loading?: Boolean,
  children?: ReactNode
}

function TData(props: TDataProps) {
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
