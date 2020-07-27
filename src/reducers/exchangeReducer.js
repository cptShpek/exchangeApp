const initState = {
    base: 'EUR',
    currencies: {
        eur: 'EUR',
        usd: 'USD',
        gbp: 'GBP'
    },
    rates:{},
    coefficient: 1.17
}

const exchangeReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_CURRENCY_RATES':
            return {
                ...state,
                rates: action.rates,
                base: action.base
            }

        case 'GET_EXCHANGE_COEFFICIENT':
            return {
                ...state,
                coefficient: action.coefficient
            }
        
        default:
            return state
    }
}

export default exchangeReducer