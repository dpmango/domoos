import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class AssistanceRequestModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="assistance"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="assistance"]');
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
				<div className="Modal AssisttanceRequestModal">
					<div className="Modal__wrapper AssisttanceRequestModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header AssisttanceRequestModal__header">
							<div className="Modal__title">Подберем квартиру за час</div>
						</div>
						<div className="Modal__body AssisttanceRequestModal__body">
							<div className="Modal__form AssisttanceRequestModal__form">
								<div className="Modal__form--select">
									<input type="text" placeholder="Количество комнат" defaultValue="" />
								</div>
								<div className="Modal__form--select">
									<input type="text" placeholder="Максимальная стоимость" defaultValue="" />
								</div>
								<div className="Modal__form--select">
									<input type="text" placeholder="Какой район?" defaultValue="" />
								</div>
								<div className="Modal__form--textfield">
									<input type="text" placeholder="Ваш номер телефона" defaultValue="" />
								</div>
								<div className="Modal__form--submit">Заказать подбор</div>
								{/*<PhoneForm />*/}
							</div>
						</div>
						<div className="Modal__footer AssistanceRequestModal__footer">
							<div className="Modal__form--agreement">Нажимая на кнопку, я соглашаюсь на передачу моей персональной информации</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default AssistanceRequestModal;
