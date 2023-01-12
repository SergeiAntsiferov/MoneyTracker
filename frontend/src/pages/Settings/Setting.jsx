import React, { useState } from 'react';

function Setting({ children, ...props }) {
  const { title, openable } = props;

  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    if (openable) setIsOpen(!isOpen);
  }

  // Clone children to pass props
  const child = React.cloneElement(children, { isOpen });

  return (
    <div className="setting">
      <p className="setting__name">{title}</p>
      {openable
        && (
        <img
          onClick={toggleOpen}
          alt="chevron"
          src="../../../icons/chevron.svg"
          className={isOpen ? 'setting__chevron_active' : 'setting__chevron'}
        />
        )}
      {child}
    </div>

  );
}

export default Setting;
