import { fetchCityDevelopers } from "./api";
import { createAction, handleActions } from "redux-actions";

// SYNC ACTIONS

export const setCityDevelopers = createAction("setCityDevelopers");

// ASYNC ACTIONS

export const getCityDevelopers = slug => async dispatch => {
	const res = await fetchCityDevelopers(slug);
	dispatch(setCityDevelopers({ ...res, slug }));
};

const initialState = {};

export default handleActions(
	{
		[setCityDevelopers]: (state, { payload }) => {
			const { data } = payload.data.data;

			const result = data.map((item, key) => ({
				isPremium: item.premium === "" ? false : true,
				title: item.zastr,
				id: item.id ? item.id : key,
				slug: item.slug_zastr,
				citySlug: item.slug_gorod,
				features: [
					`Квартиры <span>от ${item.price} руб.</span>`,
					`На рынке c ${item.god} года`,
					`${item.klass}`,
					`Объектов в продаже:  ${item.offers}  `
				]
			}));

			const withPremium = result.filter(item => item.isPremium);
			const withoutPremium = result.filter(item => !item.isPremium);

			return {
				...state,
				[payload.slug]: {
					data: [...withPremium, withoutPremium].splice(0, 6),
					loading: false
				}
			};
		}
	},
	initialState
);

export const selectCityDevelopers = state => state.cities.cityDevelopers;
