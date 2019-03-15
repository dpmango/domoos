import { fetchCityAgencies } from "./api";
import { createAction, handleActions } from "redux-actions";

// SYNC ACTIONS

export const setCityAgencies = createAction("setCityAgencies");

// ASYNC ACTIONS

export const getCityAgencies = slug => async dispatch => {
	const res = await fetchCityAgencies(slug);
	dispatch(setCityAgencies({ ...res, slug }));
};

const initialState = {};

export default handleActions(
	{
		[setCityAgencies]: (state, { payload }) => {
			const { data } = payload.data.data;

			const result = data.map(item => ({
				isPremium: item.premium === "" ? false : true,
				name: item.agentstvo,
				slug: item.slug_agentstvo,
				citySlug: item.slug_gorod,
				services: item.services ? item.services : "Новостройки, Вторичка, Ипотека, Обмен",
				offers: item.offers
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

export const selectCityAgencies = state => state.cities.cityAgencies;
