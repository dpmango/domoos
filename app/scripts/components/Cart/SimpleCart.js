import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SimpleCart extends PureComponent {
	static propTypes = {
		items: PropTypes.array.isRequired,
		handleDelete: PropTypes.func.isRequired,
		handleOpenCart: PropTypes.func.isRequired,
	};

	render() {
		const { items, handleDelete, handleOpenCart } = this.props;

		return (
			<div className="SimpleCart">
				{items.length > 0 && <div className="SimpleCart__title">Новостройки</div>}
				<div className="SimpleCart__content" data-simplebar>
					{items.length > 0
						? items
								.filter(item => item.type === 'buildings')
								.map((item, key) => (
									<div className="SimpleCart__item" key={key}>
										<div
											className="featured"
											style={{
												backgroundImage: `url('https://domoos.ru/images/novostroyki/${
													item.citySlug
												}/estates/${item.slug}.jpg') `,
											}}
										/>
										<div className="name">{item.name}</div>
										<div className="price">от {item.price} ₽</div>
										<div className="close" onClick={() => handleDelete(item)} />
									</div>
								))
						: 'У вас нет отложенных новостроек и квартир'}
				</div>
				{items.length > 0 && (
					<div className="SimpleCart__show-full">
						<div
							className="btn btn__full btn__full--yellow"
							onClick={() => handleOpenCart()}
						>
							Открыть весь список
						</div>
					</div>
				)}
			</div>
		);
	}
}

SimpleCart.defaultProps = {
	items: [],
	handleDelete: () => {},
	handleOpenCart: () => {},
};

export default SimpleCart;
