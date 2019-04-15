import React, { Component } from 'react';
import './System.css';


import { withRouter } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hamburger from './Hamburger/Hamburger';
import Controls from './Controls/Controls';



export default  withRouter(class System extends Component {
  render() {
    return (
      <div className='System'>
        <Hamburger />
        <Controls />
        <Menu />
      </div>
    )
  }
})
