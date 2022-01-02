import {
    SET_ALL_CATEGORIES,
    SELECT_CATEGORY,
    REMOVE_CATEGORY
 } from '../types/categoriesTypes';
 
 const initialState = {
     all: [],
     selected: null
 };
 
 const categoriesReducer = (state = initialState , action) => {
     switch (action.type) {
         case SET_ALL_CATEGORIES:
             return {...state, all: action.payload};
         case SELECT_CATEGORY:
             return {...state, selected: action.payload || null};       
         case REMOVE_CATEGORY:
             return {...state, all: state.all.filter(category => category._id !== action.payload)};       
         default:
             return state;
     }
 }
 
 export default categoriesReducer