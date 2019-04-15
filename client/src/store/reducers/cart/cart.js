// Constants related to Cart.
import { 
    GET_CART_ITEMS
  } from '../../constants';

const initState = {
    //total price for items.
    total: 0,
    // products [ { id: 0, ingredients: [meat, cheese], price: 12 }, { ... } ]
    products :  []
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        // update the cart items found.
        // update the total.
        case GET_CART_ITEMS:
            //add all items cost to total.
            return {
                ...state,
                products: payload,
                total : payload.reduce((total, current) => total += current.total, 0)
            }
    default:
      return state
    }
  }