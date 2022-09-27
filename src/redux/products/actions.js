import { get_products, add_products } from "./constants"



export const getProducts = (data) => async(dispatch) => {
    dispatch({ type: get_products, payload: data})
}

export const addProducts = (data) => async(dispatch) => {
    dispatch({ type: add_products, payload: data})
}

