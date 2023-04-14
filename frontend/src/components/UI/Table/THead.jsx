import React, { useState } from 'react';
import TData from './TData';
import TRow from './TRow';

function THead(props) {
  const {
    name, headers, sortHandler, loading, children,
  } = props;

  const [sortState, setSortState] = useState(null);
  const [sortField, setSortField] = useState(null);

  //
  function sortByField(field) {
    setSortField(field);
    if (sortField === field) {
      switch (sortState) {
        case null: {
          setSortState(1);
          return sortHandler(field, 1);
        }
        case 1: {
          setSortState(-1);
          return sortHandler(field, -1);
        }
        case -1: {
          setSortState(null);
          setSortField(null);
          return sortHandler(field, null);
        }
        default:
      }
    } else {
      setSortState(1);
      return sortHandler(field, 1);
    }
  }

  // define sorting badge class
  const defineBadgeClass = (field, sorting) => {
    if (sortField === field && sortState === sorting) return 'table__sort-icon_active';
    return 'table__sort-icon';
  };

  return (
    <thead className="table__head">
      <TRow>
        <TData loading={loading}>
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
              active={sortField === field}
              onClick={() => sortByField(field)}
              loading={loading}
            >
              {title}
              <div className="table__sort-badge">
                <span className={defineBadgeClass(field, -1)}>▲</span>
                <span className={defineBadgeClass(field, 1)}>▼</span>
              </div>
            </TData>
          );
        })}
      </TRow>
    </thead>
  );
}

export default THead;
