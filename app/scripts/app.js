import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import slick from 'slick-carousel';
import inputmask from 'inputmask';
import 'simplebar';
import noUiSlider from 'nouislider';

$(() => {
	svg4everybody();
});

const selectors = document.querySelectorAll('input[type=tel]');
inputmask('+7 999 999 99 99', { placeholder: ' ' }).mask(selectors);

$(window).scroll(function() {
	var sticky = $('.sticky'),
		scroll = $(window).scrollTop();
	var headerHeight = $('.header').outerHeight();
	if (scroll >= headerHeight) sticky.addClass('fixed');
	else sticky.removeClass('fixed');
});

$(document).on('click', function(e) {
	e.stopPropagation();
	if ($(e.target).closest('#sidebar').length === 0) {
		$('#sidebar').removeClass('open');
	}
});

$(document).on('click', '[href="#"]', function(e) {
	e.preventDefault();
});

$('#sidebar-toggle, #sidebar-toggle-fixed').on('click', function(e) {
	e.stopPropagation();
	$('#sidebar').toggleClass('open');
});

$('#sidebar-close').on('click', function(e) {
	e.stopPropagation();
	$('#sidebar').removeClass('open');
});

$('[js-open-comments]').on('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(this)
		.parent()
		.addClass('is-hidden');
	$(this)
		.parents('.comments__block')
		.removeClass('is-closed');
});

$('#all-cities-filter-toggle').on('click', function(e) {
	e.stopPropagation();
	$('#cities-filter-tags').toggleClass('open');
});

