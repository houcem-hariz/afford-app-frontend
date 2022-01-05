import { combineReducers} from 'redux'
import userReducer from './userReducer'
import storesReducer from './storesReducer'
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    stores: storesReducer,
    categories: categoriesReducer,
    products: productsReducer
})

export default rootReducer