import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import matchSorter from 'match-sorter';
import ReactStars from 'react-stars';

import { selectCityBySlug, getCitiesMapInfo } from '../../ducks/cities/citiesMapInfo';

class CityMap extends PureComponent {
	state = {
		key: 'AIzaSyAOFKzxkxuZDqNzPqHk1PxUPPBaecsjlIM',
		center: { lat: 45.751244, lng: 50.618423 },
		zoom: 7,
		activeCity: {},
		activeMarker: undefined,
	};

	componentDidMount = () => {
		const { getCitiesMapInfo } = this.props;
		getCitiesMapInfo();
		this.bindCurrentCity();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.mapInfo && nextProps.mapInfo[0].slug !== this.state.activeMarker) {
			this.bindCurrentCity();
		}
	};

	bindCurrentCity = () => {
		const {
			props: { mapInfo, slug },
		} = this;

		if (mapInfo) {
			const result = matchSorter(mapInfo, slug, {
				keys: [{ threshold: matchSorter.rankings.EQUAL, key: 'slug' }],
			});

			this.setState({
				activeCity: result[0],
				actitveMarker: slug,
				center: { lat: result[0].lat, lng: result[0].lng + 1 },
			});
		}
	};

	render() {
		const { mapInfo } = this.props;
		const { key, center, zoom, activeCity, actitveMarker } = this.state;

		const Marker = ({ slug, name }) => (
			<div
				className={'bull ' + (actitveMarker === slug ? 'is-active' : '')}
				id={slug}
				title={name}
			/>
		);

		return (
			<div className="CityMap" style={{ height: '100vh', width: '100%' }}>
				{activeCity && (
					<div data-simplebar className="sidebar city">
						<div className="sidebar__header">
							<div className="city__name">{activeCity.name}</div>
							<a className="city__link" href={`/goroda/${activeCity.slug}`} target="_blank">
								Страница города
							</a>
						</div>
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
							<div className="title">Заказать подбор квартиры</div>
						</div>
						<div className="mobileButton">
							<a href="#" className="btn btn__full btn__full--yellow">
								Заказать подбор квартиры
							</a>
						</div>
					</div>
				)}
				<div className="map-container">
					<GoogleMapReact
						bootstrapURLKeys={{
							key,
						}}
						center={center}
						defaultZoom={zoom}
					>
						{mapInfo &&
							mapInfo.map((city, key) => (
								<Marker key={key} slug={city.slug} name={city.name} lat={city.lat} lng={city.lng} />
							))}
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	mapInfo: selectCityBySlug(state, ownProps.slug),
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
)(CityMap);
