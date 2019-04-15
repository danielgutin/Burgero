// Cool Alerts.
import swal from 'sweetalert';
import axios from 'axios';

// Constants
import { 
    FORM_MODE_TOGGLE,
    FORM_INPUT_CHANGE,
    RESET_FORM,
    LOGIN_AS_GUEST,
    SAVE_USER_DETAILS,
    SUCCESSFUL_LOGIN,
    LOGOUT_FROM_SYSTEM,
    TOGGLE_SIDENAV,
    INGREDIENT_ACTION,
    CLEAR_DISPLAY,
    TOGGLE_LOADER,
    GET_CART_ITEMS
} from '../constants';


// ----------------- Login Related Actions ------------------- //
//determine which Form to display SignUp / Login 
export const formMode = (mode) => {
    return {
        type: FORM_MODE_TOGGLE,
        payload : mode
    }
}

//Handle Form Input change, recieve 3 variables.
//1. form - signupForm / loginForm
//2. field - which field to change ( username / password / email )
//3. content - the actual content of the field.
export const inputChange = (form, field, content) => {
    return {
        type: FORM_INPUT_CHANGE,
        payload : {
            form,
            field,
            content
        }
    }
}

//Reset selected form input fields. ( signupForm / loginForm )
export const resetForm = (form) => {
    return {
        type: RESET_FORM,
        payload : form
    }
}

// Login As Guest.
export const loginAsGuest = () => {
    return {
        type: LOGIN_AS_GUEST
    }
}


// Register user to the system.
// send req to the server side, if success toggle to login screen
// and send successful Msg, else send Fail Msg with the cause.
export const registerUser = (username, password, email) => {
    return dispatch => {
        
        // make sure the fields correctly filled.
        if (!username || !password || !email) {
            swal("Failed Creating User", "one or more field is missing", "error");
            return {type: 'ERROR_DO_NOTHING'}
        }

        // Validate Truthy Email Address 
        axios.post('/login/validate_email', {
            email
          })
          //On Successful registration   
          .then(function () {
            // POST req to the server to register new user.
            axios.post('/login/newuser', {
                username,
                password,
                email
            })
            //On Successful registration   
            .then(function () {
                //   success Msg.
                swal("User Created Successfully", "You can now login to the System", "success");
                // switch to login Form.
                dispatch({type : FORM_MODE_TOGGLE, payload: 'login'});
                // Reset the Signup Form fields.
                dispatch({type : RESET_FORM, payload: 'signupForm'});
            })
            //on falure.
            .catch(function (err) {
                swal("Failed Creating User", "Failed to create user, Email Address Already Exist", "error");
            });
          })
          //on falure.
          .catch(function () {
            swal("Failed Creating User", "Failed to create user, Email Address Does Not exist !", "error");
          });
    }
}


// authenticating the user, if succeded change to system page, and reset fields.
// if failed notify the user about it.
export const loginUser = (username, password, histroy) => {
    return dispatch => {
        // POST req to the server to register new user.
        axios.post('/login/user', {
            username,
            password
          })
          //On Successful registration   
          .then(function (res) {
            // switch to login Form.
            dispatch({type : SUCCESSFUL_LOGIN});
            // Reset the Signup Form fields.
            dispatch({type : RESET_FORM, payload: 'loginForm'});
            // save the user details.
            dispatch({type : SAVE_USER_DETAILS, payload : res.data})
            //move to System Screen.
            histroy.push("/system");
          })
          //on falure.
          .catch(function () {
            swal("Login Failed", "Failed to Login, Wrong Credentials", "error");
          });
    }
}

//logout from the system.
export const logout = (history) => {
    //back to the login screen
    history.push('/')
    return {
        type: LOGOUT_FROM_SYSTEM
    }
}



// ----------------- System Related Actions ------------------- //
// Toggle SideNav Display
export const toggleSideNav = () => {
    return {
        type: TOGGLE_SIDENAV
    }
}

// Add ingridient, 5 ingredients is the maximum allowed.
export const ingredientAction = (action , ingredient, amount) => {
    if (amount > 4 && action === 'inc') {
        swal("Dont exaggerate", "5 Additions is more than enough ! Jeez ! ", "warning");
        return {
            type: 'DO_NOTHING'
        }
    }

    return {
        type: INGREDIENT_ACTION,
        payload: {
            ingredient,
            action
        }
    }
}

// Clearing the Display and the controller.
export const clearAction = () => {
    return {
        type: CLEAR_DISPLAY
    }
}


// add to cart function.
// 1. add new hamburger to the cart
// 2. clear the hamburger display.
// 3. notify the user that Hamburger added to Cart.
export const addToCart = (id, burger, total, ingredients) => {
    return dispatch => {
        // display loader.
        dispatch({type: TOGGLE_LOADER});
        //adding new hamburger to cart
        axios.post('/system/addtocart', {
            id,
            burger,
            total,
            ingredients
          })
          //On Successful registration   
          .then(function (res) {
            // turn the loader off.
            // =============== Missing : add to the total price of burgers.
            setTimeout(() => {
                dispatch({type: TOGGLE_LOADER});
                swal("New Burger Created", "Successfully Created new Burger, Go to Cart section to see the full list", "success");
            },1500);
            // Clearing the display
            dispatch({type: CLEAR_DISPLAY});
          })
          //on falure.
          .catch(function () {
            // turn the loader off.
            //for the example of the loader added delay for 1.5s.
                dispatch({type: TOGGLE_LOADER});
                swal("Failed To create Burger", "Failed to create burger, Please Try again", "error");
          });
    }
}



// ------------------ Cart Related Functions ----------------------- //
// Get cartItems related to specific user.
export const getCartItems = (userID) => {
    return dispatch => {
        axios.get('/cart/cart_items?userID=' + userID)
        .then((res) => {
            dispatch({type:GET_CART_ITEMS, payload: res.data})
        })
        .catch((err) => {
            swal("Cart Error", "Failed to find any cart items related to this user.", "error");
        })
    }
}


// Change the amount of burgers ordered in CartItem.
//type value - plus / minus (increasing / decreasing the amount )
export const toggleBurgerAmount = (id, type, userID) => {
    return dispatch => {
        axios.post('/cart/toggle_amount', {
            id,
            type,
            userID
        })
        .then((res) => {
            swal("Cart Change", "Succesfully changed the amount", "success");
            dispatch({type:GET_CART_ITEMS, payload: res.data})
        })
        .catch((err) => {
            swal("Cart Error", "Failed change the amount of item, please try again", "error");
        })
    }
}

// remove cartItem by its id.
//user id later userd to retrive all cartItems for specific user.
export const removeCartItem = (id, userID) => {
    return dispatch => {
        axios.post('/cart/remove_item', {
            id,
            userID
        })
        .then((res) => {
            swal("Item Remove", "Succesfully removed cart item", "success");
            dispatch({type:GET_CART_ITEMS, payload: res.data})
        })
        .catch((err) => {
            swal("Cart Error", "Failed remove the item, please try again", "error");
        })
    }
}


// --------------------------- Mail Related Functions ------------------------ //
export const sendReciept = (name, email) => {
    return dispatch => {
        axios.post('/mail/send_reciept', {
            name,
            email
        })
        .then((res) => {
            swal("Reciept Sent", "Succesfully sent Reciept", "success");
        })
        .catch((err) => {
            swal("Reciept Error", "Failed to sent Reciept, please try again", "error");
        })
    }
}
