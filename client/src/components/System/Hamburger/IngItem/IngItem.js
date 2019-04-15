import React from 'react'
import './IngItem.css';

export default function IngItem({ type }) {

    let burgerStyle;

    switch(type) {
        case 'meat':
            burgerStyle = {
                backgroundColor: '#633200',
                height: '3rem'
            }
        break;

        case 'cheese':
        burgerStyle = {
            backgroundColor: '#FFDA01',
            height: '1.5rem'
        }
         break;

        case 'tometo':
        burgerStyle = {
            backgroundColor: '#FB3434',
            height: '1.5rem'
        }
        break; 

        case 'cucumber':
        burgerStyle = {
            backgroundColor: '#84D644',
            height: '1rem'
        }
        break;
    }



  return (
    <div style={burgerStyle}  className='IngItem'>
    </div>
  )
}
