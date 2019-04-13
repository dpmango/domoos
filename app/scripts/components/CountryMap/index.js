import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CityInfo from './CityInfo';

import GoogleMapReact from 'google-map-react';
import matchSorter from 'match-sorter';

import { selectcitiesMapInfo, getCitiesMapInfo } from '../../ducks/cities/citiesMapInfo';

class CountryMap extends PureComponent {
	state = {
		key: 'AIzaSyAOFKzxkxuZDqNzPqHk1PxUPPBaecsjlIM',
		center: { lat: 45.751244, lng: 50.618423 },
		zoom: 4,
		filters: [
			'Милионник',
			'от 500 тыс',
			'Запад',
			'Урал',
			'Сибирь',
			'Дальний Восток',
			'Юг',
			'Дешевое жилье',
			'Возле моря',
			'Теплый климат',
		],
		toggle: true,
		isSidebarActive: false,
		activeFilter: 'все',
		activeCity: {},
		activeMarker: undefined,
	};

	componentWillMount = () => {
		this.setState({
			zoom: this.props.isCityMap ? 7 : 4,
		});
	};
	componentDidMount = () => {
		const { getCitiesMapInfo, isCityMap, citySlug } = this.props;
		getCitiesMapInfo();
		if (isCityMap) {
			// set initial marker if it's a city map
			this.hadleCityChange(citySlug);
		}
	};

	// TODO - any need to watch props?
	// componentWillReceiveProps = nextProps => {
	// 	if (nextProps.mapInfo && nextProps.mapInfo[0].slug !== this.state.activeMarker) {
	// 		this.bindCurrentCity();
	// 	}
	// };

	hadleCityChange = slug => {
		const {
			props: { mapInfo, isCityMap },
			state: { activeCity, center },
		} = this;

		const result = matchSorter(mapInfo.data.result, slug, {
			keys: [{ threshold: matchSorter.rankings.EQUAL, key: 'slug' }],
		});

		const isEqual = JSON.stringify(result[0]) === JSON.stringify(activeCity);
		const updatableCenter = isCityMap ? { lat: result[0].lat, lng: result[0].lng + 1 } : center;
		this.setState({
			activeCity: isEqual ? [] : result[0],
			isSidebarActive: isEqual ? false : true,
			actitveMarker: slug,
			center: updatableCenter,
		});
	};

	hadleFilterClick = name => {
		const { activeFilter } = this.state;

		this.setState({
			activeFilter: activeFilter !== name ? name : 'все',
		});

		// this.setState(prevState => ({
		// 	activeFilter:
		// 		activeFilter.indexOf(name) !== -1
		// 			? [...prevState.activeFilter.filter(item => item !== name)]
		// 			: [...prevState.activeFilter, name]
		// }))
	};

	handleCloseSidebar = () => {
		this.setState({
			isSidebarActive: false,
			activeCity: {},
		});
	};

	render() {
		const { mapInfo, isCityMap } = this.props;
		const {
			key,
			center,
			zoom,
			filters,
			activeCity,
			isSidebarActive,
			activeFilter,
			actitveMarker,
		} = this.state;

		const Marker = ({ slug, name }) => (
			<div
				className={'bull ' + (actitveMarker === slug ? 'is-active' : '')}
				id={slug}
				title={name}
				onClick={() => mapInfo.data.result && this.hadleCityChange(slug)}
			/>
		);

		return (
			<div
				className={isCityMap ? 'CountryMap CityMap' : 'CountryMap'}
				style={{ height: '100vh', width: '100%' }}
			>
				{!isCityMap && (
					<div data-simplebar className="filter">
						<div className="filter__title">О сервисе</div>
						<div className="filter__content">
							Наша миссия - упрощение покупки квартиры в новостройке. Точная и актуальная информация
							поможет вам выбрать именно то, что нужно. Мы убеждены, что каждый из нас заслуживает
							самый качественный сервис от застройщиков, банков и агентств недвижимости.
						</div>
						<div className="filter__list">
							{filters &&
								filters.map((item, key) => (
									<div
										className={`filter__item ${activeFilter === item.toLowerCase() && 'selected'} `}
										key={key}
										onClick={() => this.hadleFilterClick(item.toLowerCase())}
									>
										{item}
									</div>
								))}
						</div>
					</div>
				)}
				{isSidebarActive && activeCity && (
					<CityInfo
						activeCity={activeCity}
						isCityMap={isCityMap}
						handleCloseSidebar={this.handleCloseSidebar}
					/>
				)}
				<div className="map-container">
					{!isCityMap && (
						<React.Fragment>
							<a href="/goroda" target="_blank" className="to-category">
								<span />В каталог городов
							</a>
							<a href="/goroda" className="to-new-buildings">
								В каталог новостроек
								<span />
							</a>
						</React.Fragment>
					)}
					<GoogleMapReact
						bootstrapURLKeys={{
							key,
						}}
						center={center}
						defaultZoom={zoom}
					>
						{mapInfo.data &&
							!mapInfo.loading &&
							mapInfo.data.coordinates
								.filter(({ category }) => {
									return category.indexOf(activeFilter) !== -1 || activeFilter === 'все'
										? true
										: false;
								})
								.map((city, key) => (
									<Marker
										key={key}
										slug={city.slug}
										name={city.name}
										lat={city.lat}
										lng={city.lng}
									/>
								))}
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mapInfo: selectcitiesMapInfo(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getCitiesMapInfo,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CountryMap);
