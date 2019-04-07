import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { sliderSettings } from '../../libs/utils';

import { saveToCart, selectCartItems, deleteFromCart } from '../../ducks/cart/items';
import BuildingModal from '../BuildingModal';

class BuildingsSection extends Component {
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
		const { slug, cityDecl, premiumBuildings, handleModal } = this.props;

		return (
			<React.Fragment>
				<div className="CityExplorer__header">
					<span className="title">Популярные новостройки</span>
					<a className="to-category-link" href={`zastrochiki/${slug}`} target="_blank">
						Все новостройки {cityDecl}
					</a>
				</div>
				<div className="CityExplorer__content">
					<Slider {...sliderSettings}>
						{premiumBuildings &&
							premiumBuildings.map((building, key) => (
								<div
									className={`building ${building.isPremium ? 'premium' : ''}`}
									key={key}
									data-id={building.id}
								>
									<div
										className={`add-to-cart ${
											this.isAdded(building.name, building.developer, building.price) ? 'added' : ''
										}`}
										onClick={() => this.handleAddToCart(building, 'buildings')}
									/>
									<div className="building__image">
										<a
											className="building__featured"
											onClick={() => handleModal(building)}
											style={{
												backgroundImage: `url('https://domoos.ru/images/novostroyki/${
													building.citySlug
												}/estates/${building.slug}.jpg')`,
											}}
										/>
										{building.isPremium && <div className="premium-checked">Провереннная</div>}
										<a href="#" className="building__view" onClick={() => handleModal(building)}>
											Быстрый просмотр
										</a>
									</div>
									<div className="building__header" onClick={() => handleModal(building)}>
										<a className="building__title building__title--developer">
											Застройщик&nbsp;
											{building.developer}
										</a>
										<a className="building__title building__title--building">{building.name}</a>
									</div>
									<div className="building__content">
										<div className="building__features">
											{building.features &&
												building.features.map((feature, key) => (
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
		);
	}
}

const mapStateToProps = state => ({
	CartItems: selectCartItems(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			saveToCart,
			deleteFromCart,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BuildingsSection);
