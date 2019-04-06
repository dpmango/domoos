import React, { PureComponent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DevelopersSection from './Developers';
import InfoSection from './CityInfo';
import BuildingsSection from './Buildings';
import Loader from '../UI/Loader';

import { selectCityInfo, getCityInfo } from '../../ducks/cities/cityInfo';
import { selectCitiesList, getCitiesList } from '../../ducks/cities/citiesList';
import { selectCityBuildings, getCityBuildings } from '../../ducks/cities/cityBuildings';
import { selectCityDevelopers, getCityDevelopers } from '../../ducks/cities/cityDevelopers';
import { selectCityAgencies, getCityAgencies } from '../../ducks/cities/cityAgencies';

import Suggest from '../Suggest';
import BuildingModal from '../BuildingModal';

class CitySelector extends PureComponent {
	state = {
		activeCity: {
			name: 'Санкт-Петербург',
			slug: 'peterburg',
		},
		modal: {
			building: {},
			isOpen: false,
		},
	};

	componentDidMount = () => {
		const {
			getCitiesList,
			getCityInfo,
			getCityDevelopers,
			getCityBuildings,
			getCityAgencies,
		} = this.props;
		const { activeCity } = this.state;

		getCitiesList();
		getCityInfo(activeCity.slug);
		getCityDevelopers(activeCity.slug);
		getCityBuildings(activeCity.slug);
		getCityAgencies(activeCity.slug);
	};

	handleSuggest = (name, slug) => {
		const { getCityInfo, getCityDevelopers, getCityBuildings, getCityAgencies } = this.props;
		const { activeCity } = this.state;

		// if same city selected in suggest - do nothing
		if (name === activeCity.name && slug === activeCity.slug) {
			return;
		}

		getCityInfo(slug);
		getCityDevelopers(slug);
		getCityBuildings(slug);
		getCityAgencies(slug);

		this.setState({
			activeCity: {
				name,
				slug,
			},
		});
	};

	openBuildingsModal = item => {
		this.setState({
			modal: {
				isOpen: true,
				building: { ...item },
			},
		});
	};

	closeModal = () => {
		this.setState({
			modal: {
				isOpen: false,
			},
		});
	};

	render() {
		const { CityInfo, CitiesList, CityDevs, CityBuildings, CityAgencies, id } = this.props;

		const { activeCity, modal } = this.state;

		const info = CityInfo[activeCity.slug];
		const devs = CityDevs[activeCity.slug];
		const buildings = CityBuildings[activeCity.slug];
		const agencies = CityAgencies[activeCity.slug];

		return (
			<div className={`CityExplorer ${!info && !devs && !agencies ? 'loading' : ''}`}>
				<Suggest
					payload={CitiesList}
					placeholder={activeCity.name}
					label="Выберите город"
					handleSuggest={this.handleSuggest}
					id={id}
				/>
				{!info && !devs && !agencies && <Loader />}
				<div className="CityExplorer__info ">
					{info && !info.loading && (
						<React.Fragment>
							<InfoSection city={activeCity} info={info.data} />
						</React.Fragment>
					)}
				</div>
				<div className="CityExplorer__developer">
					{info && !info.loading && devs && !devs.loading && (
						<DevelopersSection city={activeCity} cityDecl={info.data.name_a} developers={devs} />
					)}
				</div>
				<div className="CityExplorer__buildings">
					{info && !info.loading && buildings && !buildings.loading && (
						<BuildingsSection
							slug={info.data.slug}
							cityDecl={info.data.name_a}
							buildings={buildings}
							handleModal={this.openBuildingsModal}
						/>
					)}
				</div>

				{/* CityExplorer__agencies - removed */}

				<BuildingModal
					isVisible={modal.isOpen}
					handleClose={this.closeModal}
					data={modal.building}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	CitiesList: selectCitiesList(state),
	CityInfo: selectCityInfo(state),
	CityDevs: selectCityDevelopers(state),
	CityBuildings: selectCityBuildings(state),
	CityAgencies: selectCityAgencies(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getCityInfo,
			getCitiesList,
			getCityDevelopers,
			getCityBuildings,
			getCityAgencies,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CitySelector);
