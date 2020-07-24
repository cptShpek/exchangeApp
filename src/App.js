import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Home from './components/Home';
import Currency from './components/Currency';
import Exchange from './components/Exchange';
import Navbar from './components/Navbar';
import {getCurrencyRates} from './actions/actions';


class App extends Component {
  state = {}

  componentDidMount() {
    this.props.getCurrency('EUR')
    this.setState({
      currencies: this.props.currencies
    })
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/currency' component={Currency} />
            <Route path='/exchange' component={Exchange} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      currencies: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getCurrency: (base) => dispatch(getCurrencyRates(base))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
