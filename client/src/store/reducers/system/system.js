// Constants related to system.
import { 
  TOGGLE_SIDENAV,
  INGREDIENT_ACTION,
  CLEAR_DISPLAY,
  TOGGLE_LOADER
} from '../../constants';

// System piece of state.
const initState = {
    //Sidenave status 
    sidenav : {
        isDisplayed: false
    },
    // Loader status. ( displayed with true )
    loader : false,
    //list of ingredients details. ( type, amount, price )
    controller : {
      ingredients : [
        {
          name : 'meat',
          amount : 0,
          price : 5
        },
        {
          name : 'cheese',
          amount : 0,
          price : 3
        },
        {
          name : 'tometo',
          amount : 0,
          price : 1
        },
        {
          name : 'cucumber',
          amount : 0,
          price : 1.7
        }
      ],
      //total burger price.
      total : 0,
      //what the burger contains. ex. [ 'cheese', 'meat' ]
      burger : []
    }
}

export default (state = initState, { type, payload }) => {
    switch (type) {
    // Toggle SideNav.
    case TOGGLE_SIDENAV:
      return {
        ...state,
        sidenav : Object.assign({}, {
          isDisplayed : state.sidenav.isDisplayed ? false : true
        })
      }
    
    // action to ingredients controller.
    // recieve 2 args :
    // 1. action - inc / dec 
    // 2. ingredient - the type of ingredient action related to.
    case INGREDIENT_ACTION:
      //creating ingredients Obj Copy.
      let ingredientsController = Object.assign({}, state.controller);
      let ingredientsUpdate = ingredientsController.ingredients;
      let ingredientPrice;

      //check if action is INC
      if ( payload.action === 'inc') {
        //inc the amount of the selected ingredient.
        //find the ingredient Price and add it to the total.
        ingredientsUpdate.forEach((ing) => {
          if (ing.name === payload.ingredient ) {
            ing.amount += 1;
            ingredientPrice = ing.price; 
            ingredientsController.total += ingredientPrice;
            ingredientsController.burger.push(ing.name);
          }
        })

        //inc the total Price by the ingredient price.
        return {
          ...state,
          controller : ingredientsController
        }
      }

      //check if action is DEC
      else {
        //dec the amount of the selected ingredient( if higher than 0 ).
        //find the ingredient Price and dec it from total.
        ingredientsUpdate.forEach((ing) => {
          if (ing.name === payload.ingredient ) {
            if ( ing.amount > 0 ) {
              ing.amount -= 1;
              ingredientPrice = ing.price; 
              ingredientsController.total -= ingredientPrice;

              // Find ingredient by index and remove from burger.
              let foundIngredientIndex = ingredientsController.burger.indexOf(ing.name);
              ingredientsController.burger.splice(foundIngredientIndex, 1);
              //if price go under 0, make it zero ( just for insurance);
              if(ingredientsController.total < 0) ingredientsController.total = 0;
            //less than 0, return state.
            } else {
              return {
                ...state
              }
            }
          }
        })
        //Dec the total Price by the ingredient price.
        return {
          ...state,
          controller : ingredientsController
        }
      }

      //clear controller & burger Data.
      case CLEAR_DISPLAY:
        // updated ING list.
        return {
          ...state,
          controller : Object.assign({}, {
            burger : [],
            total : 0,
            ingredients : state.controller.ingredients.map(( ing ) => { 
              ing.amount = 0
              return ing;
            })
          })
        }

        case TOGGLE_LOADER:
          return {
            ...state,
            loader : !state.loader
          }
    // Default, Return state.
    default:
      return state
    }
  }