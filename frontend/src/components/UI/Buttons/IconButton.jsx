import React from 'react';
import classes from './buttons.module.scss';

function IconButton(props) {
  const { icon, onClick } = props;
  return (
    <img
      className={classes.button__icon}
      onClick={onClick}
      src={`../../icons/${icon}.svg`}
      alt={icon}
    />
  );
}

export default IconButton;
