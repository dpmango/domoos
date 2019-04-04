import React, { Component } from 'react';
import Slider from 'react-slick';
import { sliderSettings } from '../../libs/utils';

export default class Developers extends Component {
	render() {
		const { developers, city, cityDecl } = this.props;

		return (
			<React.Fragment>
				<div className="CityExplorer__header">
					<div className="title">Надежные застройщики</div>
					<a className="to-category-link" href={`zastrochiki/${city.slug}`} target="_blank">
						Все застройщики {cityDecl}
					</a>
				</div>

				<div className="CityExplorer__content">
					<Slider {...sliderSettings}>
						{developers.data &&
							developers.data.map((developer, idx) => (
								<div className="developer" key={idx}>
									<div
										className="developer__logo"
										style={{
											backgroundImage: `url('https://domoos.ru/images/zastroyshchiki/${
												developer.citySlug
											}/${developer.slug}.jpg'), url('/images/domoos-dummy.png')`,
										}}
									/>
									<div className="developer__title">
										<span>{developer.title}</span>
									</div>
									<div className="developer__features">
										{developer.features &&
											developer.features.map((feature, idx) => (
												<div
													className="feature"
													key={idx}
													data-id={idx}
													dangerouslySetInnerHTML={{
														__html: feature,
													}}
												/>
											))}
									</div>
								</div>
							))}
					</Slider>
				</div>
			</React.Fragment>
		);
	}
}
