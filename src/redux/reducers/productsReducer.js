import {
    SET_ALL_PRODUCTS, 
    SELECT_PRODUCT, 
    REMOVE_PRODUCT,
    ADD_PRODUCT
} from '../types/productsTypes';

const initialState = {
    all: [],
    selected: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PRODUCTS:
            return { ...state, all: action.payload };
        case SELECT_PRODUCT:
            return { ...state, selected: action.payload || null };
        case REMOVE_PRODUCT:
            return { ...state, all: state.all.filter(product => product._id !== action.payload) };
        case ADD_PRODUCT:
                return { ...state, all: [ ...state.all, action.payload] } 
        default:
            return state;
    }
}

export default productsReducer