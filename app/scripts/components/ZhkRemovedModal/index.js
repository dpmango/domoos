import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import { modalStyles } from '../../libs/utils';

class ZhkRemovedModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="zhkremoved"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="zhkremoved"]');
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
				<div className="Alert ZhkRemovedModal">
					<div className="Alert__wrapper ZhkRemovedModal__wrapper">
						<div className="Alert__header ZhkRemovedModal__header">
							<div className="Alert__illustration ZhkRemovedModal__illustration" style={{"backgroundImage": "url(/images/zhk-removed@x2.png)"}} />
							<div className="Alert__title ZhkRemovedModal__title">Новостройка удалена</div>
						</div>
						<div className="Alert__actions ZhkRemovedModal__actions">
							<a className="Alert__action ZhkRemovedModal__action--basket" href="#">Перейти в корзину</a>
							<span className="Alert__action ZhkRemovedModal__action--close" onClick={this.closeModal}>Закрыть</span>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ZhkRemovedModal;
