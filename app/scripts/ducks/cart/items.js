import { fetchExistItems, fetchAddItem, fetchDeleteItem } from './api';
import { createAction, handleActions } from 'redux-actions';
import { notify } from 'reapop';
import { selectSessionID } from '../user/session';

export const initCartItems = createAction('initCartItems');
export const saveCartItems = createAction('saveCartItems');
export const deleteCartItems = createAction('deleteCartItems');

// ASYNC ACTIONS

// TODO - incorrect mapping of server props and FE props
// (getter - initCard), (setter - saveToCart)
export const initCart = id => async dispatch => {
	const res = await fetchExistItems(id);

	const returnValueOrEmpty = x => (x ? x : '');

	const newRes = res.data.data.data.map(res => ({
		id: res.id, // getting wrong id (should be building id, not counter)
		city: res.gorod,
		citySlug: returnValueOrEmpty(res.slug_gorod),
		name: res.novostoyka,
		slug: returnValueOrEmpty(res.novostoyka_slug),
		developer: returnValueOrEmpty(res.zastr),
		region: returnValueOrEmpty(res.region),
		price: returnValueOrEmpty(res.price),
		type: res.category === 'квартира' ? 'buildings' : '',
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
		region: item.district,
		price: item.price,
		category: item.type === 'buildings' ? 'квартира' : '',
	};

	await fetchAddItem(id, reObj);

	dispatch(saveCartItems({ item }));
	dispatch(
		notify({
			title: 'Добавлено',
			message: 'Новостройка добавлена в избранное',
			status: 'success',
			dismissible: true,
			dismissAfter: 1500,
		}),
	);
};

export const deleteFromCart = item => async (dispatch, getState) => {
	const state = getState();
	const id = selectSessionID(state);

	await fetchDeleteItem(id, item);

	dispatch(deleteCartItems({ item }));
	dispatch(
		notify({
			title: 'Удалено',
			message: 'Новостройка удалена из избранного',
			status: 'info',
			dismissible: true,
			dismissAfter: 1000,
		}),
	);
};

// SYNC ACTIONS
export const showUnavailNotification = () => (dispatch, getState) => {
	dispatch(
		notify({
			message: 'У вас нет отложенных новостроек',
			status: 'warning',
			dismissible: true,
			dismissAfter: 2000,
		}),
	);
};

const initialState = {
	loading: true,
	data: [],
	error: null,
};

// instant actions saving to State without validating API
export default handleActions(
	{
		[initCartItems]: (state, { payload }) => {
			const result = payload.res;

			return {
				loading: false,
				data: [...result],
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
				region: item.district,
				price: item.price,
				type: item.type,
			};

			return {
				data: [...state.data, newItem],
			};
		},
		[deleteCartItems]: (state, { payload }) => {
			const result = state.data.filter(item => item.id !== payload.item.id);

			return {
				data: result,
			};
		},
	},
	initialState,
);

export const selectCartItems = state => state.cart.items;
