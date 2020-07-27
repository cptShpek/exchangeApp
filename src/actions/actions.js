export const getCurrencyRates = (base) =>{
    return(dispatch) =>{
        if (!base) { 
            base = "EUR"
        }
        fetch('https://api.exchangeratesapi.io/latest?base=' + base)
            .then(res => {
                return res.json()
            })
            .then(res => {
                dispatch({type:'GET_CURRENCY_RATES', rates: res, base: base})
            })
    }
}

export const getExchangeCoefficient = (base, to) => {
    return(dispatch) => {
        fetch('https://api.exchangeratesapi.io/latest?symbols=' + to +'&base=' + base)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res.rates[to])
                dispatch({type: 'GET_EXCHANGE_COEFFICIENT', coefficient: res.rates[to]})
            })
    }
}