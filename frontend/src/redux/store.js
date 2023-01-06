import { configureStore } from '@reduxjs/toolkit';
import { catchHandler } from '../utils/error_handling/error_handling';

const generalReducerDefault = {
  current_theme: {},
};

function generalReducer(state = generalReducerDefault, action) {
  try {
    switch (action.type) {
      case 'SET_CURRENT_THEME':
        return { ...state, current_theme: action.payload };
      default:
        return state;
    }
  } catch (error) {
    catchHandler(error, 'generalReducer');
  }
}

// Создание хранилища (Используется в HOC <Provider> )
export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

// Функция создания action (type - тип action, payload - данные для изменения состояния)
export function createAction(type, payload) {
  store.dispatch({ type, payload });
}
