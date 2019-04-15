import { combineReducers } from 'redux';
import login from './login/login';
import system from './system/system';
import cart from './cart/cart';

export default combineReducers({
    login,
    system,
    cart
})