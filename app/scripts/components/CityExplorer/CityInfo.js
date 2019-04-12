import React, { Component } from 'react';
// import sortBy from 'lodash/sortBy';
// import indexOf from 'lodash/indexOf';

export default class InfoSection extends Component {
	// sort properties array in given order
	// no need YET - hardcoded in ducks/cities/cityInfo.js
	// applySorting = properties => {
	// 	const order = [
	// 		'Численность населения',
	// 		'Средняя зарплата',
	// 		'Стоимость квартир от',
	// 		'Регион',
	// 		'Климат',
	// 	];
	// 	return sortBy(properties, obj => indexOf(order, obj.title));
	// };

	render() {
		const { info, city } = this.props;

		return (
			<React.Fragment>
				<div className="CityExplorer__description">
					<div className="CityExplorer__title">О городе</div>
					<p>{info.description}</p>
					<a href={`/${city.slug}`} className="CityExplorer__learn-more" target="_blank">
						{`На страницу ${info.name_a}`}
					</a>
				</div>
				<div className="CityExplorer__about city">
					<div className="city__header">
						<img
							className="city__logo"
							src={`https://domoos.ru/images/goroda/gerb/${city.slug}.jpg`}
						/>
						О {info.name_e}
					</div>
					<ul className="city__properties">
						{info.properties &&
							info.properties.map((property, key) => (
								<li className="property" key={key}>
									<span className="title">{property.title}:</span>
									<span className="value">{property.value}</span>
								</li>
							))}
					</ul>
				</div>
			</React.Fragment>
		);
	}
}
