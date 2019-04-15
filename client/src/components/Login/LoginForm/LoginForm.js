import React from 'react'
import './LoginForm.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { inputChange, formMode, resetForm, loginAsGuest, loginUser } from '../../../store/actions';


const LoginForm = (props) => {

  const { username, password } = props.login.loginForm;
  return (
    <div className='LoginForm'>
        <p className='LoginForm_para'>Please login / Continue as Guest</p>
        <p className='LoginForm_para'>Login as guest disable many features.</p>
        <input 
          type="text" 
          placeholder='Email' 
          className="LoginForm_input LoginForm_input-username"
          value={props.login.loginForm.username}
          onChange = { (e) =>  props.inputChangeHandler('loginForm', 'username', e.target.value)}
        />
        <input 
          type="password" 
          placeholder='Password' 
          className="LoginForm_input LoginForm_input-password"
          value={props.login.loginForm.password}
          onChange = { (e) =>  props.inputChangeHandler('loginForm', 'password', e.target.value)}
        />
        <button 
          className="button LoginForm_button-login" 
          onClick={() => props.loginUserHandler(username, password, props.history)}>Login</button>
        <button 
          className="button LoginForm_button-guest" 
          onClick={() => {
            props.formModeHandler('signup');
            props.resetFormHandler('loginForm');
          }}>SignUp</button>
        <button 
          className="button LoginForm_button-guest"
          onClick = {() => {
            props.loginAsGuestHandler();
            props.history.push("/system");
          }}
          >Continue As Guest</button>
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
    formModeHandler : (type) => dispatch(formMode(type)),
    inputChangeHandler : (form, field, content) => dispatch(inputChange(form, field, content)),
    resetFormHandler : (form) => dispatch(resetForm(form)),
    loginAsGuestHandler : () => dispatch(loginAsGuest()),
    loginUserHandler : (username, password, histroy) => dispatch(loginUser(username, password, histroy))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));