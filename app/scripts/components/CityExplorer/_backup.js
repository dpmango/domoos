<div className="CityExplorer__agencies">
	{info && !info.loading && agencies && !agencies.loading && (
		<React.Fragment>
			<div className="CityExplorer__header">
				<span className="title">Проверенные агентства недвижимости</span>
				<a className="to-category-link" href={`agentstva/${info.data.slug}`} target="_blank">
					Все агентства {info.data.name_a}
				</a>
			</div>
			<div className="CityExplorer__content">
				<Slider {...sliderSettings}>
					{agencies.data.map((agency, key) => (
						<div className="agency" key={key}>
							<a
								className="agency__logo"
								style={{
									backgroundImage: `url(
									https://domoos.ru/images/agentstva/${activeCity.slug}/${
										agency.slug
									}.jpg), url('/images/domoos-dummy.png')`,
								}}
							/>
							<a className="agency__title">{agency.name}</a>
							<div className="agency__services">
								Услуги:&nbsp;
								{agency.services}
							</div>
							<div className="agency__offers">
								В продаже обьектов:&nbsp;
								{agency.offers}
							</div>
						</div>
					))}
				</Slider>
			</div>
		</React.Fragment>
	)}
</div>;
