import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAction } from '../../redux/store';
import { catchHandler } from '../../utils/error_handling/error_handling';
import { sendData } from '../../utils/functions/basic';
import { changeCssProperty } from '../../utils/functions/others';
import Toggle from './Toggle';

function ThemeToggle() {
  const currentTheme = useSelector((state) => state.general.current_theme);

  async function changeTheme() {
    try {
      const reqData = {
        current_theme: currentTheme,
      };
      const result = await sendData('POST', '/change_theme', reqData);
      if (result) {
        createAction('SET_CURRENT_THEME', result);
        changeCssProperty(result?.styles);
      } else return;
    } catch (error) {
      catchHandler(error, 'changeTheme');
    }
  }

  return (
    <Toggle
      state={currentTheme?.type === 'dark'}
      onClick={changeTheme}
    />
  );
}

export default ThemeToggle;
