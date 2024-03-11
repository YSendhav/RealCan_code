import { combineReducers } from 'redux'
import browseReducer from '~/features/browse/reducers'
import favouritesReducer from '~/features/myList/reducers'


const rootReducers = combineReducers({
    browse: browseReducer,
    favourite: favouritesReducer

})

export default rootReducers;