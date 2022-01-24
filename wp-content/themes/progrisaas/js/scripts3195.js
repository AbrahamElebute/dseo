( function( $ ) {
    'use strict';

    /* rtl check */
	function rtl_owl(){
	if ($('body').hasClass("rtl")) {
		return true;
	} else {
		return false;
	}};

	function rtl_isotop(){
        if ($('body').hasClass("rtl")) {
            return false;
        } else {
            return true;
    }};

	/* --------------------------------------------------
    * preloader
    * --------------------------------------------------*/
	if ( $('#royal_preloader').length ) {
		var $selector       = $('#royal_preloader'),
			$width          = $selector.data('width'),
			$height         = $selector.data('height'),
			$color          = $selector.data('color'),
			$bgcolor        = $selector.data('bgcolor'),
			$logourl        = $selector.data('url');
		
		Royal_Preloader.config({
			mode           : 'logo',
			logo           : $logourl,
			logo_size      : [$width, $height],
			showProgress   : true,
			showPercentage : true,
			text_colour: $color,
			background:  $bgcolor,
		});        
	};

    /* --------------------------------------------------
    * sticky header
    * --------------------------------------------------*/
	$('.header-static .is-fixed').parent().append('<div class="header-clone"></div>');
	$('.header-clone').height($('#site-header .is-fixed').outerHeight());
	$('.header-static .header-clone').hide();	
	$(window).on("scroll", function(){
		var site_header = $('#site-header').outerHeight() + 1;	
			
		if ($(window).scrollTop() >= site_header) {	    	
			$('.site-header .is-fixed').addClass('is-stuck');	
			$('.header-static .header-clone').show();	
		}else {
			$('.site-header .is-fixed').removeClass('is-stuck');		              
			$('.header-static .header-clone').hide();
		}
	});

    /* --------------------------------------------------
    * mobile menu
    * --------------------------------------------------*/
    $('.mmenu_wrapper li:has(ul)').prepend('<span class="arrow"><svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg></span>');
    $(".mmenu_wrapper .mobile_mainmenu > li span.arrow").on('click',function() {
        $(this).parent().find("> ul").stop(true, true).slideToggle()
        $(this).toggleClass( "active" ); 
    });
	
	$( "#mmenu_toggle" ).on('click', function() {
		$(this).toggleClass( "active" );
		$(this).parents('.header_mobile').toggleClass( "open" );
		if ($(this).hasClass( "active" )) {
			$('.mobile_nav').stop(true, true).slideDown(100);
		}else{
			$('.mobile_nav').stop(true, true).slideUp(100);
		}		
	});

	/* --------------------------------------------------
    * gallery post
    * --------------------------------------------------*/
	$('.gallery-post').each( function () {
		var selector = $(this);
		selector.owlCarousel({
			rtl: rtl_owl(),
			loop:true,
			margin:0,
			responsiveClass:true,
			items:1,
			dots:false,
			nav:true,
			navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>']
		});
	});

	/* --------------------------------------------------
    * popup video
    * --------------------------------------------------*/
  	var video_popup = $('.video-popup');
   	if (video_popup.length > 0 ) {
	   	video_popup.each( function(){
		   	$(this).lightGallery({
			   selector: '.btn-play',
		   	});
	   	});
   	};

    /* --------------------------------------------------
    * back to top
    * --------------------------------------------------*/
    if ($('#back-to-top').length) {
	    var scrollTrigger = 500, // px
	        backToTop = function () {
	            var scrollTop = $(window).scrollTop();
	            if (scrollTop > scrollTrigger) {
	                $('#back-to-top').addClass('show');
	            } else {
	                $('#back-to-top').removeClass('show');
	            }
	        };
	    backToTop();
	    $(window).on('scroll', function () {
	        backToTop();
	    });
	    $('#back-to-top').on('click', function (e) {
	        e.preventDefault();
	        $('html,body').animate({
	            scrollTop: 0
	        }, 700);
	    });	
	}

	/* --------------------------------------------------
    * related projects
    * --------------------------------------------------*/
    $('.portfolio-related-posts').each( function () {
        var selector = $(this);
        selector.find('.owl-carousel').owlCarousel({
            rtl: rtl_owl(),
            autoplay: true,
            loop: false,
            dotsClass: 'owl-dots ot-custom-dots',
            dots: false,
            nav: false,
            navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
            responsive : {
                0 : {
                    items: 1,
                    margin: 0,
                },
                768 : {
                    items: 2,
                    margin: 30,
                },
                1024 : {
                    items: 3,
                    margin: 30,
                }
            }
        });
    });


    /* Particles */
    $(window).load( function () {
        $('.particles-js').each(function () {
            var s_id = $( this ).data('id'),
                s_color = $( this ).data('color'),
                s_color = s_color.replace(/\s/g, ''),
                e = $('<div class="progrisaas-particles"></div>');
            $( this ).append(e);    
            e.attr('id', 'particles-' + s_id );

            var id = 'particles-' + s_id;
            var color_type = 'random_colors';
            var color = s_color;
            var color_line = '#fff';
            var number = 8;
            var lines = false;
            if (color_type == 'random_colors') {
                color = color.split(',');
                color_line = color[0]
            }
            
            particlesJS(
                id, {
                    "particles":{
                        "number":{
                            "value":number,
                            "density":{
                                "enable":true,
                                "value_area":800
                            }
                        },
                        "color":{
                            "value": color
                        },
                        "shape":{
                            "type":'circle',
                            "polygon":{
                                "nb_sides":6
                            },
                        },
                        "opacity":{
                            "value":1,
                            "random":true,
                            "anim":{
                                "enable":false,
                                "speed":1,
                                "opacity_min":1,
                                "sync":false
                            }
                        },
                        "size":{
                            "value":5,
                            "random":true,
                            "anim":{
                                "enable":false,
                                "speed":30,
                                "size_min": 1,
                                "sync":false
                            }
                        },
                        "line_linked":{
                            "enable":false,
                            "distance":150,
                            "color":color_line,
                            "opacity":0,
                            "width":1
                        },
                        "move":{
                            "enable":true,
                            "speed":2,
                            "direction":"none",
                            "random":false,
                            "straight":false,
                            "out_mode":"out",
                            "bounce":false,
                            "attract":{
                                "enable":false,
                                "rotateX":600,
                                "rotateY":1200
                            }
                        }
                    },
                    "interactivity":{
                        "detect_on":"canvas",
                        "events":{
                            "onhover":{
                                "enable":true,
                                "mode":'grab'
                            },
                            "onclick":{
                                "enable":true,
                                "mode":"push"
                            },
                            "resize":true
                        },
                        "modes":{
                            "grab":{
                                "distance":150,
                                "line_linked":{
                                    "opacity":1
                                }
                            },
                            "bubble":{
                                "distance":200,
                                "size":3.2,
                                "duration":20,
                                "opacity":1,
                                "speed":30
                            },
                            "repulse":{
                                "distance":80,
                                "duration":0.4
                            },
                            "push":{"particles_nb":4},
                            "remove":{"particles_nb":2}
                        }
                    },
                    "retina_detect":true
                });
            var update;
            update = function() {
                requestAnimationFrame(update); 
            }; 
            requestAnimationFrame(update);
        });
    });


    /* --------------------------------------------------
    * filter projects
    * --------------------------------------------------*/
	function updateFilter() {
		$('.project_filters a').each(function() {
			var data_filter = this.getAttribute('data-filter');
			var num = $(this)
				.closest('.project-filter-wrapper')
				.find('.project-item')
				.filter(data_filter).length;
			$(this)
				.find('.filter-count')
				.text( num );
			if ( num != 0 && $(this).hasClass('empty') ) {
				$(this).removeClass('empty');
			}
		});
	}

    $('.project-filter-wrapper').each( function(){
		var $container = $(this).find('.projects-grid'); 
		$container.isotope({ 
			itemSelector : '.project-item', 
			animationEngine : 'css',
			masonry: {
				columnWidth: '.grid-sizer'
			},
			isOriginLeft: rtl_isotop(),
		});

		var $optionSets  = $(this).find('.project_filters'),
			$optionLinks = $optionSets.find('a');

		$optionLinks.on('click', function(){
			var $this = $(this);

			if ( $this.hasClass('selected') ) {
				return false;
			}
			var $optionSet = $this.parents('.project_filters');
				$optionSet.find('.selected').removeClass('selected');
				$this.addClass('selected');

			var selector = $(this).attr('data-filter');
				$container.isotope({ 
					filter: selector 
				});
			return false;
		});
		/* count filters */
		updateFilter();
	});

	/* load more button */    
	$('#btn-loadmore').on('click',function(){
		var btn		= $(this),
			grid    = $(this).parents('.project-filter-wrapper').find('.projects-grid'),
			offset  = grid.find('.project-item').length,
			more    = grid.data('load'),
			loaded  = $(this).data('loaded'),
			loading = $(this).data('loading'),
			cat 	= $(this).data('category'),
			count   = grid.data('count');
		$.ajax({
			url : progrisaas_loadmore_params.ajaxurl, // AJAX handler
			data : {
				'action': 'loadmore', // the parameter for admin-ajax.php
				'ppp'	: more,
				'cat'	: cat,
				'offset': offset,
			},
			type : 'POST',
			beforeSend : function ( xhr ) {
				btn.text(loading).append('<i class="ot-flaticon-refresh fas fa-spin"></i>'); // some type of preloader
			},
			success : function( data ){
				if( data ) {
					var items = $(data);
					btn.text(loaded);
					grid.append(items).isotope('appended', items); // insert new posts
					updateFilter();
				} else {
					btn.hide(); // if no data, HIDE the button as well
				}
			}
		});
		offset += more;
		if( count <= offset ){
			btn.fadeOut(1000);
		}
		return false;
	});

} )( jQuery );
