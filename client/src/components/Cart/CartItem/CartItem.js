import React from 'react';
import { connect } from 'react-redux';
import { toggleBurgerAmount, removeCartItem } from '../../../store/actions';
import './CartItem.css';


import BurgerCart from '../BurgerCart/BurgerCart';

const CartItem = (props) => {

// amount: 1
// burger: (5) ["meat", "cheese", "tometo", "cucumber", "tometo"]
// description: {meat: 1, cheese: 1, tometo: 2, cucumber: 1}
// price: 11.7
// total: 11.7
// userID: "5c801a49b60bd6146878adbb"
// __v: 0
// _id: "5c814b8fb14af419a8e0c16c"

  const { product } = props;
  return (
    <div className='CartItem'>
        <div className="CartItem_burger">
            <BurgerCart ingredients={product.burger} />
        </div>
        <div className="CartItem_desc">
            <p>Contains : </p>
            {
                product.description.map((item, i) => <li key={i}>{item[0]} X {item[1]}</li>)
            }
        </div>
        <div className="CartItem_price">{parseFloat(Math.round(product.price * 100) / 100).toFixed(2)}$</div>
        <div className="CartItem_actions">
            Amount : {product.amount}
            <div className="CartItem_actions-buttons">
                <button 
                    className='CartItem_actions-buttons-plus'
                    onClick={() => props.toggleBurgerAmountHandler(product._id, 'plus', product.userID)}>&#43;</button>
                <button 
                    className='CartItem_actions-buttons-minus'
                    onClick={() => props.toggleBurgerAmountHandler(product._id, 'minus', product.userID)}>&#8722;</button>
            </div>
            <button 
                className='CartItem_actions-buttons-remove'
                onClick={() => props.removeCartItemHandler(product._id, product.userID)}
            >Remove</button>
        </div>
        <div className="CartItem_total">
            {parseFloat(Math.round(product.amount * product.price * 100) / 100).toFixed(2)}$
        </div>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      cart : state.cart
    }
  }

const mapActionToDispatch = dispatch => {
    return {
        toggleBurgerAmountHandler : (id, type, userID) => dispatch(toggleBurgerAmount(id, type, userID)),
        removeCartItemHandler : (id, userID) => dispatch(removeCartItem(id, userID))
    }
  }
  
  export default connect(mapStateToProps, mapActionToDispatch)(CartItem);