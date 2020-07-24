const initState = {
    base: 'EUR',
    currencies: {
        eur: 'EUR',
        usd: 'USD',
        gbp: 'GBP'
    },
    rates:{}
}

const exchangeReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_CURRENCY_RATES':
            return {
                ...state,
                rates: action.rates,
                base: action.base
            }
        
        default:
            return state
    }
}

export default exchangeReducer