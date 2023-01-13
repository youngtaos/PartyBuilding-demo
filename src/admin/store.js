import { legacy_createStore as createStore, combineReducers } from "redux";
import { HomeMangeReducer } from './pages/Home/Store/reducer';

const reducer = combineReducers({
    homeManagement: HomeMangeReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;