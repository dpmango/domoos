import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class CallbackModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		var openSelector = document.querySelector('[data-open-modal="callback"]');
		openSelector.addEventListener('click', this.handleTriggerClick, false);
	}
	componentWillUnmount() {
		var openSelector = document.querySelector('[data-open-modal="callback"]');
		openSelector.removeEventListener('click', this.handleTriggerClick, false);
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
				<div className="CallbackModal">
					<div className="CallbackModal__wrapper">
						<div className="default-close" onClick={this.closeModal} />
						<div className="CallbackModal__title">Заказать обратный звонок</div>
						<div className="CallbackModal__content">
							<p>
								Услуга абсолютно бесплатная. Пожалуйста, укажите ваши контактные данные и наш
								специалист по подбору квартиры перезвонит вам в течение 10 минут.
							</p>
						</div>
						<div className="CallbackModal__form">
							<PhoneForm />
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default CallbackModal;
