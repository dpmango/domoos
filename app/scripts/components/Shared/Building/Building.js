import React from 'react';

const Building = ({ building, handleAddToCart, handleModal, isAdded }) => {
	return (
		<div className={`building ${building.isPremium ? 'premium' : ''}`} data-id={building.id}>
			<div
				className={`add-to-cart ${
					isAdded(building.name, building.developer, building.price) ? 'added' : ''
				}`}
				onClick={() => handleAddToCart(building, 'buildings')}
			/>
			<div className="building__image">
				<a
					className="building__featured"
					onClick={() => handleModal(building)}
					style={{
						backgroundImage: `url('https://domoos.ru/images/novostroyki/${
							building.citySlug
						}/estates/${building.slug}.jpg')`,
					}}
				/>
				{building.isPremium && <div className="premium-checked">Провереннная</div>}
				<a href="#" className="building__view" onClick={() => handleModal(building)}>
					Быстрый просмотр
				</a>
			</div>
			<div className="building__header" onClick={() => handleModal(building)}>
				<a className="building__title building__title--developer">
					Застройщик&nbsp;
					{building.developer}
				</a>
				<a className="building__title building__title--building">{building.name}</a>
			</div>
			<div className="building__content">
				<div className="building__features">
					{building.features &&
						building.features.map((feature, key) => (
							<div className="feature" key={key}>
								{key === 2 && 'Сдача: '}
								{feature}
							</div>
						))}
				</div>
				<div className="building__district">
					<span>{building.district} район</span>
				</div>

				<div className={`building__subway ${building.subway === '' && 'empty'}`}>
					<span>м. {building.subway}</span>
				</div>
			</div>
		</div>
	);
};

export default Building;
