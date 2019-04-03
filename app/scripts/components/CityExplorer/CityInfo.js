import React, { Component } from 'react';

export default class InfoSection extends Component {
	render() {
		const { info, city } = this.props;

		return (
			<React.Fragment>
				<div className="CityExplorer__description">
					<div className="CityExplorer__title">Исторический город</div>
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
						{info.properties.map((property, key) => (
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
