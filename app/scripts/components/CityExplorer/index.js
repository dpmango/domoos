import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import { selectCityInfo, getCityInfo } from '../../ducks/cities/cityInfo';
import { selectCitiesList, getCitiesList } from '../../ducks/cities/citiesList';
import { selectCityBuildings, getCityBuildings } from '../../ducks/cities/cityBuildings';
import { selectCityDevelopers, getCityDevelopers } from '../../ducks/cities/cityDevelopers';
import { selectCityAgencies, getCityAgencies } from '../../ducks/cities/cityAgencies';
import { saveToCart, selectCartItems, deleteFromCart } from '../../ducks/cart/items';

// todo сделать проверку загружены ли данные
// todo распилить на 3 компонента
// todo не загружать страницу если выбран тот же город что и в запросе

import Suggest from '../Suggest';
import BuildingModal from '../BuildingModal';

import { sliderSettings } from '../../libs/utils';

class CitySelector extends PureComponent {
	state = {
		activeCity: {
			name: 'Санкт-Петербург',
			slug: 'peterburg',
		},
		modal: {
			building: {},
			isOpen: false,
		},
	};

	componentDidMount = () => {
		const {
			getCitiesList,
			getCityInfo,
			getCityDevelopers,
			getCityBuildings,
			getCityAgencies,
		} = this.props;
		const { activeCity } = this.state;

		getCitiesList();
		getCityInfo(activeCity.slug);
		getCityDevelopers(activeCity.slug);
		getCityBuildings(activeCity.slug);
		getCityAgencies(activeCity.slug);
	};

	handleSuggest = (name, slug) => {
		const { getCityInfo, getCityDevelopers, getCityBuildings, getCityAgencies } = this.props;

		getCityInfo(slug);
		getCityDevelopers(slug);
		getCityBuildings(slug);
		getCityAgencies(slug);

		this.setState({
			activeCity: {
				name,
				slug,
			},
		});
	};

	handleAddToCart = item => {
		const { saveToCart, deleteFromCart } = this.props;
		if (this.isAdded(item.id)) {
			deleteFromCart(item);
		} else {
			saveToCart(item);
		}
	};

	isAdded = id => {
		const { CartItems } = this.props;
		const result = CartItems.data.filter(item => item.id === id);

		return result[0] && result[0].id === id ? true : false;
	};

	handleModal = item => {
		this.setState({
			modal: {
				isOpen: true,
				building: { ...item },
			},
		});
	};

	closeModal = () => {
		this.setState({
			modal: {
				isOpen: false,
			},
		});
	};

