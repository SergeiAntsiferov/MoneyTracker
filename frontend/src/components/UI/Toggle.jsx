import React from 'react';

function Toggle(props) {
  const { state, onClick } = props;
  return (
    <div onClick={onClick} className={state ? 'toggle toggle_active' : 'toggle'}>
      <div className="toggle__circle" />
    </div>
  );
}

export default Toggle;
