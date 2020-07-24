export const getCurrencyRates = (base) =>{
    return(dispatch) =>{
        if (!base) { base = "EUR"}
        fetch('https://api.exchangeratesapi.io/latest?based=' + base)
            .then(res => {
                return res.json()
            })
            .then(res => {
                dispatch({type:'GET_CURRENCY_RATES', rates: res, base})
                console.log('asdsa')
            })
    }
}
