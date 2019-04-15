// Constants
import { 
    FORM_MODE_TOGGLE,
    FORM_INPUT_CHANGE,
    RESET_FORM,
    LOGIN_AS_GUEST,
    SAVE_USER_DETAILS,
    SUCCESSFUL_LOGIN,
    LOGOUT_FROM_SYSTEM
} from '../../constants';


const initState = {
    //login form input fields controller.
    loginForm : {
        username : '',
        password : ''
    },
    //signup form input fields controller.
    signupForm : {
        username: '',
        password: '',
        email : ''
    },
    //detail about the connected user used for DB mapping & reciept send.
    user : {
        email : '',
        id : '',
        username: ''
    },
    //check if user is logged to system.
    isLogged : false,
    //form mode - Login (by default) / Signup
    formMode : 'login',
    //if loggedds in as guest true, if authenticated user than false.
    isGuest : true
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        // Toggle the FormMode ( login / Register )
        case FORM_MODE_TOGGLE:
            return {
                ...state,
                formMode : payload
            }
    
        //Handle form input. 
        case FORM_INPUT_CHANGE:
            //Updating the form content ( register / login )
            const { field, content, form } = payload;
            //return new state.
            return {
                ...state,
                [form] : Object.assign( state[form] , {
                    [field] : content
                })
            }
            

        //Reset Form fields by type recieved ( signupForm / loginForm )
        case RESET_FORM:
            return {
                ...state,
                [form] : Object.assign( state[payload] , {
                    username : '',
                    password : '',
                    email : ''
                })
            }

        // Login to App as Guest.
        case LOGIN_AS_GUEST:
            return {
                ...state,
                isLogged: true                
            }

        // Successfull authentication to the System.
        case SUCCESSFUL_LOGIN:
            return {
                ...state,
                isLogged: true,
                isGuest : false
            }

        // log out from the system
        case LOGOUT_FROM_SYSTEM:
            return {
                ...state,
                isLogged: false,
                isGuest : true
            }

        case SAVE_USER_DETAILS:
            return {
                ...state,
                user : Object.assign({}, {
                    id: payload.id,
                    email : payload.email,
                    username : payload.username
                })
            }   
      default:
        return state
      }
  }