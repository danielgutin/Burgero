import React from 'react';
import { connect } from 'react-redux';
import generatePdf from './generate_pdf';

import { Tooltip } from 'antd';

// Tooltip applies to unregistered users ( guests )
const OnlyRegistered = (props) => {
    const { username } = props.login.user;
    const { burger } = props.system.controller;  

    return (
        <React.Fragment>
            {
                props.isGuest 
                ? (
                    <Tooltip className='registerd' placement='left' title={'Only Registered Users'}>
                        {props.children}
                    </Tooltip>
                )
                : (
                    <div onClick={() => generatePdf(username, burger)}>
                        {props.children}
                    </div>
                )
            }
            
        </React.Fragment>
  )
}


const mapStateToProps = state => {
    return {
        isGuest : state.login.isGuest,
        login : state.login,
        system: state.system
    }
}
  
export default connect(mapStateToProps)(OnlyRegistered);