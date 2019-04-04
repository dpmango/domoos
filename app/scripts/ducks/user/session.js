import { createAction, handleActions } from 'redux-actions';
import { generateID, cookieSettings } from '../../libs/utils';
import Cookies from 'js-cookie';

export const userInit = createAction('userInit');

const initialState = { id: null };

const sessionID = Cookies.get('sessionID');
const id = generateID();

export const setSessionID = () => dispatch => {
	if (!sessionID) {
		Cookies.set('sessionID', id, ...cookieSettings);
		dispatch(userInit({ id }));
	} else {
		const existID = Cookies.get('sessionID');
		dispatch(userInit({ id: existID }));
	}
};

export default handleActions(
	{
		[userInit]: (state, { payload }) => {
			return {
				...state,
				id: payload.id,
			};
		},
	},
	initialState,
);

export const selectSessionID = state => state.user.session;
