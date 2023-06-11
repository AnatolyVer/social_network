import {applyMiddleware, combineReducers, createStore} from "redux";

import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../saga";
import {themeReducer} from "./themeReducer";
import {modalReducer} from "../../shared/PhotoModalWindow/store/modalReducer";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    theme: themeReducer,
    modal: modalReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type State = ReturnType<typeof rootReducer>

sagaMiddleware.run(rootWatcher)

