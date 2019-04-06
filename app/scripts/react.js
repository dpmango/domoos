import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import { Provider } from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from './theme/reapop';

import CitySelector from './components/CitySelector';
import CityExplorer from './components/CityExplorer';
import CountryMap from './components/CountryMap';
import Cart from './components/Cart';
import CallbackModal from './components/CallbackModal';

import store from './libs/reduxStore';
import { setSessionID } from './ducks/user/session';

//hidden comps

store.dispatch(setSessionID());

const headerSuggestSelector = document.getElementById('header-city-select');
const cityExplorerSelector = document.getElementById('city-explorer');
const countryMapSelector = document.getElementById('country-map');
const cartSelector = document.getElementById('cart');
const cartNavbarSelector = document.getElementById('cart-navbar');
const callbackSelector = document.getElementById('callback-modal');

const ComponentConstructor = props => {
	return (
		<Provider store={store}>
			<NotificationsSystem theme={theme} />
			{props.children}
		</Provider>
	);
};
if (cartSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<Cart />
		</ComponentConstructor>,
		cartSelector,
	);
}

if (cartNavbarSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<Cart />
		</ComponentConstructor>,
		cartNavbarSelector,
	);
}

if (headerSuggestSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CitySelector id="header-city-select" />
		</ComponentConstructor>,
		headerSuggestSelector,
	);
}

if (cityExplorerSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CityExplorer id="city-explorer" />
		</ComponentConstructor>,
		cityExplorerSelector,
	);
}

if (countryMapSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CountryMap />
		</ComponentConstructor>,
		countryMapSelector,
	);
}

if (callbackSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CallbackModal />
		</ComponentConstructor>,
		callbackSelector,
	);
}
