(function($) {
	"use strict";

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

	function loadmore(){
		
		var btn		= $(this),
			grid    = $(this).parents('.project-filter-wrapper').find('.projects-grid'),
			offset  = grid.find('.project-item').length,
			more    = grid.data('load'),
			loaded  = $(this).data('loaded'),
			loading = $(this).data('loading'),
			cat 	= $(this).data('category'),
			style 	= $(this).data('style'),
			count   = grid.data('count');

		$.ajax({
			url : progrisaas_loadmore_params.ajaxurl, // AJAX handler
			data : {
				'action': 'loadmore', // the parameter for admin-ajax.php
				'ppp'	: more,
				'cat'	: cat,
				'offset': offset,
				'style'	: style,
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
					if( grid.hasClass('img-popup') ){
						grid.data("lightGallery").destroy(true);
						grid.lightGallery({
							selector: '.projects-thumbnail',
							share: false,
							pager: false,
							thumbnail: false
						});
					}

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
	}

	var projectLoadmore = function ($scope, $) {
		$scope.find('.project-filter-wrapper').each(function () {
			var selector = $(this).find('.btn-loadmore');
			selector.on('click', loadmore);
		});
	};

	/**
     * Elementor JS Hooks
     */
    $(window).on("elementor/frontend/init", function () {

		/*projects filter isotope*/
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/ipfilter.default",
            projectLoadmore
        );

  });

})(jQuery);