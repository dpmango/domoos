import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import { modalStyles } from '../../libs/utils';

class NotificationModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="notification"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="notification"]');
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
				<div className="Alert NotificationModal">
					<div className="Alert__wrapper NotificationModal__wrapper">
						<div className="Alert__header NotificationModal__header">
							<div className="Alert__illustration NotificationModal__illustration" style={{"backgroundImage": "url(/images/notification@x2.png)"}} />
							<div className="Alert__title NotificationModal__title">Вы забыли сделать заявку</div>
						</div>
						<div className="Alert__body NotificationModal__body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec
						</div>
						<div className="Alert__actions NotificationModal__actions">
							<a className="Alert__action NotificationModal__action--follow" href="#">Перейти по ссылке</a>
							<span className="ZhkAddedModal__action--close" onClick={this.closeModal}>Закрыть</span>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default NotificationModal;
