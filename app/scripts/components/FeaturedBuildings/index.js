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

	isAdded = (name, developer, price) => {
		const { CartItems } = this.props;
		// TODO - refactor to ID's. Backed saving CartItems with wrong ids
		// const result = CartItems.data.filter(item => item.id === id);
		const result = CartItems.data.find(
			x => x.name === name && x.developer === developer && x.price === price,
		);

		// return result[0] && result[0].id === id ? true : false;
		return result ? true : false;
	};

	handleAddToCart = item => {
		const { saveToCart, deleteFromCart } = this.props;
		if (this.isAdded(item.name, item.developer, item.price)) {
			deleteFromCart(item);
		} else {
			saveToCart(item);
		}
	};

	render() {
		const { CityBuildings } = this.props;
		const { activeCity, modal } = this.state;

		const buildings = CityBuildings[activeCity.slug];

		return (
			<React.Fragment>
				<div className="gorod-popular__head">
					<div className="gorod-popular__buttons">
						<div className="gorod-popular__overlay">
							<div className="gorod-popular__scroll">
								<a className="gorod-popular__btn is-active" href="#">
									Под ключ
								</a>
								<a className="gorod-popular__btn" href="#">
									Сданные
								</a>
								<a className="gorod-popular__btn" href="#">
									Недорогие
								</a>
								<a className="gorod-popular__btn" href="#">
									Элитные
								</a>
							</div>
						</div>
					</div>
					<div className="gorod-popular__links">
						<a className="gorod-popular__see-map" href="#">
							<div className="icon">
								<SvgIcon name="pin-blue" classModifier="pin" />
							</div>
							Смотреть на карте
						</a>
						<a className="gorod-popular__all-new" href="#">
							Все новостройки
						</a>
					</div>
				</div>
				<div className="gorod-popular__content">
					{!buildings ? (
						<Loader />
					) : (
						<div className="gorod-popular__grid mobile-gorod-carousel">
							{buildings.premium &&
								buildings.premium
									.slice(0, 6)
									.map((building, idx) => (
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
