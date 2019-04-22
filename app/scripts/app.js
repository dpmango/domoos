import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import slick from 'slick-carousel';
import inputmask from 'inputmask';
import 'simplebar';
import noUiSlider from 'nouislider';
import wNumb from 'wNumb';
import select2 from 'select2';
import qs from 'qs';
import validate from 'jquery-validation';
import moment from 'moment';

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

	function formatNumberWithSpaces(num) {
		return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	var sliders = $('#range');
	var value = $('#output')[0];

	if (sliders.length) {
		sliders.each(function() {
			var $currentSlider = $(this)[0];
			noUiSlider.create($currentSlider, {
				start: [4500000],
				connect: [true, false],
				step: 100000,
				range: {
					min: 800000,
					max: 100000000,
				},
				format: wNumb({
					decimals: 0,
				}),
			});

			$currentSlider.noUiSlider.on('update', function(values, handle) {
				value.innerHTML = formatNumberWithSpaces(values[handle]);
			});
		});
	}

	// SELECTS
	$(function() {
		if ($('.js-select').length > 0) {
			$('.js-select').each(function(i, select) {
				var $select = $(select);
				$('.js-select').select2({
					placeholder: $select.attr('placeholder'),
					allowClear: true,
				});
			});
		}
	});

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
				.append(filtered);
		} else {
			$('#cities-filter')
				.html('')
				.append(allCities);
		}
	});
});

// modules
window.APP = {};

$(() => {
	window.APP.LeadForms.init();
	window.APP.SortCitiesJquery.init();
	setPageScrollOnLoad();
});

(function($, APP) {
	// jQuery validate plugin
	// https://jqueryvalidation.org

	APP.SortCitiesJquery = {
		init: function() {
			// itilial sorting equals to first sorting option
			this.sortInitilizer('[js-sort-list] li:first-child a');
			this.listenClicks();
		},
		listenClicks: function() {
			var _this = this;
			$('[js-sort-list] a').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				_this.sortInitilizer(this);
			});
		},
		sortInitilizer: function(from) {
			var _this = this;
			const $link = $(from);
			const $btn = $('[js-sort-list] button');
			const $wrapper = $('#cities-filter');
			const $list = $wrapper.find('.city');

			// get sort type from clicked link
			const sortType = $link.data('sort');

			if ($btn && sortType) {
				// update selector text
				$btn.find('span').text($link.text());
				_this.sortCities($list, sortType);
			}
		},

		sortCities: function($list, sortType) {
			if ($list.length === 0) return;
			const $wrapper = $('#cities-filter');

			const wHumbFormat = wNumb({
				thousand: '.',
			});

			const getPrice = el => {
				const price = wHumbFormat.from(
					$(el)
						.find('[data-price]')
						.data('price'),
				);
				return price;
			};

			const getPopulation = el => {
				const population = wHumbFormat.from(
					$(el)
						.find('[data-population]')
						.data('population'),
				);
				return population;
			};

			const getName = el => {
				return $(el)
					.find('[data-alphabet]')
					.data('alphabet');
			};

			const sortByPrice = (a, b) => {
				return getPrice(a) - getPrice(b); // ascending sort
			};

			const sortByPopulation = (a, b) => {
				return getPopulation(a) - getPopulation(b); // ascending sort
			};

			const sortByAlphabet = (a, b) => {
				if (getName(a) < getName(b)) {
					return -1;
				}
				if (getName(a) > getName(b)) {
					return 1;
				}
				return 0;
			};

			// SORTING RULES and NAMING
			const $sorted = $list.sort((a, b) => {
				switch (sortType) {
					case 'price':
						return sortByPrice(a, b);
					case 'population':
						return sortByPopulation(a, b);
					case 'alphabet':
						return sortByAlphabet(a, b);
					default:
						return sortByPrice(a, b);
				}
			});

			// APPEND SORTED TO CURRENT LIST
			$wrapper.prepend($sorted);
		},
	};
})(jQuery, window.APP);

