import { fetchCityBuildings } from './api';
import { createAction, handleActions } from 'redux-actions';

// SYNC ACTIONS

export const setCityBuildings = createAction('setCityBuildings');

// ASYNC ACTIONS

export const getCityBuildings = slug => async dispatch => {
	const res = await fetchCityBuildings(slug);
	dispatch(setCityBuildings({ ...res, slug }));
};

const initialState = {};

export default handleActions(
	{
		[setCityBuildings]: (state, { payload }) => {
			const { data } = payload.data.data;

			const result = data.map((item, key) => ({
				type: 'buildings',
				isPremium: item.premium === '' ? false : true,
				id: item.id ? item.id : key,
				slug: item.slug_novostr,
				name: item.novostr ? item.novostr : '-',
				city: item.gorod,
				citySlug: item.slug_gorod,
				developer: item.zastr,
				developerSlug: item.slug_zastr,
				features: [item.klass, item.otdelka, item.srok],
				subway: item.metro,
				district: item.raion,
				price: item.price ? item.price : '0 000 000',
			}));

			const withPremium = result.filter(item => item.isPremium);
			const withoutPremium = result.filter(item => !item.isPremium);

			return {
				...state,
				[payload.slug]: {
					data: [...withPremium, withoutPremium].splice(0, 12),
					loading: false,
				},
			};
		},
	},
	initialState,
);

export const selectCityBuildings = state => state.cities.cityBuildings;
