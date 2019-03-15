import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import PhoneForm from "../PhoneForm";

import { modalStyles } from "../../libs/utils";

class CallbackModal extends PureComponent {
	static propTypes = {
		isVisible: PropTypes.bool.isRequired
	};

	state = {};

	handleTabChange = id => {
		this.setState({
			activeTab: id
		});
	};

	render() {
		const { isVisible, handleClose } = this.props;

		return (
			<Modal isOpen={isVisible} style={modalStyles} ariaHideApp={false} onRequestClose={handleClose}>
				<div className="CallbackModal">
					<div className="default-close" onClick={handleClose} />
					<div className="CallbackModal__title">Заказать обратный звонок</div>
					<div className="CallbackModal__content">
						<p>
							Услуга абсолютно бесплатная. Пожалуйста, укажите ваши контактные данные и наш специалист по
							подбору квартиры перезвонит вам в течение 10 минут.
						</p>
					</div>
					<div className="CallbackModal__form">
						<PhoneForm />
					</div>
				</div>
			</Modal>
		);
	}
}

CallbackModal.defaultProps = {
	isVisible: true,
	handleClose: () => {}
};

export default CallbackModal;
