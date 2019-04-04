import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from '../ducks';
import { loadState, saveState } from './localStorage';

const initialState = loadState();

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunk,
		promiseMiddleware({
			promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAIL'],
		}),
		createLogger({ collapsed: true }),
	),
)(createStore);

const store = createStoreWithMiddleware(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
