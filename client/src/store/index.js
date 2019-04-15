import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';


// Store Creation.
const store = createStore(
    reducer,
     applyMiddleware(thunk)
);

export default store; 