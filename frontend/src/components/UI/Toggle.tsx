import React, { MouseEventHandler } from 'react';

type ToggleProps = {
  state?: string,
  onClick: MouseEventHandler
}

function Toggle(props: ToggleProps) {
  const { state, onClick } = props;
  return (
    <div onClick={onClick} className={state ? 'toggle toggle_active' : 'toggle'}>
      <div className="toggle__circle" />
    </div>
  );
}

export default Toggle;
