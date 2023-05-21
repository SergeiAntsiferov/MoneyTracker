import React, { useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export type SelectObject = {
  id: number | string,
  title: string | number | null
}

type SelectProps = {
  id: string,
  array: SelectObject[] | [],
  onChoose?: Function,
  defaultValue?: SelectObject
}

// Custom select
function Select(props: SelectProps) {
  const {
    id, // id DOM element
    array, // array of options
    defaultValue, // Default displayed value
    onChoose, // choose handler
  } = props;

  const dispatch = useAppDispatch()
  const isActive = useAppSelector(state => state.general?.select[id]);
  const [activeOption, setActiveOption] = useState(defaultValue);

  function optionHandler(row: SelectObject): void {
    if (onChoose) onChoose(row);
    setActiveOption(row);
    dispatch({type: 'TOGGLE_SELECT', payload: { [id]: false }});
  }

  function toggleSelect(event: MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
    dispatch({type: 'TOGGLE_SELECT', payload: { [id]: !isActive }});
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
