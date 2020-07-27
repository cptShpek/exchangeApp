import React, {Component} from 'react';
import {connect} from 'react-redux';

import utils from './utils/utils';
import {getCurrencyRates, getExchangeCoefficient} from '../actions/actions';

class Exchange extends Component {
    state={
        baseCurrency: 'USD',
        toCurrency: 'GBP',
        baseValue: 0,
        toValue: 0,
        optionsList: []
    }

    componentDidMount() {
        if (utils.chekState(this.props.ratesObj.rates, this.props.history)) {
            this.getOptions(this.props.ratesObj.rates)
            this.props.getExchangeCoefficient('USD', 'GBP')
        }
    }
    
    getOptions = (rates) => {
        var optionsList = Object.keys(rates).map(item =>{
            return <option key={item} value={item}>{item}</option>
        })
        this.setState({
            optionsList
        })
    }

    getExchangeCoefficient = (e) => {
        const {baseCurrency, toCurrency} = this.state;

        switch (e.target.id) {
            case 'baseCurrency':
                this.setState({
                    baseCurrency: e.target.value,
                })
                this.props.getExchangeCoefficient(e.target.value, toCurrency)
                this.cleanValues()
                return
            case 'toCurrency':
                this.setState({
                    toCurrency: e.target.value
                })
                this.props.getExchangeCoefficient(baseCurrency, e.target.value)
                this.cleanValues()
                return
            default :
                return
        }
    }

    handleValueChange = (e) => {
        switch (e.target.id) {
            case 'baseValue':
                this.setState({
                    baseValue: e.target.value,
                    toValue: (e.target.value * this.props.coefficient).toFixed(3)
                })
                return
            case 'toValue':
                this.setState({
                    toValue: e.target.value,
                    baseValue: (e.target.value / this.props.coefficient).toFixed(3)
                })
                return
            default :
                return
        }
    }

    cleanValues = () => {
        this.setState({
            toValue: 0,
            baseValue: 0
        })
    }

    render() {
        const {optionsList, baseValue, toValue} = this.state;

        return(
            <div className="container">
                <h1>Exchange Currency</h1>
                    <div className="container row valign-wrapper">
                        <div className="container col s6">
                            <label>Choose Currency</label>
                            <select id="baseCurrency" value={this.state.baseCurrency} onChange={this.getExchangeCoefficient}>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                            </select>
                            <input id="baseValue" value={baseValue} onChange={this.handleValueChange}></input>
                        </div>
                        <span>=</span>
                        <div className="container col s6">
                            <label>Choose Currency</label>
                            <select id="toCurrency" value={this.state.toCurrency} onChange={this.getExchangeCoefficient}>
                                {optionsList}
                            </select>
                            <input id="toValue" value={toValue} onChange={this.handleValueChange}></input>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        ratesObj: state.rates,
        currencies: state.currencies,
        base: state.base,
        coefficient: state.coefficient
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return{
        getCurrency: (base) => dispatch(getCurrencyRates(base)),
        getExchangeCoefficient: (base, to) => dispatch(getExchangeCoefficient(base, to))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)