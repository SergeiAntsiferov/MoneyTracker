import React from 'react';

function Input(props) {
  const {
    onChange, onBlur, value, defaultValue, placeholder, invalid,
  } = props;

  return (
    <input
      placeholder={placeholder}
      className={invalid ? 'input input_invalid' : 'input'}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      defaultValue={defaultValue}
    />
  );
}

export default Input;
