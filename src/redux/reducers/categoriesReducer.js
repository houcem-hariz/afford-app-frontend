import {
    SET_ALL_CATEGORIES,
    SELECT_CATEGORY,
    REMOVE_CATEGORY,
    ADD_CATEGORY
} from '../types/categoriesTypes';

const initialState = {
    all: [],
    selected: null
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CATEGORIES:
            return { ...state, all: action.payload };
        case SELECT_CATEGORY:
            return { ...state, selected: action.payload || null };
        case REMOVE_CATEGORY:{
            const categoriesWithDeletedRefs = state.all.filter(category => category.mainCategory !== action.payload)
            return { ...state, all: categoriesWithDeletedRefs.filter(category => category._id !== action.payload) };
        }
        case ADD_CATEGORY:
            return { ...state, all: [...state.all, action.payload] } 
        default:
            return state;
    }
}

export default categoriesReducer