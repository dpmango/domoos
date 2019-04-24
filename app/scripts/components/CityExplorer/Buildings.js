import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { sliderSettings } from '../../libs/utils';

import { saveToCart, selectCartItems, deleteFromCart } from '../../ducks/cart/items';
import Building from '../Shared/Building/Building';

class BuildingsSection extends Component {
	isAdded = id => {
		const { CartItems } = this.props;
		const result = CartItems.data.filter(
			item => (item.isServerData ? item.buildID : item.id) === id,
		);

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

	render() {
		const { slug, cityDecl, premiumBuildings, handleModal } = this.props;

		return (
			<React.Fragment>
				<div className="CityExplorer__header">
					<span className="title">Популярные новостройки</span>
					{/* <a className="to-category-link" href={`zastrochiki/${slug}`} target="_blank">
						Все новостройки {cityDecl}
					</a> */}
				</div>
				<div className="CityExplorer__content">
					<Slider {...sliderSettings}>
						{premiumBuildings &&
							premiumBuildings.map((building, idx) => (
								<Building
									building={building}
									key={idx}
									handleAddToCart={this.handleAddToCart}
									handleModal={handleModal}
									isAdded={this.isAdded}
								/>
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
