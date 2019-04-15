//React & related.
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect }  from 'react-redux';
import { toggleSideNav, logout, getCartItems } from '../../../store/actions';

// Assets.
import logo from '../../../assets/logo.png';
import './Menu.css';

//Components
import { Drawer } from 'antd';
import SocialNav from './SocialMenu/SocialMenu';
import OnlyRegistered from './OnlyRegistered';

class Menu extends React.Component {
  render() {
    
    const { isLogged, isGuest } = this.props.login;

    return (
      <div>
        <Drawer
          title="Burgero Menu"
          placement="left"
          closable={false}
          onClose={this.props.toggleSideNavHandler}
          visible={this.props.system.sidenav.isDisplayed}>
          <div className="Menu_content">
                <img src={logo} alt="Burgero"/>
              <Link 
                to={isGuest ? '/system' : '/cart'}
                onClick={() => this.props.getCartItemsHandler(this.props.userID)}>
                <OnlyRegistered>
                  <button className={isGuest ? 'button guest' : 'button'} >Cart</button>
                </OnlyRegistered>
              </Link>
              <OnlyRegistered>
                <button className={isGuest ? 'button generate_pdf guest' : 'button generate_pdf'}>Generate PDF</button>
              </OnlyRegistered>
              <Link to='/about'>
                <button className='button'>About</button>  
              </Link>
                <button 
                  className='button' 
                  onClick={() => this.props.logoutHandler(this.props.history)}>{isLogged ? 'Logout' : 'Register'}</button>  
              <SocialNav />
          </div>
        </Drawer>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    system : state.system,
    login : state.login,
    userID : state.login.user.id
  }
}

const mapActionToDispatch = dispatch => {
  return {
    toggleSideNavHandler : () => dispatch(toggleSideNav()),
    logoutHandler : (history) => dispatch(logout(history)),
    getCartItemsHandler : (userID) => dispatch(getCartItems(userID))
  }
}


export default withRouter(connect(mapStateToProps, mapActionToDispatch)(Menu));
