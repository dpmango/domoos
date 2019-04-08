import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectCitiesList, getCitiesList } from '../../ducks/cities/citiesList';

import Suggest from '../Suggest';

class RegionSelector extends Component {
	state = {
		activeCity: {
			name: 'Санкт-Петербург',
			slug: 'peterburg',
		},
	};

	componentDidMount = () => {
		const { getCitiesList } = this.props;
		getCitiesList();
	};

	handleSuggest = (name, slug) => {
		this.setState({
			activeCity: {
				name,
				slug,
			},
		});
	};

	handeleSubmit = () => {
		const { activeCity } = this.state;
		const win = window.open(`goroda/${activeCity.slug}`, '_blank');
		win.focus();
	};

	render() {
		const { CitiesList, id, autofocus } = this.props;
		const { activeCity } = this.state;
		return (
			<div className="RegionSelector">
				<Suggest
					autofocus={autofocus}
					payload={CitiesList}
					placeholder={activeCity.name}
					label="Выберите район"
					handleSuggest={this.handleSuggest}
					handeleSubmit={this.handeleSubmit}
					id={id}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	CitiesList: selectCitiesList(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getCitiesList,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RegionSelector);
