import { fetchMapCities } from './api';
import { createAction, handleActions } from 'redux-actions';

import { formatNumber } from '../../libs/utils';

// SYNC ACTIONS

export const setCitiesMapInfo = createAction('setCitiesMapInfo');

// ASYNC ACTIONS

export const getCitiesMapInfo = slug => async dispatch => {
	const res = await fetchMapCities(slug);
	dispatch(setCitiesMapInfo({ ...res, slug }));
};

const initialState = {
	data: {
		coordinates: [
			{
				lat: 43.443579,
				lng: 39.910369,
				slug: 'adler',
				name: 'Адлер',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 44.894965,
				lng: 37.31617,
				slug: 'anapa',
				name: 'Анапа',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 53.355084,
				lng: 83.769948,
				slug: 'barnaul',
				name: 'Барнаул',
				category: ['больше 500 тысяч', 'недорогое жилье', 'развитый город'],
			},
			{
				lat: 48.707073,
				lng: 44.51693,
				slug: 'volgograd',
				name: 'Волгоград',
				category: ['милионник', 'теплый климат'],
			},
			{
				lat: 51.660781,
				lng: 39.200269,
				slug: 'voronezh',
				name: 'Воронеж',
				category: ['милионник', 'западная россия'],
			},
			{
				lat: 44.561141,
				lng: 38.076809,
				slug: 'gelendzhik',
				name: 'Геленджик',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 56.838011,
				lng: 60.597465,
				slug: 'ekaterinburg',
				name: 'Екатеринбург',
				category: ['милионник', 'метро', 'высокие зарплаты'],
			},
			{
				lat: 56.852593,
				lng: 53.204843,
				slug: 'izhevsk',
				name: 'Ижевск',
				category: ['больше 500 тысяч'],
			},
			{
				lat: 55.796289,
				lng: 49.108795,
				slug: 'kazan',
				name: 'Казань',
				category: ['милионник', 'метро', 'развитый город'],
			},
			{
				lat: 54.70739,
				lng: 20.507307,
				slug: 'kaliningrad',
				name: 'Калининград',
				category: ['западная россия'],
			},
			{
				lat: 58.603581,
				lng: 49.667978,
				slug: 'kirov',
				name: 'Киров',
				category: ['больше 500 тысяч', 'развитый город'],
			},
			{
				lat: 45.03547,
				lng: 38.975313,
				slug: 'krasnodar',
				name: 'Краснодар',
				category: ['больше 500 тысяч', 'развитый город', 'теплый климат'],
			},
			{
				lat: 56.010563,
				lng: 92.852572,
				slug: 'krasnoyarsk',
				name: 'Красноярск',
				category: ['милионник', 'развитый город'],
			},
			{
				lat: 52.60882,
				lng: 39.59922,
				slug: 'lipetsk',
				name: 'Липецк',
				category: ['больше 500 тысяч', 'недорогое жилье', 'западная россия'],
			},
			{
				lat: 55.753215,
				lng: 37.622504,
				slug: 'moskva',
				name: 'Москва',
				category: ['милионник', 'метро', 'высокие зарплаты', 'западная россия'],
			},
			{
				lat: 56.326887,
				lng: 44.005986,
				slug: 'n-novgorod',
				name: 'Нижний Новгород',
				category: ['милионник', 'метро', 'развитый город'],
			},
			{
				lat: 44.723912,
				lng: 37.768974,
				slug: 'novorossijsk',
				name: 'Новороссийск',
				category: ['теплый климат'],
			},
			{
				lat: 55.030199,
				lng: 82.92043,
				slug: 'novosibirsk',
				name: 'Новосибирск',
				category: ['милионник', 'метро', 'развитый город'],
			},
			{ lat: 54.989342, lng: 73.368212, slug: 'omsk', name: 'Омск', category: ['милионник'] },
			{ lat: 58.010374, lng: 56.229398, slug: 'perm', name: 'Пермь', category: ['милионник'] },
			{
				lat: 59.939095,
				lng: 30.315868,
				slug: 'peterburg',
				name: 'Петербург',
				category: ['милионник', 'метро', 'высокие зарплаты', 'западная россия'],
			},
			{
				lat: 47.222078,
				lng: 39.720349,
				slug: 'rostov',
				name: 'Ростов-на-Дону',
				category: ['милионник', 'развитый город', 'теплый климат'],
			},
			{
				lat: 54.629216,
				lng: 39.736375,
				slug: 'ryazan',
				name: 'Рязань',
				category: ['больше 500 тысяч', 'западная россия'],
			},
			{
				lat: 53.195538,
				lng: 50.101783,
				slug: 'samara',
				name: 'Самара',
				category: ['милионник', 'метро', 'развитый город'],
			},
			{
				lat: 51.533103,
				lng: 46.034158,
				slug: 'saratov',
				name: 'Саратов',
				category: ['больше 500 тысяч', 'недорогое жилье', 'развитый город'],
			},
			{
				lat: 44.616841,
				lng: 33.525495,
				slug: 'sevastopol',
				name: 'Севастополь',
				category: ['развитый город', 'теплый климат'],
			},
			{
				lat: 44.948237,
				lng: 34.100318,
				slug: 'simferopol',
				name: 'Симферополь',
				category: ['развитый город', 'теплый климат'],
			},
			{
				lat: 43.585525,
				lng: 39.723062,
				slug: 'sochi',
				name: 'Сочи',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 56.48464,
				lng: 84.947649,
				slug: 'tomsk',
				name: 'Томск',
				category: ['больше 500 тысяч'],
			},
			{
				lat: 44.09564,
				lng: 39.073553,
				slug: 'tuapse',
				name: 'Туапсе',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 57.153033,
				lng: 65.534328,
				slug: 'tumen',
				name: 'Тюмень',
				category: ['больше 500 тысяч', 'высокие зарплаты', 'развитый город'],
			},
			{
				lat: 54.316855,
				lng: 48.402557,
				slug: 'ulyanovsk',
				name: 'Ульяновск',
				category: ['больше 500 тысяч', 'недорогое жилье'],
			},
			{ lat: 54.735147, lng: 55.958727, slug: 'ufa', name: 'Уфа', category: ['милионник'] },
			{
				lat: 48.480223,
				lng: 135.071917,
				slug: 'khabarovsk',
				name: 'Хабаровск',
				category: ['высокие зарплаты', 'развитый город'],
			},
			{
				lat: 56.146277,
				lng: 47.251079,
				slug: 'cheboksary',
				name: 'Чебоксары',
				category: ['недорогое жилье'],
			},
			{
				lat: 55.159897,
				lng: 61.402554,
				slug: 'chelyabinsk',
				name: 'Челябинск',
				category: ['милионник'],
			},
			{
				lat: 62.028103,
				lng: 129.732663,
				slug: 'yakutsk',
				name: 'Якутск',
				category: ['высокие зарплаты'],
			},
			{
				lat: 44.498231,
				lng: 34.169317,
				slug: 'yalta',
				name: 'Ялта',
				category: ['курортный', 'теплый климат'],
			},
			{
				lat: 57.626569,
				lng: 39.893787,
				slug: 'yaroslavl',
				name: 'Ярославль',
				category: ['больше 500 тысяч', 'западная россия'],
			},
		],
	},
};

