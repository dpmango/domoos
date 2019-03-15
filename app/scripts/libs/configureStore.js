import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import rootReducer from "../ducks";

const configureStore = initialState => {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunk,
			promiseMiddleware({
				promiseTypeSuffixes: ["LOADING", "SUCCESS", "FAIL"]
			}),
			createLogger({ collapsed: true })
		)
	);
};

export default configureStore;
