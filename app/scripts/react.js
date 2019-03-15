import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import CitySelector from "./components/CitySelector";
import CityExplorer from "./components/CityExplorer";
import CountryMap from "./components/CountryMap";
import Cart from "./components/Cart";

import configureStore from "./libs/configureStore";
import { setSessionID } from "./ducks/user/session";

//hidden comps
import CallbackModal from "./components/CallbackModal";

const store = configureStore();

store.dispatch(setSessionID());

const headerSuggestSelector = document.getElementById("header-city-select");
const cityExplorerSelector = document.getElementById("city-explorer");
const countryMapSelector = document.getElementById("country-map");
const cartSelector = document.getElementById("cart");
const cartNavbarSelector = document.getElementById("cart-navbar");

// ReactDOM.render(<CallbackModal />, document.getElementById("test"));

if (cartSelector) {
	ReactDOM.render(
		<Provider store={store}>
			<Cart />
		</Provider>,
		cartSelector
	);
}

if (cartNavbarSelector) {
	ReactDOM.render(
		<Provider store={store}>
			<Cart />
		</Provider>,
		cartNavbarSelector
	);
}

if (headerSuggestSelector) {
	ReactDOM.render(
		<Provider store={store}>
			<CitySelector id="header-city-select" />
		</Provider>,
		headerSuggestSelector
	);
}

if (cityExplorerSelector) {
	ReactDOM.render(
		<Provider store={store}>
			<CityExplorer id="city-explorer" />
		</Provider>,
		cityExplorerSelector
	);
}

if (countryMapSelector) {
	ReactDOM.render(
		<Provider store={store}>
			<CountryMap />
		</Provider>,
		countryMapSelector
	);
}
