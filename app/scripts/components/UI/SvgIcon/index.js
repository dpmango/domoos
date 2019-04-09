import React from 'react';

const SvgIcon = ({ name, classModifier, clickHandler }) => {
	if (name === null) {
		return null;
	}

	const spritePath = '/assets/images/icon.svg';
	const classModifierOrClass = classModifier ? classModifier : name;

	return (
		<svg onClick={clickHandler} className={'icon icon__' + classModifierOrClass}>
			<use xlinkHref={spritePath + '#icon_' + name} />
		</svg>
	);
};

export default SvgIcon;
