import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { catchHandler } from '../utils/error_handling/error_handling';

const reducerDefault = {
  select: {},
  headers: [ // Table headers
  { title: 'Email', field: 'customer.email' },
  { title: 'Location', field: 'storeLocation' },
  { title: 'Date', field: 'saleDate' },
  { title: 'Method', field: 'purchaseMethod' },
]
};

function generalReducer(state = reducerDefault, action: AnyAction) {
  try {
    switch (action.type) {
      case 'TOGGLE_SELECT':
        return { ...state, select: action.payload };

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
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>