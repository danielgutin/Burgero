import React from 'react'
import './Login.css';

import { connect } from 'react-redux';
import { formMode } from '../../store/actions';

import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

const Login = (props) => {
  return (
    <div className='Login'>
        <div className='Login-form'>
          {
            props.login.formMode === 'login' 
              ? <LoginForm />
              : <SignUpForm />
          }
        </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    login : state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formModeHandler : (type) => dispatch(formMode(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)