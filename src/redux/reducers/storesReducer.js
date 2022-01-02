import {
    SET_ALL_STORES,
    SELECT_STORE,
    REMOVE_STORE,
    ADD_STORE
 } from '../types/storesTypes';
 
 const initialState = {
     all: [],
     selected: null
 };
 
 const storesReducer = (state = initialState , action) => {
     switch (action.type) {
         case SET_ALL_STORES:
             return {...state, all: action.payload};
         case SELECT_STORE:
             return {...state, selected: action.payload || null};       
         case REMOVE_STORE:
             return {...state, all: state.all.filter(store => store._id !== action.payload)};       
         case ADD_STORE:
             return { ...state, all: [ ...state.all, action.payload] } 
         default:
             return state;
     }
 }
 
 export default storesReducer