import { get_products, add_products } from "./constants"



const initialState = {
    products: [],
    
}

const addedState = {
    check: false,
    variants: []
}


export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case get_products:
            return {...state, products: action.payload}
        
        default:
            return state
    }
}

export const addProductsReducer = (state=addedState, action) => {
    switch(action.type) {
        case add_products:
            state.variants.push(action.payload)
            return state

        default:
            return state
    }
}

