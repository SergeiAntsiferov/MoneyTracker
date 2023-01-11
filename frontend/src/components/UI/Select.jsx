import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAction } from '../../redux/store';

// Custom select
// properties:
// - array - array of options
// must includes objects like:
//     {
//         id: number,
//         title: "string"
//     }
// - onChoose - choose handler
// - defaultValue - default displayed value

function Select(props) {
  const {
    array, onChoose, defaultValue, id,
  } = props;

  const isActive = useSelector((state) => state.visibility.select[id]);
  const [activeOption, setActiveOption] = useState('');

  function optionHandler(row) {
    if (onChoose(row)) {
      createAction('TOGGLE_SELECT', { key: id, value: false });
    } else if (activeOption.id === row.id) {
      setActiveOption('');
    } else {
      setActiveOption(row);
      createAction('TOGGLE_SELECT', { key: id, value: false });
    }
  }

  // toggle visibility dropdown menu
  function toggleSelect(e) {
    e.stopPropagation();
    createAction('TOGGLE_SELECT', { key: id, value: !isActive });
  }

  return (
    <div id={id} className="custom-select">
      <div className="custom-select__header" onClick={toggleSelect}>
        <span className="custom-select__title">{defaultValue || 'Choose'}</span>
        <img
          className={isActive ? 'custom-select__chevron custom-select__chevron_active' : 'custom-select__chevron'}
          onClick={toggleSelect}
          src="../../icons/chevron.svg"
          alt="chevron"
        />
      </div>
      <div className={isActive ? 'custom-select__dropdown custom-select__dropdown_active' : 'custom-select__dropdown'}>
        {array && array.map((row) => (
          <span
            key={row.id}
            className={activeOption.id === row.id ? 'custom-select__option custom-select__option_active' : 'custom-select__option'}
            onClick={() => optionHandler(row)}
          >
            {row.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Select;
