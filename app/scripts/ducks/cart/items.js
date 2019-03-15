import { fetchExistItems, fetchAddItem, fetchDeleteItem } from "./api";
import { createAction, handleActions } from "redux-actions";
import { selectSessionID } from "../user/session";

// SYNC ACTIONS

export const initCartItems = createAction("initCartItems");
export const saveCartItems = createAction("saveCartItems");
export const deleteCartItems = createAction("deleteCartItems");

// ASYNC ACTIONS

export const initCart = id => async dispatch => {
	const res = await fetchExistItems(id);

	const newRes = res.data.data.data.map(item => ({
		id: item.id,
		city: item.gorod,
		citySlug: item.slug_gorod ? item.slug_gorod : "",
		name: item.novostoyka,
		slug: item.novostoyka_slug ? item.novostoyka_slug : "",
		developer: item.zastr ? item.zastr : "",
		ready: item.srok ? item.srok : "",
		price: item.price ? item.price : "",
		type: item.category === "квартира" ? "buildings" : ""
	}));

	dispatch(initCartItems({ res: newRes }));
};

export const saveToCart = item => async (dispatch, getState) => {
	const state = getState();
	const id = selectSessionID(state);

	const reObj = {
		id: item.id,
		gorod: item.city,
		slug_gorod: item.citySlug,
		novostoyka: item.name,
		novostoyka_slug: item.slug,
		zastr: item.developer,
		srok: item.features[2],
		price: item.price,
		category: item.type === "buildings" ? "квартира" : ""
	};

	await fetchAddItem(id, reObj);

	dispatch(saveCartItems({ item }));
};

export const deleteFromCart = item => async (dispatch, getState) => {
	const state = getState();
	const id = selectSessionID(state);

	await fetchDeleteItem(id, item);

	dispatch(deleteCartItems({ item }));
};

const initialState = {
	loading: true,
	data: [],
	error: null
};

export default handleActions(
	{
		[initCartItems]: (state, { payload }) => {
			const result = payload.res;

			return {
				loading: false,
				data: [...result]
			};
		},
		[saveCartItems]: (state, { payload }) => {
			const { item } = payload;

			const newItem = {
				id: item.id,
				city: item.city,
				citySlug: item.citySlug,
				name: item.name,
				slug: item.slug,
				developer: item.developer,
				ready: item.features[2],
				price: item.price,
				type: item.type
			};

			return {
				data: [...state.data, newItem]
			};
		},
		[deleteCartItems]: (state, { payload }) => {
			const result = state.data.filter(item => item.id !== payload.item.id);

			return {
				data: result
			};
		}
	},
	initialState
);

export const selectCartItems = state => state.cart.items;
