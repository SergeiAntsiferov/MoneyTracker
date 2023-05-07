import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAction } from '../../redux/store';

// Custom select
// array must includes objects like:
//  {
//    id: number,
//    title: "string"
//  }

function Select(props) {
  const {
    id, // id DOM element
    array, // array of options
    defaultValue, // Default displayed value
    onChoose, // choose handler
  } = props;

  const isActive = useSelector((state) => state.visibility.select[id]);
  const [activeOption, setActiveOption] = useState(defaultValue);

  function optionHandler(row) {
    if (onChoose) onChoose(row);
    setActiveOption(row);
    createAction('TOGGLE_SELECT', { key: id, value: false });
  }

  // toggle visibility dropdown menu
  function toggleSelect(e) {
    e.stopPropagation();
    createAction('TOGGLE_SELECT', { key: id, value: !isActive });
  }

  return (
    <div id={id} className="custom-select">

      {/* select header */}
      <div className="custom-select__header" onClick={toggleSelect}>
        <span className="custom-select__title">{activeOption?.title || 'Choose'}</span>
        <img className={`custom-select__chevron ${isActive ? 'custom-select__chevron_active' : ''}`} src="../../icons/chevron.svg" alt="chevron" />
      </div>

      {/* dropdown menu */}
      <ul className={`custom-select__dropdown ${isActive ? 'custom-select__dropdown_active' : ''}`}>
        {array?.map((row) => (
          <li key={row.id} onClick={() => optionHandler(row)} className={`custom-select__option ${activeOption?.id === row.id ? 'custom-select__option_active' : ''}`}>
            {row.title}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Select;
