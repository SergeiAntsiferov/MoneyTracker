import React, { useState } from 'react';
import TData from './TData';
import TRow from './TRow';

function THead({ children, ...props }) {
  const { name, headers, sortHandler } = props;

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

  // define table data classname
  function defineTdClass(field) {
    if (sortHandler) {
      if (sortField === field) return 'table__data-button_active';
      return 'table__data-button';
    } return 'table__data';
  }

  // define sorting badge class
  function defineBadgeClass(field, sorting) {
    if (sortField === field && sortState === sorting) return 'table__sort-icon_active';
    return 'table__sort-icon';
  }

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
            <td key={field} className={defineTdClass(field)} onClick={() => sortByField(field)}>
              {title}
              <div className="table__sort-badge">
                <span className={defineBadgeClass(field, -1)}>▲</span>
                <span className={defineBadgeClass(field, 1)}>▼</span>
              </div>
            </td>
          );
        })}
      </TRow>
    </thead>
  );
}

export default THead;
