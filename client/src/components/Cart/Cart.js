import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { sendReciept } from '../../store/actions';

import './Cart.css';

import CartItem from './CartItem/CartItem';

const Cart = (props) => {
    const { products, total } = props.cart;
    const { email, username } = props.login.user;
    const returnToSystem = () => {
        props.history.push('/system');
    }

  return (
    <div className='Cart'>
        <div className="Cart_cartList">
            <div className="Cart_content">
                <h2 className="Cart_content-head">Currently in your shopping Cart</h2>
                <p className='Cart_content-total'>Total :  {parseFloat(Math.round(total * 100) / 100).toFixed(2)}$</p>
                <button className='Cart_content-checkout' onClick={() => props.sendRecieptHandler(username, email)}>Checkout</button>
                <button className='Cart_content-return' onClick={() => returnToSystem()}>Return</button>
                <div className="Cart_content-menu">
                    <span>Burger</span>
                    <span>Description</span>
                    <span>Price</span>
                    <span>Amount / Actions</span>                
                    <span>Total</span>
                </div>
                <div className="Cart_content-items">
                    {
                        products.map((product, i) => <CartItem key={i} product={product}/>)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}


const mapStateToProps = state => {
    return {
        cart : state.cart,
        login : state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendRecieptHandler : (username, email) => dispatch(sendReciept(username, email))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));