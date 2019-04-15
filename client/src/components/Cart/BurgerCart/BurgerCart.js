import React from 'react';
import './BurgerCart.css';

import IngItem from '../../System/Hamburger/IngItem/IngItem';

export default (props) => {
  return (
    <div className="BurgerCart">
        <div className="Hamburger_container-top"></div>
            <div className="Hamburger_container-content">
                {               
                    props.ingredients.map((ing, i) => <IngItem key={i} type={ing}/>)
                }
            </div>
            <div className="Hamburger_container-bottom"></div>
    </div>
  )
}

  
