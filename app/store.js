import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './aRedux'

let currentStore = null;
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });
export const configureStore = (initialState={}) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
   currentStore= createStore(reducer, initialState, enhancer);
   return currentStore;
}


export const getStore = () => currentStore;