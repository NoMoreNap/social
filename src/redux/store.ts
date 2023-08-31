import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { coreApi, postsApi } from './thunks'

const root = combineReducers({
    [coreApi.reducerPath]: coreApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
})

export const store = configureStore({
    reducer: root,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coreApi.middleware).concat(postsApi.middleware),
})