(function($, APP) {
	// jQuery validate plugin
	// https://jqueryvalidation.org

	APP.LeadForms = {
		init: function() {
			this.validateForms();
		},
		validateForms: function() {
			var _this = this;
			var $forms = $('.js-lead-form:not(.is-validation-attached)');
			if ($forms.length === 0) return;

			/*
			 * Translated default messages for the jQuery validation plugin.
			 * Locale: RU (Russian; русский язык)
			 */
			$.extend($.validator.messages, {
				required: 'Это поле необходимо заполнить.',
				remote: 'Пожалуйста, введите правильное значение.',
				email: 'Пожалуйста, введите корректный адрес электронной почты.',
				url: 'Пожалуйста, введите корректный URL.',
				date: 'Пожалуйста, введите корректную дату.',
				dateISO: 'Пожалуйста, введите корректную дату в формате ISO.',
				number: 'Пожалуйста, введите число.',
				digits: 'Пожалуйста, вводите только цифры.',
				creditcard: 'Пожалуйста, введите правильный номер кредитной карты.',
				equalTo: 'Пожалуйста, введите такое же значение ещё раз.',
				extension: 'Пожалуйста, выберите файл с правильным расширением.',
				maxlength: $.validator.format('Пожалуйста, введите не больше {0} символов.'),
				minlength: $.validator.format('Пожалуйста, введите не меньше {0} символов.'),
				rangelength: $.validator.format(
					'Пожалуйста, введите значение длиной от {0} до {1} символов.',
				),
				range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'),
				max: $.validator.format('Пожалуйста, введите число, меньшее или равное {0}.'),
				min: $.validator.format('Пожалуйста, введите число, большее или равное {0}.'),
			});

			$forms.each(function(i, form) {
				var $form = $(form);

				var validationOptions = {
					errorPlacement: _this.validateErrorPlacement,
					highlight: _this.validateHighlight,
					unhighlight: _this.validateUnhighlight,
					submitHandler: _this.validateSubmitHandler,
					// rules to be set in html as well (merged props)
					rules: {
						email: {
							required: true,
							email: true,
						},
						leadPhone: _this.data.masks.phone,
					},
					messages: {
						email: {
							required: 'Заполните это поле',
							email: 'Формат email неверен',
						},
						leadPhone: {
							required: 'Заполните это поле',
							minlength: 'Введите корректный телефон',
						},
					},
				};

				$form.validate(validationOptions);

				$form.addClass('is-validation-attached');
			});
		},
		data: {
			masks: {
				phone: {
					required: true,
					normalizer: function(value) {
						var PHONE_MASK = '+X XXX XXX XX XX';
						if (!value || value === PHONE_MASK) {
							return value;
						} else {
							return value.replace(/[^\d]/g, '');
						}
					},
					minlength: 11,
					digits: true,
				},
			},
		},
		validateErrorPlacement: function(error, element) {
			error.addClass('ui-input__validation');
			error.appendTo(element.parent());
		},
		validateHighlight: function(element) {
			var $element = $(element);

			if ($element.is('select')) {
				$element.next().addClass('has-error');
			} else {
				$(element).addClass('has-error');
			}
		},
		validateUnhighlight: function(element) {
			var $element = $(element);

			if ($element.is('select')) {
				$element.next().removeClass('has-error');
			} else {
				$(element).removeClass('has-error');
			}
		},
		validateSubmitHandler: function(form) {
			var $form = $(form);
			$(form).addClass('loading');

			var formOptions = {
				date: moment().format('MMMM Do YYYY, HH:mm:ss'), //дата и время, когда заявка была оставлена
				city: $form.find('[name="city"]').val(), //город
				page: window.location.pathname, //страница с которой оставили заявку
				formType: $form.find('[name="formType"]').val(), // скрытое поле
				utmSource: getParameterByName('utm_source'), // переменная utm метки
				utmMedium: getParameterByName('utm_medium'), // переменная utm метки
				utmCampaign: getParameterByName('utm_campaign'), // переменная utm метки
				utmContent: getParameterByName('utm_content'), // переменная utm метки
				utmTerm: getParameterByName('utm_term'), // переменная utm метки
				// userID // id пользователя из данных метрики
				leadPhone: $form.find('[name="leadPhone"]').val(), // номер телефона
				leadName: $form.find('[name="leadName"]').val(), // имя
				leadDistrict: $form.find('[name="leadDistrict"]').val(), // район
				leadTimeBuild: checkboxGroupValues('[name="leadTimeBuild[]"]'), // срок сдачи
				leadPrice: rangeSliderValue('[name="leadPrice"]'), // стоимость
				leadCash: $form.find('[name="leadCash"]').val(), // наличные (чек-бокс)
				leadSubsidy: $form.find('[name="leadSubsidy"]').is(':checked'), // мат.капитал (чек-бокс)
				leadCashPartly: $form.find('[name="leadCashPartly"]').is(':checked'), // рассрочка (чек-бокс)
				leadHypothec: $form.find('[name="leadHypothec"]').is(':checked'), // ипотека (чек-бокс)
			};

			var ajaxData = {
				auth_key: 'zVdhENPArmryZFZNx4eftVGcIGcS4d_i',
				table_name: 'Domoos_leads',
				options: JSON.stringify({
					type: 'save',
					values: formOptions,
				}),
			};

			$.ajax({
				type: 'POST',
				url: `${__BASEURL__}/set`,
				data: ajaxData,
				success: function(response) {
					$form.removeClass('loading');
					if (response.error === 'no') {
						APP.LeadForms.reloadPageSucess();
					} else {
						$(form)
							.find('[data-error]')
							.html(data.message)
							.show();
					}
				},
			});
		},
		reloadPageSucess: function() {
			// sucess callback
			// 1. clear forms state

			// 2. keep position

			// 3. redirect with ?order
			const loc = window.location;
			const winTop = $(document).scrollTop();
			loc.href = `${loc.origin + loc.pathname}?order&page_y=${winTop}`;
		},
	};
})(jQuery, window.APP);

// Parse params from the URL
const getParameterByName = name => {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// scroll to specified url params (used on page reload)
const setPageScrollOnLoad = () => {
	if (window.location.href.indexOf('page_y') != -1) {
		//gets the number from end of url
		var match = window.location.href.split('?')[1].match(/\d+$/);
		var page_y = match[0];

		//sets the page offset
		$('html, body').scrollTop(page_y);
	}
};

// get checkbox values group to string
// checkboxGroupValues('[name="leadTimeBuild[]"]')
const checkboxGroupValues = name => {
	const $checkboxes = $(name);
	if ($checkboxes.length === 0) {
		return '';
	}
	let values = [];
	$checkboxes.each(function(i, cb) {
		if ($(cb).is(':checked')) {
			values.push($(cb).val());
		}
	});
	return values.join(', ');
};

// get noUIrange value
// rangeSliderValue('[name="leadPrice"]')
const rangeSliderValue = name => {
	const $ranges = $(name);
	if ($ranges.length === 0) {
		return '';
	}
	const range = $ranges.get(0);

	return range.noUiSlider.get();
};

// assing to window obj for debug
window.getParameterByName = getParameterByName;
window.checkboxGroupValues = checkboxGroupValues;
window.rangeSliderValue = rangeSliderValue;

// debug select
// $('.help-podbor__form form').last().find('[name="leadSubsidy"]').is(':checked')
