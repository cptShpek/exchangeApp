import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getCurrencyRates} from '../actions/actions';

class Exchange extends Component {
    state={
        value: 'b'
    }


    foo = (e) =>{
        this.setState({
            value: e.target.value
        })
        setTimeout(() => console.log(this.state.value), 0)
    }

    render() {
        return(
            <div className="container">
                <h1>Exchange Currency</h1>
                    <div className="container row valign-wrapper">
                        <div className="container col s6">
                            <label>Choose Currency</label>
                            <select value={this.state.value} onChange={this.foo}>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                            <input></input>
                        </div>
                        <span>=</span>
                        <div className="container col s6">
                            <label>Choose Currency</label>
                            <select value={this.state.value} onChange={this.foo}>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                            <input></input>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        rates: state.rates,
        currencies: state.currencies,
        base: state.base
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return{
        getCurrency: (base) => dispatch(getCurrencyRates(base))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)