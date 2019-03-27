import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class BuildingModal extends PureComponent {
	static propTypes = {
		isVisible: PropTypes.bool.isRequired,
		data: PropTypes.object,
		tabs: PropTypes.array,
		handleClose: PropTypes.func,
	};

	state = {
		activeTab: 'about',
	};

	handleTabChange = id => {
		this.setState({
			activeTab: id,
		});
	};

	render() {
		const { isVisible, data, tabs, handleClose } = this.props;
		const { activeTab } = this.state;

		const aboutObj = [
			{
				title: 'Район',
				value: data.district,
			},
			{
				title: 'Сдача',
				value: data.features && data.features[2],
			},
			{
				title: 'Высотность',
				value: data.high ? data.high : '5 этажей',
			},
			{
				title: 'Отделка',

				value: data.features && data.features[1],
			},
			{
				title: 'Материал',
				value: data.material ? data.material : 'кирпичный',
			},
		];

		return (
			<Modal
				isOpen={isVisible}
				style={modalStyles}
				ariaHideApp={false}
				onRequestClose={handleClose}
			>
				<div className="BuildingModal">
					<div className="default-close" onClick={handleClose} />
					<div className="wrap">
						<div className="BuildingModal__head">
							<div className="BuildingModal__info">
								<div className="name">{data.name}</div>
								<div className="subway">Рядом со станцией метро {data.subway}</div>
							</div>
							<div className="BuildingModal__developer">
								<div
									className="logo"
									style={{
										backgroundImage: `url(
														https://domoos.ru/images/zastroyshchiki/${data.citySlug}/${
											data.developerSlug
										}.jpg), url('/images/domoos-dummy.png')`,
									}}
								/>
								<div className="info">
									<div className="title">Строительная компания:</div>
									<div className="name">{data.developer}</div>
								</div>
								<div className="BuildingModal__phone">
									<a href="tel:88126159251">+7 812 615 92 51</a>
								</div>
							</div>
						</div>
						<div className="BuildingModal__body">
							<div className="BuildingModal__content">
								<div className="featured">
									<img
										className="featured__image"
										src={`https://domoos.ru/images/novostroyki/${
											data.citySlug
										}/estates/${data.slug}.jpg`}
									/>
									<div className="subway">
										Рядом со станцией метро {data.subway}
									</div>
								</div>
							</div>
							<div className="BuildingModal__side">
								<div className="tabs">
									<div className="labels">
										{tabs.map((item, key) => (
											<div
												className={`labels__item ${
													activeTab === item.id ? 'active' : ''
												}`}
												key={key}
												onClick={() => this.handleTabChange(item.id)}
											>
												{item.title}
											</div>
										))}
									</div>
									<div className="content">
										{tabs.map((item, key) => {
											if (item.id === 'about' && item.id === activeTab)
												return (
													<div key={key} className="content__item">
														<div className="content__title">
															{item.title}
														</div>
														<div className="content__list">
															{aboutObj &&
																aboutObj.map((about, key) => (
																	<li key={key}>
																		<span className="title">
																			{about.title}:{' '}
																		</span>
																		<span className="value">
																			{about.value}
																		</span>
																	</li>
																))}
														</div>
													</div>
												);
											if (item.id === 'prices' && item.id === activeTab)
												return (
													<div key={key} className="content__item">
														<div className="content__title">
															{item.title}
														</div>
														<div className="content__list">1</div>
													</div>
												);
											if (item.id === 'location' && item.id === activeTab)
												return (
													<div key={key} className="content__item">
														<div className="content__title">
															{item.title}
														</div>
														<div className="content__list">1</div>
													</div>
												);
										})}
									</div>
								</div>
								<div className="BuildingModal__contact">
									<PhoneForm label="Оставь заявку  на обратный звонок" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

BuildingModal.defaultProps = {
	handleClose: () => {},
	isVisible: true,
	data: [],
	tabs: [
		{
			title: 'О новостройке',
			id: 'about',
		},
		{ title: 'Цены', id: 'prices' },
		{ title: 'Расположение', id: 'location' },
	],
};

export default BuildingModal;
