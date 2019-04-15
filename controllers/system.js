const cartModel = require('../models/cart');

module.exports = systemController = {
    // ----------- New burger Creation -------------- //
    newBurger : async (req, res) => {
        // { id: '5c801a49b60bd6146878adbb',
        // burger: [ 'meat', 'cheese', 'tometo', 'cucumber', 'tometo' ],
        // total: 11.7,
        const cartItem = new cartModel({
            userID : req.body.id,
            burger : req.body.burger,
            price : req.body.total,
            description : '',
            total : req.body.total
        })

        //used to find the amounts of ingredients, for description purposes.
        amounts = {};
        req.body.burger.forEach((ing) => {
            if (amounts[ing] === undefined ) {
                amounts[ing] = 1;
            }else {
                amounts[ing] += 1;
            }
        })
        
        // Map the data to conviniet list.
        cartItem.description = Object.entries(amounts).map((item) => {
            for(let i=0; i<item[1]; i++) {
                return [ item[0], item[1] ]
            }
        })

        // Save record To DB.
        cartItem.save()
            .then(() => res.status(200).send('Created CartItem successfully'))
            .catch((err) => res.status(400).send('failed to create Cart Item'));
    }
}
