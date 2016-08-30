(function($){

	"use strict";

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.page-loader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization general scripts for all pages
		/* ---------------------------------------------- */

		var hero        = $('#hero'),
			modules     = $('.module-hero, .module, .module-small'),
			navbar      = $('.navbar-custom'),
			worksgrid   = $('#works-grid'),
			filters     = $('#filters'),
			wrapper     = $('.wrapper'),
			footer      = $('.footer'),
			navbatTrans,
			mobileTest;

		/* ---------------------------------------------- /*
		 * Mobile detect
		/* ---------------------------------------------- */

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		} else {
			mobileTest = false;
		}

		/* ---------------------------------------------- /*
		 * Setting background of modules
		/* ---------------------------------------------- */

		modules.each(function() {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* ---------------------------------------------- /*
		 * Parallax
		/* ---------------------------------------------- */

		if (mobileTest === true) {
			$('.module-parallax').css({'background-attachment': 'scroll'});
		} else {
			$('#hero.module-parallax').parallax('50%', 0.2);
		}

		/* ---------------------------------------------- /*
		 * Hero height
		/* ---------------------------------------------- */

		$(window).resize(function() {
			if (hero.length > 0 && hero.hasClass('js-fullheight') ) {
				hero.height($( window ).height());
			} else if (hero.length > 0) {
				hero.height($( window ).height() * 0.7);
			}
		}).resize();

		/* ---------------------------------------------- /*
		 * Intro slider setup
		/* ---------------------------------------------- */

		$('#slides').superslides({
			play: 10000,
			animation: 'fade',
			animation_speed: 800,
			pagination: true,
		});

		/* ---------------------------------------------- /*
		 * Youtube video background
		/* ---------------------------------------------- */

		$(function(){
			$('.video-player').mb_YTPlayer();
		});

		/* ---------------------------------------------- /*
		 * Text Rotator
		/* ---------------------------------------------- */

		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		if (navbar.length > 0 && hero.length > 0) {
			$(window).scroll(function() {
				var topScroll = $(window).scrollTop();
				if (topScroll >= 5) {
					navbar.removeClass('navbar-transparent');
				} else {
					navbar.addClass('navbar-transparent');
				}
			}).scroll();
		} else {
			navbar.removeClass('navbar-transparent');
		}

		/* ---------------------------------------------- /*
		 * Portfolio
		/* ---------------------------------------------- */

		$('a', filters).on('click', function() {
			var selector = $(this).attr('data-filter');

			$('.current', filters).removeClass('current');
			$(this).addClass('current');

			worksgrid.isotope({
				filter: selector
			});

			return false;
		});

		$(window).on('resize', function() {
			worksgrid.imagesLoaded(function() {
				worksgrid.isotope({
					layoutMode: 'masonry',
					itemSelector: '.work-item',
					transitionDuration: '0.3s',
				});
			});
		}).resize();

		/* ---------------------------------------------- /*
		 * Owl sliders
		/* ---------------------------------------------- */

		$('.slider-images').owlCarousel({
			singleItem: true,
			autoHeight: false,
			navigation: true,
			pagination: false,
			autoPlay:   3000,
			navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		});

		$('.carousel-clients').owlCarousel({
			singleItem: false,
			autoHeight: false,
			navigation: true,
			pagination: false,
			autoPlay:   3000,
			navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		});

		/* ---------------------------------------------- /*
		 * Fixed Footer
		/* ---------------------------------------------- */

		$(window).on('resize', function() {
			var width = Math.max($(window).width(), window.innerWidth);

			if (width > 767) {
				wrapper.css('margin-bottom', footer.outerHeight());
			} else {
				wrapper.css('margin-bottom', 0);
			}
		}).resize();

		/* ---------------------------------------------- /*
		 * Progress bars, counters animations
		/* ---------------------------------------------- */

		$('.progress-bar').each(function() {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('.progress-value').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
			});
		});

		$('.counter').each(function() {
			$(this).appear(function() {
				var number = $(this).find('.counter-timer').attr('data-to');
				$(this).find('.counter-timer').countTo({from: 0, to: number, speed: 1500, refreshInterval: 30});
			});
		});

		/* ---------------------------------------------- /*
		 * Video popup, Gallery
		/* ---------------------------------------------- */

		$('.video-popup').magnificPopup({
			type: 'iframe'
		});

		$('.image-popup').magnificPopup({
			type: 'image'
		});

		$('a.project-gallery').magnificPopup({
			type: 'image',
			gallery: { enabled: true },
		});

		/* ---------------------------------------------- /*
		 * WOW Animation
		/* ---------------------------------------------- */

		var wow = new WOW({
			mobile: false
		});

		wow.init();

		/* ---------------------------------------------- /*
		 * Collapse navbar on click
		/* ---------------------------------------------- */

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		$('.section-scroll').on('click', function(e) {
			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing');

			e.preventDefault();
		});

		/* ---------------------------------------------- /*
		 * Scroll top
		/* ---------------------------------------------- */

		$(window).scroll(function() {
			if ($(this).scrollTop() > 300) {
				$('.scroll-up').addClass('scroll-top-show');
			} else {
				$('.scroll-up').removeClass('scroll-top-show');
			}
		});

		$('a[href="#totop"]').on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

		/* ---------------------------------------------- /*
		 * Google Map
		/* ---------------------------------------------- */

		var mapID = $('#map');
		var isDraggable = Math.max($(window).width(), window.innerWidth) > 480 ? true : false;

		mapID.each(function() {

			var GMaddress = mapID.attr('data-address');

			mapID.gmap3({
				action: "init",
				marker: {
					address: GMaddress,
					options: {
						icon: 'assets/images/map-icon.png'
					}
				},
				map: {
					options: {
						zoom: 16,
						zoomControl: true,
						zoomControlOptions: {
							style: google.maps.ZoomControlStyle.SMALL
						},
						mapTypeControl: true,
						scaleControl: false,
						scrollwheel: false,
						streetViewControl: false,
						draggable: isDraggable,
						styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
					}
				}
			});

		});

	});

})(jQuery);
