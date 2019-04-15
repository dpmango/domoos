import { fetchCityInfo } from './api';
import { createAction, handleActions } from 'redux-actions';

import { formatNumber } from '../../libs/utils';

// SYNC ACTIONS

export const setCityInfo = createAction('setCityInfo');

// ASYNC ACTIONS

export const getCityInfo = slug => async dispatch => {
	const res = await fetchCityInfo(slug);
	dispatch(setCityInfo({ ...res, slug }));
};

const initialState = {};

export default handleActions(
	{
		[setCityInfo]: (state, { payload }) => {
			const { data } = payload.data.data;

			const result = data.map(item => ({
				slug: item.slug_gorod,
				name: item.gorod,
				name_a: item.skl_goroda,
				name_e: item.skl_gorode,
				description: item.description,
				
				properties: [
					{
						title: 'Население',
						value: `${formatNumber(item.naselenie)}`,
					},
					{
						title: 'Регион',
						value: item.region,
					},
					{
						title: 'Доход',
						value: `около ${formatNumber(item.dohod)} ₽`,
					},
					{
						title: 'Квартиры от',
						value: item.price_m ? `${formatNumber(item.price_m)} ₽` : 'недоступно',
					},
					{
						title: 'Климат',
						value: item.klimat,
					},
				],
			}));

			return {
				...state,
				[payload.slug]: {
					data: result[0],
					loading: false,
				},
			};
		},
	},
	initialState,
);

export const selectCityInfo = state => state.cities.cityInfo;
