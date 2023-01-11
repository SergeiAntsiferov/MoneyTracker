import React from 'react';

function Input(props) {
  const {
    onChange, onBlur, value, defaultValue,
  } = props;

  return (
    <input
      className="input"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      defaultValue={defaultValue}
    />
  );
}

export default Input;
