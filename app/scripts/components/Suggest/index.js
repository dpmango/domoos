import React, { PureComponent } from 'react';
import matchSorter from 'match-sorter';

// todo on 2 times focuseed after enter

const defaultCities = [
	{
		name: 'Москва',
		slug: 'moskva',
	},
	{
		name: 'Санкт-Петербург',
		slug: 'peterburg',
	},
	{
		name: 'Барнаул',
		slug: 'barnaul',
	},
	{
		name: 'Воронеж',
		slug: 'voronezh',
	},
	{
		name: 'Екатеринбург',
		slug: 'ekaterinburg',
	},
	{
		name: 'Киров',
		slug: 'kirov',
	},
	{
		name: 'Красноярск',
		slug: 'krasnoyarsk',
	},
	{
		name: 'Пермь',
		slug: 'perm',
	},
	{
		name: 'Томск',
		slug: 'tomsk',
	},
	{
		name: 'Тюмень',
		slug: 'tumen',
	},
	{
		name: 'Уфа',
		slug: 'ufa',
	},
	{
		name: 'Новосибирск',
		slug: 'novosibirsk',
	},
	{
		name: 'Челябинск',
		slug: 'chelyabinsk',
	},
];

class Suggest extends PureComponent {
	state = {
		inputValue: '',
		isVisible: false,
		searchResult: [...defaultCities],
		cursor: -1,
	};
	componentDidMount = () => {
		// const { autofocus } = this.props;
		// autofocus && this.suggest.focus();
	};

	searchItem = value => {
		const { payload } = this.props;

		const result = matchSorter(payload.data, value, {
			keys: ['name', { threshold: matchSorter.rankings.CONTAINS, key: 'alias' }],
		});

		this.setState({
			searchResult: result,
		});
	};

	onChange = e => {
		const { value } = e.target;

		this.setState({
			inputValue: value.toLowerCase(),
			isVisible: true,
		});

		value.length >= 1
			? this.searchItem(value)
			: this.setState({
					searchResult: [...defaultCities],
			  });
	};

	onFocus = () => {
		this.setState({
			isVisible: true,
		});
	};

	onBlur = () => {
		this.setState({
			isVisible: false,
		});
	};

	handleSuggest = (name, slug) => {
		const { handleSuggest } = this.props;
		this.setState({
			inputValue: name,
		});
		handleSuggest(name, slug);
	};

	onKeyPress = e => {
		const { inputValue, cursor, searchResult } = this.state;

		if (e.key === 'Enter' && inputValue.length > 0) {
			this.handleSuggest(searchResult[cursor].name, searchResult[cursor].slug);
			this.setState({
				inputValue: '',
				searchResult: [...defaultCities],
			});
		}

		if (e.key === 'Escape') {
			this.setState({
				inputValue: '',
				searchResult: [...defaultCities],
			});
		}

		if (e.keyCode === 38 && cursor > 0 && searchResult[cursor - 1].name) {
			this.setState(prevState => ({
				inputValue: searchResult[cursor - 1].name,
				cursor: prevState.cursor - 1,
			}));
		}

		if (e.keyCode === 40 && cursor < searchResult.length - 1 && searchResult[cursor + 1].name) {
			this.setState(prevState => ({
				inputValue: searchResult[cursor + 1].name,
				cursor: prevState.cursor + 1,
			}));
		}
	};

	render() {
		const { label, id, placeholder } = this.props;
		const { inputValue, searchResult, cursor, isVisible } = this.state;

		return (
			<div className={`Suggest ${isVisible ? 'focused' : ''}`}>
				<label htmlFor={`${id}-input`} className="Suggest__label">
					{label}
				</label>
				<input
					className="Suggest__input"
					type="text"
					autoComplete="new-password"
					placeholder={placeholder}
					value={inputValue}
					onChange={this.onChange}
					onKeyDown={this.onKeyPress}
					onMouseDown={this.onFocus}
					onBlur={this.onBlur}
					id={`${id}-input`}
					ref={input => {
						this.suggest = input;
					}}
				/>
				<div className={`Suggest__result ${isVisible && 'visible'}`}>
					{searchResult &&
						searchResult.map((city, key) => (
							<div
								className={`Suggest__link ${cursor === key && 'active'}`}
								key={key}
								onMouseDown={() => this.handleSuggest(city.name, city.slug)}
							>
								{city.name}
							</div>
						))}
				</div>
			</div>
		);
	}
}

export default Suggest;
