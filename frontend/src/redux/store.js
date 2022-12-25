import { configureStore } from '@reduxjs/toolkit';
import { catchHandler } from '../utils/error_handling/error_handling';

const reducerDefault = {
  test: '1',
};

function reducer(state = reducerDefault, action) {
  try {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, test: action.payload };
      default:
        return state;
    }
  } catch (error) {
    catchHandler(error, 'reducer');
  }
}

// Создание хранилища (Используется в HOC <Provider> )
export const store = configureStore({
  reducer: {
    reducer,
  },
});

// Функция создания action (type - тип action, payload - данные для изменения состояния)
export function createAction(type, payload) {
  store.dispatch({ type, payload });
}
