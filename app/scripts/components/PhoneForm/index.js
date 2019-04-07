import React, { PureComponent } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

class PhoneForm extends PureComponent {
	static propTypes = {
		placeholder: PropTypes.string,
	};

	render() {
		const { placeholder, label } = this.props;
		return (
			<div className="PhoneForm">
				{label && (
					<label className="PhoneForm__label" dangerouslySetInnerHTML={{ __html: label }} />
				)}
				<div className="PhoneForm__content">
					<InputMask
						{...this.props}
						name="phone"
						type="tel"
						mask="+7 999 999 99 99"
						maskChar=" "
						placeholder={placeholder}
						className="PhoneForm__input"
					/>
					<div className="PhoneForm__submit btn btn__full btn__full--yellow">Отправить</div>
				</div>
				<div className="PhoneForm__form">
					<div className="btn btn__full btn__full--yellow">Позвонить</div>
				</div>
			</div>
		);
	}
}

PhoneForm.defaultProps = {
	placeholder: '+7',
};

export default PhoneForm;
