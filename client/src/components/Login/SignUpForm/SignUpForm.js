import React from 'react'

import { connect } from 'react-redux';
import { formMode, inputChange, resetForm, registerUser } from '../../../store/actions';


const SignUpForm = (props) => {

  const {username, password, email } = props.login.signupForm;

  return (
    <div className='LoginForm'>
        <p className='LoginForm_para'>All fields Are Required</p>
        <input 
          type="text" 
          placeholder='Username' 
          className="LoginForm_input LoginForm_input-username"
          value={props.login.signupForm.username}
          onChange = { (e) =>  props.inputChangeHandler('signupForm', 'username', e.target.value)}
        />

        <input 
          type="password" 
          placeholder='Password' 
          className="LoginForm_input LoginForm_input-password"
          value={props.login.signupForm.password}
          onChange = { (e) =>  props.inputChangeHandler('signupForm', 'password', e.target.value)}
          />

        <input 
          type="email"
          placeholder='email' 
          className="LoginForm_input LoginForm_input-password"
          value={props.login.signupForm.email}
          onChange = { (e) =>  props.inputChangeHandler('signupForm', 'email', e.target.value)}
          />

        <button 
          className="button LoginForm_button-login"
          onClick= {() => props.registerUserHandler(username, password, email)}
          >Register</button>
        <button 
          className="button LoginForm_button-login" 
          onClick= {
            () => {
              props.formModeHandler('login');
              props.resetFormHandler('signupForm');
            }}>Already Have An Account ?</button>
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
    registerUserHandler : (username, password, email) => dispatch(registerUser(username, password, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)