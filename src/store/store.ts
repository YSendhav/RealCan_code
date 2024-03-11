import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers'
import rootSaga from './sagas'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favourite'],
    stateReconciler: autoMergeLevel2,
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: ([sagaMiddleware] as const),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof configureStore>

export default store