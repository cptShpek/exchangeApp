import React, {Component} from 'react';
import {connect} from 'react-redux';

import utils from './utils/utils';
import {getCurrencyRates} from '../actions/actions';

class Currency extends Component {
    state = {
        ratesTable: null
    }

    componentDidMount() {
        utils.chekState(this.props.ratesObj.rates, this.props.history)
        if (utils.chekState(this.props.ratesObj.rates, this.props.history)) {
            this.getRatesTable()
        }
    }

    getCurrencyRates = (base) => {
        new Promise(async (res) => {
            await this.props.getCurrencyRates(base)
            res()
        }).then(() =>{
            this.getRatesTable()
        })
        
    }

    getRatesTable = () => {
        var ratesTable = [];
        var rates = this.props.ratesObj.rates;

        for (let currency in rates) {
            ratesTable.push(
                <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rates[currency].toFixed(2)}</td>
                </tr>
            )
        }

        this.setState({
            ratesTable
        })
    }

    render() {
        const {eur, usd, gbp} = this.props.currencies;
        const {ratesTable, buttonsList} = this.state;
        const base = this.props.base;

        return(
            <div className="container row">
                <h1>Currency Rates</h1>
                <div className="center left">
                    <button onClick={() =>this.getCurrencyRates('EUR')} className="btn blue lighten-2 small">{eur}</button>
                    <button onClick={() =>this.getCurrencyRates('USD')}  className="btn blue lighten-2 small">{usd}</button>
                    <button onClick={() =>this.getCurrencyRates('GBP')}  className="btn blue lighten-2 small">{gbp}</button>
                </div>
                {ratesTable ? (
                    <table className="striped z-depth-4">
                    <thead>
                        <tr>
                            <th>Currensy</th>
                            <th>{base}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ratesTable}
                    </tbody>
                </table>
                ) : (<div className="container waiting">Waiting for currencies rates, please wait...</div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        ratesObj: state.rates,
        currencies: state.currencies,
        base: state.base

    }
}
  
const mapDispatchToProps = (dispatch) => {
    return{
        getCurrencyRates: (base) => dispatch(getCurrencyRates(base))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency);