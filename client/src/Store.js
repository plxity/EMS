import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};

const Store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default Store;
