import { createStore, compose } from 'redux';

import { reducers } from './mainReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let composeEnhancers = compose;

if (
  window.localStorage.getItem('debug-redux') ||
  process.env.NODE_ENV !== 'production'
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducers, composeEnhancers());

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state));
});

export { store };
