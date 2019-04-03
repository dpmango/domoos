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
				// description: item.description,
				description:
					'Москва – столица России, многонациональный город на Москве-реке в западной части страны. В его историческом центре находится средневековая крепость Кремль – резиденция российского президента. На ее территории можно посетить Оружейную палату, где выставляются драгоценные предметы, принадлежавшие царской семье.',
				properties: [
					{
						title: 'Численность населения',
						value: `${formatNumber(item.naselenie)} человек`,
					},
					{
						title: 'Средняя зарплата',
						value: `${formatNumber(item.dohod)} руб.`,
					},
					{
						title: 'Стоимость квартир от',
						value: `${formatNumber(item.price_min)} 000 руб.`,
					},
					{
						title: 'Регион',
						value: item.region,
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
