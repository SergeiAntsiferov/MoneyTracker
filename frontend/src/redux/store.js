import { catchHandler } from "../utils/error_handling/error_handling"
import { configureStore } from '@reduxjs/toolkit'

// Функция создания action 
    // type - тип action,
    // payload - данные для изменения состояния
export function createAction (type, payload) {
    store.dispatch({type: type, payload: payload})
}


const reducerDefault = {
    object: []
}

function reducer(state = reducerDefault, action) {
try {
    switch(action.type) {

        case "ACTION":
                return {...state, object: [...action.payload]}
        default: 
            return state
    }
} catch(error) {
    catchHandler(error, "reducer")
}
}


// Создание хранилища
// Используется в HOC <Provider> 
export const store = configureStore({
    reducer: {
        reducer: reducer
    }
});
