import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhoneForm from '../PhoneForm';

class AdvancedCart extends PureComponent {
	static propTypes = {
		items: PropTypes.array.isRequired,
		handleDelete: PropTypes.func.isRequired,
		handleClose: PropTypes.func.isRequired,
	};

	componentWillReceiveProps = nextProps => {
		const { handleClose } = this.props;
		nextProps.items.length == 0 && handleClose();
	};

	render() {
		const { items, handleDelete, handleClose } = this.props;

		return (
			<div className="AdvancedCart">
				<div className="AdvancedCart__close" onClick={handleClose} />
				<div className="AdvancedCart__content">
					<div className="AdvancedCart__title">Отложенные новостройки</div>
					<div className="AdvancedCart__items">
						{console.log('items', items)}
						{items.length > 0 &&
							items.map((item, key) => (
								<div className="AdvancedCart__item" key={key}>
									<div
										className="featured"
										style={{
											backgroundImage: `url('https://domoos.ru/images/novostroyki/${
												item.citySlug
											}/estates/${item.slug}.jpg') `,
										}}
									/>
									<div className="name">
										<a
											href={`/novostroyki/${item.citySlug}/${item.slug}`}
											target="_blank"
											rel="nofollow noopener"
										>
											{item.name}
										</a>
									</div>
									<div className="developer">{item.developer}</div>
									<div className="ready">{item.ready}</div>
									<div className="district">{item.district} р-н</div>
									<div className="city">{item.city}</div>
									<div className="form">
										<PhoneForm placeholder="Ваш телефон" />
									</div>
									<div className="close">
										<div
											className="close-handler"
											onClick={() => handleDelete(item)}
										/>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="AdvancedCart__call">
					<div className="AdvancedCart__info">
						<div className="title">Закажите звонок</div>
						<div className="text">
							Специалист отдела продаж проконсультирует вас по всем выбранным
							новостройкам и квартирам
						</div>
					</div>
					<div className="AdvancedCart__form">
						<PhoneForm />
					</div>
				</div>
			</div>
		);
	}
}

AdvancedCart.defaultProps = {
	items: [],
	handleDelete: () => {},
	handleClose: () => {},
};

export default AdvancedCart;
