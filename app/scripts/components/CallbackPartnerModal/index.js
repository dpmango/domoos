import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class CallbackPartnerModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="callbackpartner"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="callbackpartner"]');
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
				<div className="Modal CallbackPartnerModal">
					<div className="Modal__wrapper CallbackPartnerModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header CallbackPartnerModal__header">
							<img className="CallbackPartnerModal__logo" src="/images/modal-partner-logo.png" />
							<div className="Modal__title">С вами свяжется менеджер</div>
						</div>
						<div className="Modal__body CallbackPartnerModal__body">
							<div className="Modal__form CallbackPartnerModal__form">
								<div className="Modal__form--select">
									<input type="text" placeholder="Когда позвонить?" defaultValue="" />
								</div>
								<div className="Modal__form--textfield">
									<input type="text" placeholder="Ваш номер телефона" defaultValue="" />
								</div>
								<div className="Modal__form--submit">Заказать звонок</div>
								{/*<PhoneForm />*/}
							</div>
						</div>
						<div className="Modal__footer CallbackPartnerModal__footer">
							<div className="Modal__form--agreement">Нажимая на кнопку, я соглашаюсь на передачу моей персональной информации</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default CallbackPartnerModal;
