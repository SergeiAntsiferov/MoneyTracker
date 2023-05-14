import React, { ChangeEventHandler, FocusEventHandler } from 'react';


type InputProps = {
  onChange: ChangeEventHandler,
  onBlur: FocusEventHandler,
  value: string,
  defaultValue: string,
  placeholder: string,
  invalid: Boolean
}

function Input(props: InputProps) {
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
