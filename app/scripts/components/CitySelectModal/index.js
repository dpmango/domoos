import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class CitySelectModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="cityselect"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="cityselect"]');
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

	render() {
		return (
			<Modal isOpen={this.state.modal.isOpen} style={modalStyles} ariaHideApp={false}>
				<div className="Modal Modal--wide CitySelectModal">
					<div className="Modal__wrapper CitySelectModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header CitySelectModal__header">
							<div className="Modal__title">Все города на сайте Domoos.ru</div>
						</div>
						<div className="Modal__body CitySelectModal__body">
							<div className="CitySelectModal__suggestion">
								<span className="CitySelectModal__suggestion--label">Ваш город Самара?</span>
								<a className="CitySelectModal__suggestion--follow" href="#">Перейти</a>
							</div>
							<div className="CitySelectModal__list">
								<div className="CitySelectModal__list--label">Выберите интересующий вас город</div>
								<div className="CitySelectModal__list--cities">
									<a href="#">Москва</a>
									<a href="#">Санкт-Петербург</a>
									<a href="#">Нижний Новгород</a>
									<a href="#">Новосибирск</a>
									<a href="#">Казань</a>
									<a href="#">Новосибирск</a>
									<a href="#">Москва</a>
									<a href="#">Санкт-Петербург</a>
									<a href="#">Нижний Новгород</a>
									<a href="#">Новосибирск</a>
									<a href="#">Казань</a>
									<a href="#">Новосибирск</a>
									<a href="#">Москва</a>
									<a href="#">Санкт-Петербург</a>
									<a href="#">Нижний Новгород</a>
									<a href="#">Новосибирск</a>
									<a href="#">Казань</a>
									<a href="#">Новосибирск</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default CitySelectModal;
