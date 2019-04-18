import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import PhoneForm from '../PhoneForm';

import { modalStyles } from '../../libs/utils';

class CommentModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="comment"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="comment"]');
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
				<div className="Modal CommentModal">
					<div className="Modal__wrapper CommentModal__wrapper">
						<div className="Modal__close" onClick={this.closeModal}>
							<div className="Modal__close--icon" />
						</div>
						<div className="Modal__header CommentModal__header">
							<div className="Modal__title">Оставьте ваш комментарий</div>
						</div>
						<div className="Modal__body CommentModal__body">
							<div className="Modal__form CommentModal__form">
								<div className="Modal__form--textfield">
									<input type="text" placeholder="Как вас зовут?" defaultValue="" />
								</div>
								<div className="Modal__form--textfield">
									<input type="text" placeholder="Тема ответа" defaultValue="" />
								</div>
								<div className="Modal__form--textfield">
									<textarea placeholder="Ваш ответ" defaultValue="" />
								</div>
								<div className="Modal__form--submit">Добавить комментарий</div>
								{/*<PhoneForm />*/}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default CommentModal;
