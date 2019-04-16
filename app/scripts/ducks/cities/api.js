import axios from 'axios';
import qs from 'qs';

import { axiosSettings, authKey } from '../../libs/axios';

const getBody = (table, filterBy, slug) => {
	const baseObj = {
		...authKey,
		table_name: table,
	};

	if (slug) {
		baseObj.value = slug;
	}

	if (filterBy) {
		baseObj.filter = JSON.stringify([{ key: filterBy, value: [slug], condition: '=' }]);
	}

	return qs.stringify(baseObj);
};

export const fetchCitiesList = () =>
	axios({
		...axiosSettings,
		data: getBody('V_menu_goroda'),
	});

export const fetchCityInfo = slug =>
	axios({
		...axiosSettings,
		data: getBody('V_main_info_gorod', 'slug_gorod', slug),
	});

export const fetchCityDevelopers = slug =>
	axios({
		...axiosSettings,
		data: getBody('V_main_info_zastr', 'slug_gorod', slug),
	});

export const fetchCityBuildings = slug =>
	axios({
		...axiosSettings,
		data: getBody('V_main_info_novostroyki', 'slug_gorod', slug),
	});

export const fetchCityAgencies = slug =>
	axios({
		...axiosSettings,
		data: getBody('V_main_info_an', 'slug_gorod', slug),
	});

export const fetchMapCities = () =>
	axios({
		...axiosSettings,
		data: getBody('V_map_goroda'),
	});
