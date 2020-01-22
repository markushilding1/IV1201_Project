import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import rootReducer from './rootReducer';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import firebaseConfig from './../config/firebaseConfig';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase})),
        reactReduxFirebase(firebaseConfig, {
          attachAuthIsReady: true,
        }),
    ),
);

const persistor = persistStore(store);

export {store, persistor};
