import { combineReducers, createReducer } from '@reduxjs/toolkit'
import { BrowseInitialState } from '../type'
import { setStatusBarAction } from '../actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'

const browseInitialState = {
    isStatusBarValue: false
} as BrowseInitialState

const browseReducer = createReducer(browseInitialState, builder => {
    builder.addCase(setStatusBarAction, (state, action) => ({
        ...state,
        isStatusBarValue: action.payload,
    }))
})

const browsePersistConfig = {
    key: 'browse',
    storage: AsyncStorage,
    whitelist: [
        'isStatusBarValue'
    ],
}

export default persistReducer(browsePersistConfig, browseReducer)