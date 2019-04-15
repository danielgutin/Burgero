import React from 'react'
import { connect }  from 'react-redux';

import IngItem from './IngItem/IngItem';

const Burger = (props) => {
    const { total, burger } = props.system.controller;

  return (
    <div id='Burger'>
        <div className="Hamburger_container-top"></div>
            <div className="Hamburger_container-content">
                { total > 0 
                ? burger.map((ing, i) => <IngItem key={i} type={ing}/>)
                : <div className='Hamburger_container-empty'>No Ingredients Added yet.</div>
                }
            </div>
        <div className="Hamburger_container-bottom"></div>
    </div>
  )
}


const mapStateToProps = state => {
    return {
      system : state.system
    }
  }

  
export default connect(mapStateToProps)(Burger);