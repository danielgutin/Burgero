import React from 'react'
import './Controls.css';

import { connect } from 'react-redux';
import { ingredientAction } from '../../../store/actions';


const Controls = (props) => {
  const { ingredients, total, burger } = props.system.controller;
  return (
    <div className='Controls'>
      <div className="Controls_products">
        {
          ingredients.map((ingredient, i) => (
            <div className='Controls_product' key={i}>
                <span className="Controls_product-minus" onClick={() => props.ingredientActionHandler('dec', ingredient.name, burger.length)}></span>
                <span className="Controls_product-plus" onClick={() => props.ingredientActionHandler('inc', ingredient.name, burger.length)}></span>
                <span className="Controls_product-amount">{ingredient.amount}</span>
                <span className="Controls_product-product">Price : {ingredient.price}</span>
            </div>
          ))
        }
      </div>
      <div className="Controls_total">
        <span className="Controls_total-price">{parseInt(total)}$</span>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    system : state.system
  }
}

const mapActionToDispatch = dispatch => {
  return {
    ingredientActionHandler : (action, ingredient, length) => dispatch(ingredientAction(action, ingredient, length))
  }
}

export default connect(mapStateToProps, mapActionToDispatch)(Controls);