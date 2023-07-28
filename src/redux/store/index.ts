import {applyMiddleware, combineReducers, createStore} from "redux";

import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../saga";
import {themeReducer} from "./themeReducer";
import {modalReducer} from "../../shared/PhotoModalWindow/store/modalReducer";
import {profileReducer} from "./profileReducer";
import {fetchReducer} from "./lastFetchReducer";
import {signReducer} from "./signReducer";
import { userReducer } from "./userReducer";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    theme: themeReducer,
    modal: modalReducer,
    profile:profileReducer,
    fetch:fetchReducer,
    sign:signReducer,
    user:userReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type State = ReturnType<typeof rootReducer>

sagaMiddleware.run(rootWatcher)