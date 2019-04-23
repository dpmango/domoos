import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class CallbackSuccessModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="callbacksuccess"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="callbacksuccess"]');
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
				<div className="Modal CallbackSuccessModal">
					<div className="Modal__wrapper CallbackSuccessModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header CallbackSuccessModal__header">
							{/* <img className="CallbackSuccessModal__logo" src="/images/modal-partner-logo.png" /> */}
							<img className="CallbackSuccessModal__icon" src="/images/success-blue@x2.png" />
							<div className="Modal__title">Спасибо за заявку</div>
						</div>
						<div className="Modal__body CallbackSuccessModal__body">
							<div className="CallbackSuccessModal__message">
								Перезвоним вам в ближайшее время
							</div>
						</div>

					</div>
				</div>
			</Modal>
		);
	}
}

export default CallbackSuccessModal;
