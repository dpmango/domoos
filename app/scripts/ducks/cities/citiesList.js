import { fetchCitiesList } from "./api";
import { createAction, handleActions } from "redux-actions";

// SYNC ACTIONS

export const setCitiesList = createAction("setCitiesList");

// ASYNC ACTIONS

export const getCitiesList = () => async dispatch => {
	const res = await fetchCitiesList();
	dispatch(setCitiesList(res));
};

const initialState = {
	loading: true,
	data: [],
	error: null
};

export default handleActions(
	{
		[setCitiesList]: (state, { payload }) => {
			const { data } = payload.data.data;

			const result = data.map(item => ({
				slug: item.slug_gorod,
				name:
					item.gorod === "Петербург" ? "Санкт-Петербург" : item.gorod,
				name_a: item.skl_goroda,
				name_e: item.skl_gorode,
				alias: item.gorod === "Петербург" && "Санкт-Петербург"
			}));
			return {
				data: result
			};
		}
	},
	initialState
);

export const selectCitiesList = state => state.cities.citiesList;