$(document).ready(function($) {
	$('#main-page-services-tabs .labels li').on('click', function() {
		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');
	});

	$(document).on('click', '[js-gorod-tab]', function(e) {
		e.preventDefault();
		var $self = $(this),
			tabIndex = $self.index();
		$self.siblings().removeClass('is-active');
		$self.addClass('is-active');
		$('.about-city__tab')
			.removeClass('is-active')
			.css('display', 'none')
			.eq(tabIndex)
			.fadeIn();
	});

	$(document).on('click', '[js-buildings-tab]', function(e) {
		e.preventDefault();
		var $self = $(this),
			tabIndex = $self.index();
		$self.siblings().removeClass('is-active');
		$self.addClass('is-active');
		$('.gorod-popular__tab')
			.removeClass('is-active')
			.css('display', 'none')
			.eq(tabIndex)
			.fadeIn();
		$('.mobile-gorod-carousel').slick('setPosition');
	});

	// TODO - зачем здесь повтор ready ?
	$(document).ready(function() {
		var output = document.getElementById('output');
		var input = document.getElementById('range');

		input.addEventListener('input', rangeHandler);
		input.addEventListener('change', rangeHandler);

		function rangeHandler(e) {
			output.textContent = formatNumberWithSpaces(e.target.value);
		}
	});

	// Format with spaces
	function formatNumberWithSpaces(num) {
		return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	// Initialize slider:
	var rangeSlider = $('#range');
	if (rangeSlider.length) {
		rangeSlider.each(function(i, slider) {
			var $slider = $(slider);
			noUiSlider.create(slider, {
				start: [4500000],
				connect: true,
				step: 1,
				range: {
					min: 200000,
					max: 100000000,
				},
			});
		});
	}

	$('.carousel').slick({
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		rows: 0,
		responsive: [
			{
				breakpoint: 9999,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					arrows: true,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					arrows: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	});

	$('.carousel-builders').slick({
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 9999,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 528,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	});

	// $('.not-real-carousel').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 500,
	// 	rows: 0,
	// 	responsive: [
	// 		{
	// 			breakpoint: 9999,
	// 			settings: 'unslick',
	// 		},
	// 		{
	// 			breakpoint: 1200,
	// 			settings: {
	// 				slidesToShow: 1.4,
	// 				slidesToScroll: 1,
	// 				arrows: false,
	// 			},
	// 		},
	// 	],
	// });

	function personalInfoSliderInit2() {
		if ($(document).width() > 768) {
			if ($('.mobile-gorod-carousel').hasClass('slick-initialized'))
				$('.mobile-gorod-carousel').slick('unslick');
		} else {
			if (!$('.mobile-gorod-carousel').hasClass('slick-initialized')) {
				$('.mobile-gorod-carousel').slick({
					dots: false,
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 9999,
							settings: 'unslick',
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								arrows: false,
							},
						},
						{
							breakpoint: 568,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
							},
						},
					],
				});
			}
		}
	}

	personalInfoSliderInit2();

	$(window).resize(function() {
		personalInfoSliderInit2();
	});

	function personalInfoSliderInitMain() {
		if ($(document).width() > 768) {
			if ($('.not-real-carousel').hasClass('slick-initialized'))
				$('.not-real-carousel').slick('unslick');
		} else {
			if (!$('.not-real-carousel').hasClass('slick-initialized')) {
				$('.not-real-carousel').slick({
					dots: false,
					infinite: true,
					speed: 500,
					rows: 0,
					responsive: [
						{
							breakpoint: 9999,
							settings: 'unslick',
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
							},
						},
					],
				});
			}
		}
	}

	personalInfoSliderInitMain();

	$(window).resize(function() {
		personalInfoSliderInitMain();
	});

	function personalInfoSliderInit() {
		if ($(document).width() > 768) {
			if ($('.gorod-carousel').hasClass('slick-initialized')) $('.gorod-carousel').slick('unslick');
		} else {
			if (!$('.gorod-carousel').hasClass('slick-initialized')) {
				$('.gorod-carousel').slick({
					dots: false,
					infinite: true,
					speed: 500,
					rows: 0,
					responsive: [
						{
							breakpoint: 9999,
							settings: 'unslick',
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								// dots: true,
								customPaging: function(slider, i) {
									var thumb = $(slider.$slides[i]).data();
									return '<a>' + i + '</a>';
								},
							},
						},
					],
				});
			}
		}
		//custom function showing current slide
		var $status = $('.pagingInfo');
		var $slickElement = $('.gorod-carousel');

		$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			$status.text(i + '/' + slick.slideCount);
		});
	}

	personalInfoSliderInit();

	$(window).resize(function() {
		personalInfoSliderInit();
	});

	// $('.not-real-carousel-developer').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 500,
	// 	rows: 0,
	// 	responsive: [
	// 		{
	// 			breakpoint: 9999,
	// 			settings: 'unslick',
	// 		},
	// 		{
	// 			breakpoint: 768,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 1,
	// 				arrows: false,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 528,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				arrows: false,
	// 			},
	// 		},
	// 	],
	// });

	var allCities = $('#cities-filter').children();

	// var searchedItems = [];
	var sliceBy = 9;

	$('.city-filter__content .city-filter__item').on('click', function() {
		var filteredWord;

		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			filteredWord = '';
		} else {
			$(this)
				.addClass('selected')
				.siblings()
				.removeClass('selected');
			filteredWord = $(this)
				.text()
				.toLowerCase();
		}
		// multi
		// if (searchedItems.indexOf(filteredWord) !== -1) {
		// 	var filtered = searchedItems.filter(function(e) {
		// 		return e !== filteredWord;
		// 	});
		// 	searchedItems = filtered;
		// } else {
		// 	searchedItems.push(filteredWord);
		// }

		var filtered = $(allCities).filter(function() {
			var tags = $(this)
				.attr('data-category')
				.split(', ');
			var das = tags.indexOf(filteredWord) !== -1 && true;

			var das = $.grep(tags, function(element) {
				return element.indexOf(filteredWord) !== -1;
				// multi
				// return $.inArray(element, searchedItems) !== -1;
			});

			if (das.length > 0) {
				return true;
			}
		});

		if (filtered.length > 0) {
			$('#cities-filter')
				.html('')
				.append(filtered.slice(0, sliceBy));
		} else {
			$('#cities-filter')
				.html('')
				.append(allCities.slice(0, sliceBy));
		}
	});
});
