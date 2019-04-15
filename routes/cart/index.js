const express = require('express');
const router = express.Router();
// cart controller
const cartController = require('../../controllers/cart');

// ----- Cart Routes
// Get all Cart items by userID.
router.get('/cart_items', cartController.getCartItems);
// change the amounts of cartItem.
router.post('/toggle_amount', cartController.toggleAmount);
// remove item from cart by its id.
router.post('/remove_item', cartController.removeCartItem);


module.exports = router;
