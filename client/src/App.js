import React, { Component } from 'react';

import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login/Login';
import System from './components/System/System';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Loader from './components/Hoc/Loader/Loader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/about' exact component={About}/>
          <Route path='/cart' exact component={Cart}/>
          <Route path="/system" exact render={() => (
            !this.props.login.isLogged ? (
              <Redirect to="/"/>
            ) : (
              <System />
            )
          )}/>
          <Route component={NotFoundPage} />
        </Switch>
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login : state.login
  }
}

export default withRouter(connect(mapStateToProps)(App));
