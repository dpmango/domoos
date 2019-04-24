import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhoneForm from '../PhoneForm';

class AdvancedCart extends PureComponent {
	static propTypes = {
		items: PropTypes.array.isRequired,
		handleDelete: PropTypes.func.isRequired,
		handleClose: PropTypes.func.isRequired,
	};

	render() {
		const { items, handleDelete, handleClose } = this.props;

		return (
			<div className="AdvancedCart">
				<div className="AdvancedCart__close" onClick={handleClose} />
				<div className="AdvancedCart__content">
					<div className="AdvancedCart__title">
						<a href="#">
							<div className="icon icon__question">
								<svg id="icon_question" viewBox="0 0 512 512" width="100%" height="100%">
									<circle cx="255.984" cy="492" r="20" fill="#dae0ed" />{' '}
									<path d="M412.979,155.775C412.321,69.765,342.147,0,255.984,0c-86.57,0-157,70.43-157,157c0,11.046,8.954,20,20,20     s20-8.954,20-20c0-64.514,52.486-117,117-117s117,52.486,117,117c0,0.356,0.009,0.71,0.028,1.062     c-0.405,46.562-28.227,88.348-71.12,106.661c-40.038,17.094-65.908,56.675-65.908,100.839V412c0,11.046,8.954,20,20,20     c11.046,0,20-8.954,20-20v-46.438c0-28.117,16.334-53.258,41.614-64.051c57.979-24.754,95.433-81.479,95.418-144.516     C413.016,156.585,413.003,156.179,412.979,155.775z" />
								</svg>
							</div>
						</a>
						Отложенные новостройки
					</div>
					<div className="AdvancedCart__items">
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
									{/* <div className="name">
										<a
											href={`/novostroyki/${item.citySlug}/${item.slug}`}
											target="_blank"
											rel="nofollow noopener"
										>
											{item.name}
										</a>
									</div> */}
									<div className="developer">{item.developer}</div>
									<div className="district">
										{item.region} {item.region ? 'р-н' : ''}
									</div>
									<div className="city">{item.city}</div>
									<div className="form">
										<PhoneForm placeholder="Ваш телефон" />
									</div>
									<div className="close">
										<div className="close-handler" onClick={() => handleDelete(item)} />
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="AdvancedCart__call">
					<div className="AdvancedCart__info">
						<div className="title">Закажите звонок</div>
						<div className="text">
							Специалист отдела продаж проконсультирует вас по всем выбранным новостройкам и
							квартирам
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
