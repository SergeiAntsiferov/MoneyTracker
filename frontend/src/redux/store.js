import { configureStore } from '@reduxjs/toolkit';
import { catchHandler } from '../utils/error_handling/error_handling';

const generalReducerDefault = {
  current_theme: {},
  abort_controllers: [],
};

function generalReducer(state = generalReducerDefault, action) {
  try {
    switch (action.type) {
      case 'SET_CURRENT_THEME':
        return { ...state, current_theme: action.payload };
      case 'SET_ABORT_CONTROLLERS':
        return { ...state, abort_controllers: action.payload };
      default:
        return state;
    }
  } catch (error) {
    catchHandler(error, 'generalReducer');
  }
}

const showReducerDefault = {
  select: {},
};

function showReducer(state = showReducerDefault, action) {
  try {
    switch (action.type) {
      case 'TOGGLE_SELECT':
        return { ...state, select: { [action.payload.key]: action.payload.value } };

      default:
        return state;
    }
  } catch (error) {
    catchHandler(error, 'showReducer');
  }
}

// Создание хранилища (Используется в HOC <Provider> )
export const store = configureStore({
  reducer: {
    general: generalReducer,
    visibility: showReducer,
  },
});

// Функция создания action (type - тип action, payload - данные для изменения состояния)
export function createAction(type, payload) {
  store.dispatch({ type, payload });
}