	render() {
		const { CityInfo, CitiesList, CityDevs, CityBuildings, CityAgencies, id } = this.props;

		const { activeCity, modal } = this.state;

		const info = CityInfo[activeCity.slug];
		const devs = CityDevs[activeCity.slug];
		const buildings = CityBuildings[activeCity.slug];
		const agencies = CityAgencies[activeCity.slug];

		// developers sliders
		const DevevelopersSlider = () => (
			<Slider {...sliderSettings}>
				{devs.data.map((developer, idx) => (
					<div className="developer" key={idx}>
						<div
							className="developer__logo"
							style={{
								backgroundImage: `url('https://domoos.ru/images/zastroyshchiki/${
									developer.citySlug
								}/${developer.slug}.jpg'), url('/images/domoos-dummy.png')`,
							}}
						/>
						<div className="developer__title">
							<span>{developer.title}</span>
						</div>
						<div className="developer__features">
							{developer.features.map((feature, idx) => (
								<div
									className="feature"
									key={idx}
									data-id={idx}
									dangerouslySetInnerHTML={{
										__html: feature,
									}}
								/>
							))}
						</div>
					</div>
				))}
			</Slider>
		);

		return (
			<div className={`CityExplorer ${!info && !devs && !agencies ? 'loading' : ''}`}>
				<Suggest
					payload={CitiesList}
					placeholder={activeCity.name}
					label="Выберите город"
					handleSuggest={this.handleSuggest}
					id={id}
				/>
				<div className="CityExplorer__info ">
					{info && !info.loading && (
						<React.Fragment>
							<div className="CityExplorer__description">
								<div className="CityExplorer__title">Исторический город</div>
								<p>{info.data.description}</p>
								<a
									href={`/${activeCity.slug}`}
									className="CityExplorer__learn-more"
									target="_blank"
								>
									{`На страницу ${info.data.name_a}`}
								</a>
							</div>
							<div className="CityExplorer__about city">
								<div className="city__header">
									<img
										className="city__logo"
										src={`https://domoos.ru/images/goroda/gerb/${activeCity.slug}.jpg`}
									/>
									О {info.data.name_e}
								</div>
								<ul className="city__properties">
									{info.data.properties.map((property, key) => (
										<li className="property" key={key}>
											<span className="title">{property.title}:</span>
											<span className="value">{property.value}</span>
										</li>
									))}
								</ul>
							</div>
						</React.Fragment>
					)}
				</div>
				<div className="CityExplorer__developer">
					{info && !info.loading && devs && !devs.loading && (
						<React.Fragment>
							<div className="CityExplorer__header">
								<div className="title">Надежные застройщики</div>
								<a
									className="to-category-link"
									href={`zastrochiki/${activeCity.slug}`}
									target="_blank"
								>
									Все застройщики {info.data.name_a}
								</a>
							</div>

							<div className="CityExplorer__content">
								<DevevelopersSlider />
							</div>
						</React.Fragment>
					)}
				</div>
				<div className="CityExplorer__buildings">
					{info && !info.loading && buildings && !buildings.loading && (
						<React.Fragment>
							<div className="CityExplorer__header">
								<span className="title">Популярные новостройки</span>
								<a
									className="to-category-link"
									href={`zastrochiki/${info.data.slug}`}
									target="_blank"
								>
									Все новостройки {info.data.name_a}
								</a>
							</div>
							<div className="CityExplorer__content">
								<Slider {...sliderSettings}>
									{buildings.data.map((building, key) => (
										<div className={`building ${building.isPremium ? 'premium' : ''}`} key={key}>
											<div
												className={`add-to-cart ${this.isAdded(building.id) ? 'added' : ''}`}
												onClick={() => this.handleAddToCart(building, 'buildings')}
											/>
											<div className="building__image">
												<a
													className="building__featured"
													onClick={() => this.handleModal(building)}
													style={{
														backgroundImage: `url('https://domoos.ru/images/novostroyki/${
															building.citySlug
														}/estates/${building.slug}.jpg')`,
													}}
												/>
												{building.isPremium && <div className="premium-checked">Провереннная</div>}
												<a
													href="#"
													className="building__view"
													onClick={() => this.handleModal(building)}
												>
													Быстрый просмотр
												</a>
											</div>
											<div className="building__header" onClick={() => this.handleModal(building)}>
												<a className="building__title building__title--developer">
													Застройщик&nbsp;
													{building.developer}
												</a>
												<a className="building__title building__title--building">{building.name}</a>
											</div>
											<div className="building__content">
												<div className="building__features">
													{building.features.map((feature, key) => (
														<div className="feature" key={key}>
															{key === 2 && 'Сдача: '}
															{feature}
														</div>
													))}
												</div>
												<div className="building__district">
													<span>{building.district} район</span>
												</div>

												<div className={`building__subway ${building.subway === '' && 'empty'}`}>
													<span>м. {building.subway}</span>
												</div>
											</div>
										</div>
									))}
								</Slider>
							</div>
						</React.Fragment>
					)}
				</div>

				{/* CityExplorer__agencies - removed */}

				<BuildingModal
					isVisible={modal.isOpen}
					handleClose={this.closeModal}
					data={modal.building}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	CitiesList: selectCitiesList(state),
	CityInfo: selectCityInfo(state),
	CityDevs: selectCityDevelopers(state),
	CityBuildings: selectCityBuildings(state),
	CityAgencies: selectCityAgencies(state),
	CartItems: selectCartItems(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getCityInfo,
			getCitiesList,
			getCityDevelopers,
			getCityBuildings,
			getCityAgencies,
			saveToCart,
			deleteFromCart,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CitySelector);
