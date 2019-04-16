import axios from 'axios';
import qs from 'qs';

import { axiosSettings, axiosSetSettings, authKey } from '../../libs/axios';

// filter принимает только json (!)

const getBody = (table, id, type, item) => {
	const baseObj = {
		...authKey,
		table_name: table,
	};

	if (id && !type) {
		baseObj.filter = JSON.stringify([{ key: 'user_session', value: [id.id], condition: '=' }]);
	}

	if (type) {
		if (type === 'save') {
			baseObj.options = JSON.stringify({ type, values: { user_session: id.id, ...item } });
		}
		if (type === 'delete') {
			baseObj.options = JSON.stringify({ type, values: { user_session: id.id, item } });
		}
	}

	return qs.stringify(baseObj);
};

export const fetchExistItems = id =>
	axios({
		...axiosSettings,
		data: getBody('Favorites', id),
	});

export const fetchAddItem = (id, item) =>
	axios({
		...axiosSetSettings,
		data: getBody('Favorites', id, 'save', item),
	});

export const fetchDeleteItem = (id, item) =>
	axios({
		...axiosSetSettings,
		data: getBody('Favorites', id, 'delete', item),
	});
