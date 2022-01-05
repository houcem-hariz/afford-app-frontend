import {
    SET_ALL_PRODUCTS, 
    SELECT_PRODUCT, 
    REMOVE_PRODUCT,
    ADD_PRODUCT
} from '../types/productsTypes';

export const setAllProducts = (products) => ({ type: SET_ALL_PRODUCTS, payload: products });

export const selectProduct = (product) => ({ type: SELECT_PRODUCT, payload: product });

export const removeProduct = (productId) => ({ type: REMOVE_PRODUCT, payload: productId });

export const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product });