export default handleActions(
	{
		[setCitiesMapInfo]: (state, { payload }) => {
			const { data } = payload.data.data;

			const coords = data.map(item => {
				let coordinates = item.koordinata.split(', ');
				let arr = {
					lat: parseFloat(coordinates[0]),
					lng: parseFloat(coordinates[1]),
					slug: item.slug_gorod,
					name: item.gorod,
					category: item.category.toLowerCase().split(', '),
				};

				return arr;
			});

			const result = data.map(item => {
				let coordinates = item.koordinata.split(', ');

				let arr = {
					slug: item.slug_gorod,
					name: item.gorod,
					category: item.category.toLowerCase().split(', '),
					description:
						item.description === '' ? '' : item.description,
					ratings: [
						{
							title: '',
							value: parseFloat(item.rating_eco),
						},
						{
							title: '',
							value: parseFloat(item.rating_dohod),
						},
						{
							title: '',
							value: parseFloat(item.rating_infr),
						},
						{
							title: '',
							value: parseFloat(item.rating_total),
						},
					],
					options: [
						{
							title: 'Население',
							value: `${formatNumber(item.naselenie)}`,
						},
						{
							title: 'Регион',
							value: item.region,
						},
						{
							title: 'Доход',
							value: `около ${formatNumber(item.dohod)} ₽`,
						},
						{
							title: 'Квартиры от',
							value: item.price_min ? item.price_min + ' ₽' : 'недоступно',
						},
						{
							title: 'Климат',
							value: item.klimat,
						},
					],
					lat: parseFloat(coordinates[0]),
					lng: parseFloat(coordinates[1]),
					neighbors: item.sosedi,
				};

				return arr;
			});

			return {
				...state,
				data: { result, coordinates: coords },
				loading: false,
			};
		},
	},
	initialState,
);

export const selectcitiesMapInfo = state => state.cities.citiesMapInfo;

export const selectCityBySlug = (state, slug) => {
	return state.cities.citiesMapInfo.data.result.filter(x => x.slug === slug);
};
