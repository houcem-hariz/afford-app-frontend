import {
    SET_ALL_CATEGORIES,
    SELECT_CATEGORY,
    REMOVE_CATEGORY
} from '../types/categoriesTypes';

export const setAllCategories = (categories) => ({ type: SET_ALL_CATEGORIES, payload: categories });

export const selectCategory = (category) => ({ type: SELECT_CATEGORY, payload: category });

export const removeCategory = (categoryId) => ({ type: REMOVE_CATEGORY, payload: categoryId });
