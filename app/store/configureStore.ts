import { configureStore } from '@reduxjs/toolkit';
import type { Middleware} from 'redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootReducers } from './rootReducers';
import { rootSagas } from './rootSagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(
  persistConfig,
  combineReducers({
    ...rootReducers,
  }),
);
const middlewares: Middleware[] = [sagaMiddleware];
middlewares.push(logger);
// if (process.env.DEV) {
// }

const store = configureStore({
  reducer: reducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares);
  },
});
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
