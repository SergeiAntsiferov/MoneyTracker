import { configureStore } from '@reduxjs/toolkit';
import { catchHandler } from '../utils/error_handling/error_handling';

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
    visibility: showReducer,
  },
});

// Функция создания action (type - тип action, payload - данные для изменения состояния)
export function createAction(type, payload) {
  store.dispatch({ type, payload });
}
