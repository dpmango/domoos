import React, { Component } from 'react';
import Modal from 'react-modal';

import { modalStyles } from '../../libs/utils';

class AboutModal extends Component {
	state = {
		modal: {
			isOpen: false,
		},
		tabs: [false, false, true], // should match number of tabs
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="about"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="about"]');
		[].forEach.call(openSelector, function(button) {
			button.removeEventListener('click', _this.handleTriggerClick, false);
		});
	}

	handleTriggerClick = () => {
		this.setState({
			modal: {
				isOpen: true,
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

	handleTabToggle = index => {
		let tabsStateClone = this.state.tabs;
		tabsStateClone[index] = !tabsStateClone[index];

		console.log(tabsStateClone);

		this.setState({
			...this.state,
			tabs: tabsStateClone,
		});
	};

	render() {
		const { modal } = this.state;

		return (
			<Modal isOpen={modal.isOpen} style={modalStyles} ariaHideApp={false}>
				<div className="Modal Modal--wide AboutModal">
					<div className="Modal__wrapper AboutModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header">
							<div className="Modal__title AboutModal__title">О сервисе</div>
						</div>
						<div className="Modal__body">
							<div className="AboutModal__description">
								<p>
									Наша миссия - упрощение покупки квартиры в новостройке. Точная и актуальная
									информация поможет вам выбрать именно то, что нужно. Мы убеждены, что каждый из нас
									заслуживает самый качественный сервис от застройщиков, банков и агентств
									недвижимости.
								</p>
							</div>
							<div className="AboutModal__tabs">
								<Tab
									toggleOpen={() => this.handleTabToggle(0)}
									isActive={this.state.tabs[0]}
									tabTitle="Как работает Allnewhomes"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
								<Tab
									toggleOpen={() => this.handleTabToggle(1)}
									isActive={this.state.tabs[1]}
									tabTitle="Бесплатные услуги сайта"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
								<Tab
									toggleOpen={() => this.handleTabToggle(2)}
									isActive={this.state.tabs[2]}
									tabTitle="Актуальная информация на сайте"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
								<Tab
									toggleOpen={() => this.handleTabToggle(3)}
									isActive={this.state.tabs[3]}
									tabTitle="Межрегиональные сделки"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
								<Tab
									toggleOpen={() => this.handleTabToggle(4)}
									isActive={this.state.tabs[4]}
									tabTitle="Партнеры нашего сервиса"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
								<Tab
									toggleOpen={() => this.handleTabToggle(5)}
									isActive={this.state.tabs[5]}
									tabTitle="Предложение застройщикам"
									tabContent="Мы сотрудничаем с крупнейшими строительными компаниями, агентствами и банками Санкт-Петербурга. В каталог сайта попадают только компании с безупречной репутацией и действительно качественным предложением."
								/>
							</div>
						</div>
				 		<div className="AboutModal__mobile">
						 	<div className="Modal__header">
				 				<div className="Modal__title AboutModal__title">Возможности сервиса</div>
							</div>
							<div className="Modal__body">
								<ul className="AboutModal__list">
									<li>
										<span>Поиск городов</span>
									</li>
									<li>
										<span>Подбор квартиры</span>
									</li>
									<li>
										<span>Получение ипотеки</span>
									</li>
									<li>
										<span>Выбор района</span>
									</li>
								</ul>
								</div>
				 		</div>
					</div>
				</div>
			</Modal>
		);
	}
}

const Tab = props => {
	return (
		<div className="AboutModal__tab">
			<div className={'Tab' + (props.isActive ? ' is-active' : '')} onClick={props.toggleOpen}>
				<div className="Tab__title">
					<span className="Tab__icon" />
					<span>{props.tabTitle}</span>
				</div>
				<div className="Tab__content">
					<p>{props.tabContent}</p>
				</div>
			</div>
		</div>
	);
};

export default AboutModal;
