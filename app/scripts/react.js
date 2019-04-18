import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import { Provider } from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from './theme/reapop';

import CitySelector from './components/CitySelector';
import RegionSelector from './components/RegionSelector';
import CityExplorer from './components/CityExplorer';
import FeaturedBuildings from './components/FeaturedBuildings';
import CountryMap from './components/CountryMap';
import Cart from './components/Cart';
import CallbackModal from './components/CallbackModal';
import CallbackPartnerModal from './components/CallbackPartnerModal';
import CallbackSuccessModal from './components/CallbackSuccessModal';
import AssistanceRequestModal from './components/AssistanceRequestModal';
import CommentModal from './components/CommentModal';
import AboutModal from './components/AboutModal';
import CitySelectModal from './components/CitySelectModal';
import ZhkAddedModal from './components/ZhkAddedModal';
import ZhkRemovedModal from './components/ZhkRemovedModal';
import NotificationModal from './components/NotificationModal';
import InfoModal from './components/InfoModal';

import store from './libs/reduxStore';
import { setSessionID } from './ducks/user/session';

store.dispatch(setSessionID());

const headerSuggestSelector = document.getElementById('header-city-select');
const helpPodborSuggestSelector = document.getElementById('help-podbor-region-select');
const cityExplorerSelector = document.getElementById('city-explorer');
const featuredBuildingsSelector = document.getElementById('featured-buildings');
const countryMapSelector = document.getElementById('country-map');
const cityMapSelector = document.getElementById('city-map');
const cartSelector = document.getElementById('cart');
const cartNavbarSelector = document.getElementById('cart-navbar');
const callbackSelector = document.getElementById('callback-modal');
const callbackPartnerSelector = document.getElementById('callback-partner-modal');
const callbackSuccessSelector = document.getElementById('callback-success-modal');
const assistanceRequestSelector = document.getElementById('assistance-request-modal');
const commentSelector = document.getElementById('comment-modal');
const aboutSelector = document.getElementById('about-modal');
const citySelectSelector = document.getElementById('city-select-modal');
const zhkAddedSelector = document.getElementById('zhk-added-modal');
const zhkRemovedSelector = document.getElementById('zhk-removed-modal');
const notificationSelector = document.getElementById('notification-modal');
const infoSelector = document.getElementById('info-modal');

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

if (helpPodborSuggestSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<RegionSelector id="help-podbor-region-select" />
		</ComponentConstructor>,
		helpPodborSuggestSelector,
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

if (countryMapSelector || cityMapSelector) {
	// assume then both can't be present on the same page
	const renderElement = countryMapSelector || cityMapSelector;
	const citySlug = cityMapSelector ? cityMapSelector.dataset.slug : undefined;

	ReactDOM.render(
		<ComponentConstructor>
			<CountryMap isCityMap={cityMapSelector} citySlug={citySlug} />
		</ComponentConstructor>,
		renderElement,
	);
}

// SINGLE GOROD
if (featuredBuildingsSelector) {
	const citySlug = featuredBuildingsSelector.dataset.slug;
	ReactDOM.render(
		<ComponentConstructor>
			<FeaturedBuildings slug={citySlug} />
		</ComponentConstructor>,
		featuredBuildingsSelector,
	);
}

// SHARED MODALS
if (callbackSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CallbackModal />
		</ComponentConstructor>,
		callbackSelector,
	);
}

if (callbackPartnerSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CallbackPartnerModal />
		</ComponentConstructor>,
		callbackPartnerSelector,
	);
}

if (assistanceRequestSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<AssistanceRequestModal />
		</ComponentConstructor>,
		assistanceRequestSelector,
	);
}

if (callbackSuccessSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CallbackSuccessModal />
		</ComponentConstructor>,
		callbackSuccessSelector,
	);
}

if (commentSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CommentModal />
		</ComponentConstructor>,
		commentSelector,
	);
}

if (aboutSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<AboutModal />
		</ComponentConstructor>,
		aboutSelector,
	);
}

if (citySelectSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<CitySelectModal />
		</ComponentConstructor>,
		citySelectSelector,
	);
}

if (zhkAddedSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<ZhkAddedModal />
		</ComponentConstructor>,
		zhkAddedSelector,
	);
}

if (zhkRemovedSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<ZhkRemovedModal />
		</ComponentConstructor>,
		zhkRemovedSelector,
	);
}

if (notificationSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<NotificationModal />
		</ComponentConstructor>,
		notificationSelector,
	);
}

if (infoSelector) {
	ReactDOM.render(
		<ComponentConstructor>
			<InfoModal />
		</ComponentConstructor>,
		infoSelector,
	);
}
