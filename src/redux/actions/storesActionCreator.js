import {
    SET_ALL_STORES,
    SELECT_STORE,
    REMOVE_STORE,
    ADD_STORE
} from '../types/storesTypes';

export const setAllStores = (stores) => ({ type: SET_ALL_STORES, payload: stores });

export const selectStore = (store) => ({ type: SELECT_STORE, payload: store });

export const removeStore = (storeId) => ({ type: REMOVE_STORE, payload: storeId });

export const addStore = (store) => ({ type: ADD_STORE, payload: store });
