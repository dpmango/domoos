import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';

import user from './user';
import cart from './cart';
import cities from './cities';

export default combineReducers({
	user,
	cart,
	cities,
	notifications: notificationsReducer(),
});
