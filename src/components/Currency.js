import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getCurrencyRates} from '../actions/actions';

class Currency extends Component {
    state = {
        ratesTable: null
    }

    componentDidMount() {
        this.getRatesTable()
    }

    getCurrencyRates = (base) => {
        new Promise(async (res) => {
            
            res(await this.props.getCurrency(base))
        }).then(() =>{
            this.getRatesTable()
        })
        
    }

    getRatesTable = () => {
        var ratesTable = [];
        var rates = this.props.rates.rates;

        for (let currency in rates) {
            ratesTable.push(
                <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rates[currency]}</td>
                </tr>
            )
        }

        this.setState({
            ratesTable
        })
    }

    render() {
        const {eur, usd, gbp} = this.props.currencies;
        const {ratesTable} = this.state;
        const base = this.props.base;

        return(
            <div className="container row">
                <h1>Currency Rates</h1>
                <div className="center left">
                    <button onClick={() =>this.getCurrencyRates('EUR')} className="btn blue lighten-2 small">{eur}</button>
                    <button onClick={() =>this.getCurrencyRates('USD')}  className="btn blue lighten-2 small">{usd}</button>
                    <button onClick={() =>this.getCurrencyRates('GPB')}  className="btn blue lighten-2 small">{gbp}</button>
                    <button onClick={() => console.log(this.props.rates)}>click</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Currency);