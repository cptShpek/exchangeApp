const utils = {

    chekState: (obj, history) => {
        if (!obj) {
            history.push('/')    
            return false
        }
        return true
    }
}

export default utils