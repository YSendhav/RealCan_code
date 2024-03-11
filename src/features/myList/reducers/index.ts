import { combineReducers, createReducer } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import {
    setFavoutiteItemAction,
    getFavoutiteItemAction,
    getFavouriteListAction,
    setFavouriteListAction,
    clearFavouriteListAction,
    removeListByIdAction
} from '../actions'
import { FavouritesState } from '../type'

const favouriteListInitialState = {
    favouriteList: [],
    loading: false
} as FavouritesState

const favouritesReducer = createReducer(favouriteListInitialState, builder => {
    builder.addCase(getFavouriteListAction, state => {
        return {
            ...state,
            loading: true,
        }
    })
    builder.addCase(setFavouriteListAction, (state, action) => {
        return {
            ...state,
            // loading: false,
            favouriteList: action.payload
        }
    })
    builder.addCase(clearFavouriteListAction, () => {
        return favouriteListInitialState
    })
    builder.addCase(removeListByIdAction, (state, action) => {
        return {
            ...state,
            favouriteList: state.favouriteList.filter(item => item.MLSNumber !== action.payload),
        }
    })
})
const favouritePersistConfig = {
    key: 'favourite',
    storage: AsyncStorage,
    whitelist: ['favouriteList'],
}


export default persistReducer(favouritePersistConfig, favouritesReducer)

