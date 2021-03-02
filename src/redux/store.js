import {
    createStore
} from 'redux';
import reducer from './reducer';

//TODO: Change this to something else or else anybody will be able to read our data, it can't be window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;