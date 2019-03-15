import { combineReducers } from "redux";

import user from "./user";
import cart from "./cart";
import cities from "./cities";

export default combineReducers({
	user,
	cart,
	cities
});
