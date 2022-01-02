import { combineReducers} from 'redux'
import userReducer from './userReducer'
import storesReducer from './storesReducer'
import categoriesReducer from './categoriesReducer'

const rootReducer = combineReducers({
    user: userReducer,
    stores: storesReducer,
    categories: categoriesReducer
})

export default rootReducer