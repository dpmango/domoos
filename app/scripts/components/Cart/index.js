import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import {
	initCart,
	deleteFromCart,
	selectCartItems,
	showUnavailNotification,
} from '../../ducks/cart/items';
import { selectSessionID } from '../../ducks/user/session';

import AdvancedCart from './AdvancedCart';
import SimpleCart from './SimpleCart';

import { modalStyles } from '../../libs/utils';

const useTag = '<use xlink:href="/assets/images/icon.svg#icon_like" />';

class Cart extends PureComponent {
	state = {
		isSimpleView: false,
		isAdvancedView: false,
	};

	componentDidMount = () => {
		const { initCart, sessionID } = this.props;

		if (sessionID) {
			initCart(sessionID);
		}
	};

	handleHover = action => {
		this.setState({
			isSimpleView: action === 'enter' ? true : false,
		});
	};
	handleClick = () => {
		this.setState({
			isAdvancedView: true,
		});
	};

	handleOpenCart = () => {
		const { cartItems, showUnavailNotification } = this.props;

		if (cartItems.data.length > 0) {
			this.setState({
				isAdvancedView: !this.state.isAdvancedView,
			});
		} else {
			showUnavailNotification();
		}
	};

	handleCloseCart = () => {
		this.setState({
			isAdvancedView: false,
		});
	};

	handleDelete = id => {
		const { deleteFromCart } = this.props;
		deleteFromCart(id);
	};

	render() {
		const { cartItems } = this.props;
		const { isSimpleView, isAdvancedView } = this.state;

		return (
			<React.Fragment>
				<div
					className="Cart__content"
					onMouseEnter={() => this.handleHover('enter')}
					onMouseLeave={() => this.handleHover('leave')}
				>
					<span className="Cart__content-wrapper" onClick={this.handleOpenCart}>
						<span className="Cart__counter" onClick={this.handleClick}>
							{cartItems.data.length}
						</span>
						<svg
							className="Cart__icon icon icon__like"
							dangerouslySetInnerHTML={{ __html: useTag }}
							onClick={() => this.handleClick()}
						/>
						<span className="Cart__label">Отложено</span>
					</span>
					{isSimpleView && (
						<div className="Cart__items">
							<SimpleCart
								items={cartItems.data}
								handleDelete={this.handleDelete}
								handleOpenCart={this.handleOpenCart}
							/>
						</div>
					)}
				</div>
				<Modal
					isOpen={isAdvancedView && cartItems.data && cartItems.data.length > 0}
					style={modalStyles}
					ariaHideApp={false}
					onRequestClose={this.handleCloseCart}
				>
					<AdvancedCart
						items={cartItems.data}
						handleDelete={this.handleDelete}
						handleClose={this.handleCloseCart}
					/>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	sessionID: selectSessionID(state),
	cartItems: selectCartItems(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			initCart,
			deleteFromCart,
			showUnavailNotification,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Cart);
