import React, { Component } from 'react';
import ReactStars from 'react-stars';

class CityInfo extends Component {
	filterOptions = options => {
		const removeByIndex = (list, index) => [...list.slice(0, index), ...list.slice(index + 1)];

		// if (this.props.isCityMap) {
		// 	return removeByIndex(options, 3);
		// }
		return options;
	};
	render() {
		const { activeCity, isCityMap, handleCloseSidebar } = this.props;

		return (
			<div data-simplebar className="sidebar city">
				<div className="sidebar__header">
					<div className="sidebar__close" onClick={handleCloseSidebar} />
				</div>
				<div
					className="city__img"
					style={{
						backgroundImage: `url(https://domoos.ru/images/goroda/preview/${activeCity.slug}.jpg)`,
					}}
				/>

				{!isCityMap && (
					<a className="city__link" href={`/${activeCity.slug}`} target="_blank">
						Страница города
					</a>
				)}

				<div className="city__name">{activeCity.name}</div>
				<div className="city__description">{activeCity.description}</div>
				{!isCityMap && (
					<div className="city__ratings">
						{/* {activeCity.ratings &&
							activeCity.ratings.map((rating, key) => (
								<div key={key} className="rating">
									<div className="rating__title">{rating.title}</div>
									<div className="rating__stars">
										<ReactStars
											count={5}
											size={15}
											value={rating.value}
											edit={false}
											half={false}
											color2="#ffd72b"
											color1="#eceff6"
										/>
									</div>
								</div>
							))} */}
						<div />
					</div>
				)}
				<ul className="city__options">
					{activeCity.ratings &&
						this.filterOptions(activeCity.options).map((option, key) => (
							<li key={key} className="option">
								<span className="option__title">{option.title}:</span>
								<span className="option__value">{option.value}</span>
							</li>
						))}
					<div />
				</ul>
				{!isCityMap && (
					<div className="city__neighbors">
						<div className="title">Ближайшие города:</div>
						<div className="content">{activeCity.neighbors}</div>
					</div>
				)}
				<div className="map-form">
					{/* {isCityMap ? (
						<div className="title">Заказать подбор квартиры</div>
					) : ( */}
						<React.Fragment>
							<div className="title">Заказать подбор квартиры</div>

							{/* {!isCityMap && (
								<div className="desc">Это бесплатная услуга</div>
							)} */}

							<div className="hotcall__form">
								<input type="tel" placeholder="+7" className="hotcall__input" im-insert="true" />
								<input
									name="submit"
									type="submit"
									value="Отправить"
									className="hotcall__submit btn btn__full btn__full--yellow"
								/>
							</div>
						</React.Fragment>

				</div>
				{/* <div className="mobileButton">
					<a href="#" className="btn btn__full btn__full--yellow">
						Заказать подбор квартиры
					</a>
				</div> */}
			</div>
		);
	}
}

export default CityInfo;
