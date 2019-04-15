import React from 'react';
import './Hamburger.css';

import { connect }  from 'react-redux';
import { toggleSideNav, clearAction, addToCart } from '../../../store/actions';


// Components 
import Burger from './Burger';
import OnlyRegistered from '../Menu/OnlyRegistered';

const Hamburger = (props) => {
  const { burger, total, ingredients } = props.system.controller;
  const { id } = props.login.user;
  const { isGuest } = props.login;
  return (
    <div className='Hamburger'>
        <div className="Hamburger_container">
          <Burger />
        </div>
        <div className="Hamburger_buttons">
        {
          !isGuest 
            ? (
              <button 
                className='button Hamburger_buttons-button'
                onClick={() => props.addToCartHandler(id, burger, total, ingredients)} 
                >Add To Cart
              </button>
              )
            : null
        }
          <button className="button Hamburger_buttons-button" onClick={() => props.clearActionHandler()}>Clear</button>
          <button className="button Hamburger_buttons-button" onClick={() => props.toggleSideNavHandler()}>Menu</button>
        </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    system : state.system,
    login : state.login
  }
}

const mapActionToDispatch = dispatch => {
  return {
    toggleSideNavHandler : () => dispatch(toggleSideNav()),
    clearActionHandler : () => dispatch(clearAction()),
    addToCartHandler : (id, burger, total, ingredients) => dispatch(addToCart(id, burger, total, ingredients))
  }
}

export default connect(mapStateToProps, mapActionToDispatch)(Hamburger);