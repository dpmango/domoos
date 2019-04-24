import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import { modalStyles } from '../../libs/utils';

class InfoModal extends PureComponent {
	state = {
		modal: {
			isOpen: false,
		},
	};

	componentDidMount() {
		// bind selector from non-react part
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="info"]');
		[].forEach.call(openSelector, function(button) {
			button.addEventListener('click', _this.handleTriggerClick, false);
		});
	}
	componentWillUnmount() {
		const _this = this;
		var openSelector = document.querySelectorAll('[data-open-modal="info"]');
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
				<div className="Alert InfoModal">
					<div className="Alert__wrapper InfoModal__wrapper">
						<div className="Alert__header InfoModal__header">
							<div className="Alert__illustration InfoModal__illustration" style={{"backgroundImage": "url(/images/info@x2.png)"}} />
							<div className="Alert__title InfoModal__title">Чистовая отделка</div>
						</div>
						<div className="Alert__body InfoModal__body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
						</div>
						<div className="Alert__actions InfoModal__actions">
						<span className="Alert__action btn btn__ghost--black InfoModal__action--close" onClick={this.closeModal}>Закрыть</span>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default InfoModal;
