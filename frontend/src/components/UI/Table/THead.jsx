import React from 'react';
import TData from './TData';
import TRow from './TRow';

function THead({ children, ...props }) {
  const { name, headers } = props;
  return (
    <thead className="table__head">
      <TRow>
        <TData>
          {children}
          {name}
        </TData>
      </TRow>
      <TRow>
        {headers.map((item) => {
          const { field, title } = item;
          return (
            <TData
              key={field}
              button
            >
              {`${title}⥮`}
            </TData>
          );
        })}
      </TRow>
    </thead>
  );
}

export default THead;
