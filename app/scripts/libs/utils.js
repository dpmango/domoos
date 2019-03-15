export function formatNumber(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const generateID = () => {
	return (
		"_" +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
};

export const cookieSettings = {
	path: "/",
	expires: 30,
	domain: window.location.host.replace(/^(api\.){1}/, "")
};

export const modalStyles = {
	overlay: {
		backgroundColor: null,
		position: null,
		top: null,
		left: null,
		right: null,
		bottom: null
	},
	content: {
		top: null,
		left: null,
		right: null,
		bottom: null,
		border: null,
		background: null,
		borderRadius: null,
		padding: null,
		position: null
	}
};

export const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 9999,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1.3,
				slidesToScroll: 1,
				arrows: false
			}
		}
	]
};
