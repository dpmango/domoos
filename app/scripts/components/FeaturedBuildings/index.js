import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { sliderSettings } from '../../libs/utils';

import { saveToCart, selectCartItems, deleteFromCart } from '../../ducks/cart/items';
import { selectCityBuildings, getCityBuildings } from '../../ducks/cities/cityBuildings';
import BuildingModal from '../BuildingModal';
import Building from '../Shared/Building/Building';

import Loader from '../UI/Loader';
import SvgIcon from '../UI/SvgIcon';

// TODO
// [] Вынести модальное карточки новостройки на глобальный уровень и подключить redux (повтор тут и в CityExplorer)

class FeatuedBuildings extends Component {
	state = {
		activeCity: {
			slug: undefined,
		},
		filter: {
			list: ['Под ключ', 'Сданные', 'Недорогие', 'Элитные'],
			activeFilter: 'Под ключ',
		},
		modal: {
			building: {},
			isOpen: false,
		},
	};

	// lifecycle hooks
	componentWillMount = () => {
		// get initial state from DOM props
		this.setState({
			activeCity: {
				slug: this.props.slug,
			},
		});
	};

	componentDidMount = () => {
		const { getCityBuildings, slug } = this.props;
		const { activeCity } = this.state;

		getCityBuildings(activeCity.slug);
	};

	// modal functions
	openBuildingsModal = item => {
		this.setState({
			...this.state,
			modal: {
				isOpen: true,
				building: { ...item },
			},
		});
	};

	closeModal = () => {
		this.setState({
			...this.state,
			modal: {
				...this.state.modal,
				isOpen: false,
			},
		});
	};

	isAdded = id => {
		const { CartItems } = this.props;
		const result = CartItems.data.filter(item => item.id === id);
		return result[0] && result[0].id === id ? true : false;
	};

	handleAddToCart = item => {
		const { saveToCart, deleteFromCart } = this.props;
		if (this.isAdded(item.id)) {
			deleteFromCart(item);
		} else {
			saveToCart(item);
		}
	};

	// Filter functions
	handleFilterChange = name => {
		this.setState({
			...this.state,
			filter: {
				...this.state.filter,
				activeFilter: name,
			},
		});
	};

	// computed render property
	applyFilters = buildings => {
		if (!buildings) return [];
		const { filter } = this.state;
		const allBuildings = [...buildings.premium, ...buildings.regular];

		let result = [];

		if (filter.activeFilter === 'Под ключ') {
			result = allBuildings.filter(x => x.features[1] === 'под ключ');
		} else if (filter.activeFilter === 'Сданные') {
			result = allBuildings.filter(x => x.features[2] === 'сдан');
		} else if (filter.activeFilter === 'Недорогие') {
			result = allBuildings.filter(x => x.features[0] === 'комфорт-класс');
		} else if (filter.activeFilter === 'Элитные') {
			result = allBuildings.filter(x => x.features[0] === 'элит-класс');
		} else {
			result = buildings.premium;
		}

		// limit filtered to 6 items
		return result.slice(0, 6);
	};

	render() {
		const { CityBuildings } = this.props;
		const { activeCity, modal, filter } = this.state;

		const buildings = this.applyFilters(CityBuildings[activeCity.slug]);

		return (
			<React.Fragment>
				<div className="gorod-popular__head">
					<div className="gorod-popular__buttons">
						<div className="gorod-popular__overlay">
							<div className="gorod-popular__scroll">
								{filter.list &&
									filter.list.map((name, idx) => (
										<span
											key={idx}
											onClick={() => this.handleFilterChange(name)}
											className={
												'gorod-popular__btn' +
												(filter.activeFilter.indexOf(name) !== -1 ? ' is-active' : '')
											}
										>
											{name}
										</span>
									))}
							</div>
						</div>
					</div>
					{/* <div className="gorod-popular__links">
						<a className="gorod-popular__see-map" href="#">
							<div className="icon">
								<SvgIcon name="pin-blue" classModifier="pin" />
							</div>
							Смотреть на карте
						</a>
						<a className="gorod-popular__all-new" href="#">
							Все новостройки
						</a>
					</div> */}
				</div>
				<div className="gorod-popular__content">
					{!buildings ? (
						<Loader />
					) : (
						<div className="gorod-popular__grid mobile-gorod-carousel">
							{buildings &&
								buildings.map((building, idx) => (
									<Building
										building={building}
										key={idx}
										handleAddToCart={this.handleAddToCart}
										handleModal={this.openBuildingsModal}
										isAdded={this.isAdded}
									/>
								))}
						</div>
					)}
				</div>

				<BuildingModal
					isVisible={modal.isOpen}
					handleClose={this.closeModal}
					data={modal.building}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	CartItems: selectCartItems(state),
	CityBuildings: selectCityBuildings(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			saveToCart,
			deleteFromCart,
			getCityBuildings,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FeatuedBuildings);
