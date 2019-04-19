import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReactStars from 'react-stars';

import PhoneForm from '../PhoneForm';

import { formatNumber, clearPhone, modalStyles } from '../../libs/utils';

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
				value: data.district ? data.district : 'недоступно',
			},
			{
				title: 'Сдача',
				value: data.features && data.features[2],
			},
			{
				title: 'Высотность',
				value: data.altitude ? data.altitude : 'недоступно',
			},
			{
				title: 'Отделка',
				value: data.features && data.features[1],
			},
			{
				title: 'Материал',
				value: data.wallMaterial ? data.wallMaterial : 'недоступно',
			},
		];

		const priceObj = {
			list: [
				{
					title: 'Как купить',
					value: 'ипотека, рассрочка, обмен',
				},
				{
					title: 'Банки',
					value: 'Сбербанк, ВТБ, Абсолют, Открытие',
				},
			],
			prices: data.flats
				? data.flats.map(flat => {
						return {
							title: `${flat.rooms} - ${flat.square} кв.м`,
							value: `${formatNumber(flat.price)} ₽`,
						};
				  })
				: [],
		};

		const locationObj = {
			list: [
				{
					title: 'Район',
					value: data.district ? data.district : 'недоступно',
				},
				{
					title: 'Адрес',
					value: data.address ? data.address : 'недоступно',
				},
				{
					title: 'До центра',
					value: data.toCentr ? data.toCentr : 'недоступно',
				},
				{
					title: 'Метро',
					value: data.subway ? data.subway : 'недоступно',
				},
			],
			// metrics: [
			// 	{
			// 		title: 'Экология',
			// 		value: 5,
			// 	},
			// 	{
			// 		title: 'Инфраструктура',
			// 		value: 3,
			// 	},
			// ],
		};

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
										backgroundImage: `url(https://domoos.ru/${
											data.developerImage
										}), url('/images/domoos-dummy.png')`,
									}}
								/>
								<div className="info">
									<div className="title">Строительная компания:</div>
									<div className="name">{data.developer}</div>
								</div>
								<div className="BuildingModal__phone">
									{data.phone && <a href={`tel:${clearPhone(data.phone)}`}>{data.phone}</a>}
								</div>
							</div>
						</div>
						<div className="BuildingModal__body">
							<div className="BuildingModal__content">
								<div className="featured">
									<img
										className="featured__image"
										src={`https://domoos.ru/images/novostroyki/${data.citySlug}/estates/${
											data.slug
										}.jpg`}
									/>
									<div className="subway">Рядом со станцией метро {data.subway}</div>
								</div>
							</div>
							<div className="BuildingModal__side">
								<div className="tabs">
									<div className="labels">
										{tabs.map((item, key) => (
											<div
												className={`labels__item ${activeTab === item.id ? 'active' : ''}`}
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
														<ul className="content__list">
															{aboutObj &&
																aboutObj.map((about, key) => (
																	<li key={key}>
																		<span className="title">{about.title}: </span>
																		<span className="value">{about.value}</span>
																	</li>
																))}
														</ul>
													</div>
												);
											if (item.id === 'prices' && item.id === activeTab)
												return (
													<div key={key} className="content__item">
														<ul className="content__list">
															{priceObj.list &&
																priceObj.list.map((li, key) => (
																	<li className="no-bullet" key={key}>
																		<span className="title">{li.title}: </span>
																		<span className="value">{li.value}</span>
																	</li>
																))}
															{priceObj.prices &&
																priceObj.prices.map((price, key) => (
																	<li className="no-bullet" key={key}>
																		<span className="value">{price.title} — </span>
																		<span className="title">{price.value}</span>
																	</li>
																))}
															{priceObj.prices && (
																<div className="content__cta">
																	<a href="/" className="link">
																		Все цены
																	</a>
																</div>
															)}
														</ul>
													</div>
												);
											if (item.id === 'location' && item.id === activeTab)
												return (
													<div key={key} className="content__item">
														<ul className="content__list content__list--row">
															{locationObj.metrics &&
																locationObj.metrics.map((metric, key) => (
																	<li className="no-bullet" key={key}>
																		<span className="title">{metric.title}: </span>
																		<ReactStars
																			count={5}
																			size={15}
																			value={metric.value}
																			edit={false}
																			half={false}
																			color2="#ffd72b"
																			color1="#eceff6"
																		/>
																	</li>
																))}
														</ul>
														<ul className="content__list">
															{locationObj.list &&
																locationObj.list.map((li, key) => (
																	<li key={key}>
																		<span className="title">{li.title}: </span>
																		<span className="value">{li.value}</span>
																	</li>
																))}
														</ul>
													</div>
												);
										})}
									</div>
								</div>
								<div className="BuildingModal__contact">
									<PhoneForm label="Оставь заявку <br/>на обратный звонок" />
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
