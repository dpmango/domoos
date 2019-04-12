import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import matchSorter from 'match-sorter';
import ReactStars from 'react-stars';

import { selectcitiesMapInfo, getCitiesMapInfo } from '../../ducks/cities/citiesMapInfo';

class CountryMap extends PureComponent {
	state = {
		key: 'AIzaSyAOFKzxkxuZDqNzPqHk1PxUPPBaecsjlIM',
		center: { lat: 45.751244, lng: 50.618423 },
		zoom: 4,
		filters: [
			'Милионник',
			'Высокие зарплаты',
			'Западная Россия',
			'Развитый город',
			'Больше 500 тысяч',
			'Метро',
			'Недорогое жилье',
			'Теплый климат',
			'Курортный',
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
				className={'bull ' + (actitveMarker === slug ? 'bounce is-active' : '')}
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
					<div data-simplebar className="sidebar city">
						<div className="sidebar__header">
							<div className="sidebar__close" onClick={() => this.handleCloseSidebar()} />
						</div>
						<div
							className="city__img"
							style={{
								backgroundImage: `url(https://domoos.ru/images/goroda/preview/${
									activeCity.slug
								}.jpg)`,
							}}
						/>

						<a className="city__link" href={`/${activeCity.slug}`} target="_blank">
							Страница города
						</a>
						<div className="city__name">{activeCity.name}</div>
						<div className="city__description">{activeCity.description}</div>
						<div className="city__ratings">
							{activeCity.ratings &&
								activeCity.ratings.map((rating, key) => (
									<div key={key} className="rating">
										<div className="rating__title">{rating.title}</div>
										<div className="rating__stars">
											<ReactStars
												count={5}
												size={15}
												value={rating.value}
												edit={false}
												half={false}
												color2="#ffd72b"
												color1="#eceff6"
											/>
										</div>
									</div>
								))}
							<div />
						</div>
						<ul className="city__options">
							{activeCity.ratings &&
								activeCity.options.map((option, key) => (
									<li key={key} className="option">
										<span className="option__title">{option.title}:</span>
										<span className="option__value">{option.value}</span>
									</li>
								))}
							<div />
						</ul>
						<div className="city__neighbors">
							<div className="title">Ближайшие города:</div>
							<div className="content">{activeCity.neighbors}</div>
						</div>
						<div className="map-form">
							{isCityMap ? (
								<div className="title">Заказать подбор квартиры</div>
							) : (
								<React.Fragment>
									<div className="title">Заказать подбор квартиры</div>
									<div className="desc">Это бесплатная услуга</div>
									<div className="hotcall__form">
										<input
											type="tel"
											placeholder="+7"
											className="hotcall__input"
											im-insert="true"
										/>
										<input
											name="submit"
											type="submit"
											value="Отправить"
											className="hotcall__submit btn btn__full btn__full--yellow"
										/>
									</div>
								</React.Fragment>
							)}
						</div>
						<div className="mobileButton">
							<a href="#" className="btn btn__full btn__full--yellow">
								Заказать подбор квартиры
							</a>
						</div>
					</div>
				)}
				<div className="map-container">
					{!isCityMap && (
						<React.Fragment>
							<a href="/goroda" className="to-category">
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
