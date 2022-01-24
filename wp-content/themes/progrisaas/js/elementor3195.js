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
    * accordions
    * --------------------------------------------------*/
    var customAccordions = function ($scope, $) {
        $scope.find('.ot-accordions-wrapper').each( function () {
            var selector = $(this),
                content = selector.find('.ot-acc-item__content'),
                header  = selector.find('.ot-acc-item__title');

            header.off("click");

            header.each(function(){
                if ($(this).data('default') == 'yes') {
                    $(this).next().addClass('active').slideDown(300);
                    $(this).parent().addClass('current');
                }
            });

            header.on('click', function(e){
                e.preventDefault();
                var $this = $(this);

                $this.next().toggleClass('active').slideToggle(300);
                $this.parent().toggleClass('current');
                content.not($this.next()).slideUp(300);
                header.not($this).parent().removeClass('current');
            });
        });
    };

    /* --------------------------------------------------
    * accordions schedules
    * --------------------------------------------------*/
    var accordionsSchedules = function ($scope, $) {
        $scope.find('.ot-accordions-schedule').each( function () {
            var selector = $(this),
                content = selector.find('.schedule-detail'),
                title  = selector.find('.schedule-title');

            title.off("click");

            title.each(function(){
                if ($(this).data('default') == 'yes') {
                    $(this).siblings('.schedule-detail').addClass('active').slideDown(300);
                    $(this).parents('.schedule-item').addClass('current');
                }
            });

            title.on('click', function(e){
                e.preventDefault();
                var $this = $(this);

                $this.siblings('.schedule-detail').toggleClass('active').slideToggle(300);
                $this.parents('.schedule-item').toggleClass('current');
                content.not($this.siblings('.schedule-detail')).slideUp(300);
                title.not($this).parents('.schedule-item').removeClass('current');
            });
        });
    };

    /* --------------------------------------------------
    * tabs
    * --------------------------------------------------*/
    var customTabs = function ($scope, $) {

        $scope.find('.ot-tabs').each(function() {
            var selector = $(this),
                tabs     = selector.find('.ot-tabs__heading li'),
                content  = selector.find('.ot-tabs__content');
            tabs.first().addClass('current');
            content.first().addClass('current');

            tabs.on( 'click', function(){
                var tab_id = $(this).attr('data-tab');
                $(this).siblings().removeClass('current');
                $(this).parents('.ot-tabs').find('.ot-tabs__content').removeClass('current');
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            });
        });
    };

    /* --------------------------------------------------
    * Borrow Lend
    * --------------------------------------------------*/
    var borrowLend = function ($scope, $) {

        $scope.find('.ot-borow-lend').each(function() {
            var selector = $(this),
                tabs     = selector.find('.asset-heading li'),
                content  = selector.find('.asset-info-wrapper');
            tabs.first().addClass('current');
            content.first().addClass('current');

            tabs.on( 'mouseenter mouseleave', function(){
                var tab_id = $(this).attr('data-tab');
                $(this).siblings().removeClass('current');
                $(this).parents('.ot-borow-lend').find('.asset-info-wrapper').removeClass('current');
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            });
        });
    };

    /* --------------------------------------------------
    * tabs title
    * --------------------------------------------------*/
    var tabTitle = function ($scope, $) {
        $scope.find('.ot-tab-title').each(function() {
            var selector = $(this),
                tabItem  = selector.find('.ot-tab-title__item');

            tabItem.on( 'click', function(){
                tabItem.removeClass('active');
                tabItem.each(function() {
                    $($(this).data('link')).hide();
                });
                $(this).addClass('active');
                $($(this).data('link')).show();
            });
            tabItem.first().trigger('click');
        });
    };

    /* --------------------------------------------------
    * tabs schedule
    * --------------------------------------------------*/
    var tabSchedule = function ($scope, $) {
        $scope.find('.ot-tab-schedule').each(function() {
            var selector = $(this),
                tabItem  = selector.find('.ot-tab-schedule__item');

            tabItem.on( 'click', function(){
                tabItem.removeClass('active');
                tabItem.each(function() {
                    $($(this).data('link')).hide();
                });
                $(this).addClass('active');
                $($(this).data('link')).show();
            });
            tabItem.first().trigger('click');
        });
    };

    /* --------------------------------------------------
     * counter
     * --------------------------------------------------*/
    var icounter = function () {
        $('.ot-counter[data-counter]').each( function () {
            var scrollTop   = $(document).scrollTop() + $(window).height();
            var counter     = $(this).find('span.ot-counter__num'),
                countTo     = counter.attr('data-to'),
                during      = parseInt( counter.attr('data-time') );

            if ( scrollTop > counter.offset().top + counter.height() ) {
                $(this).removeAttr('data-counter');
                $({
                    countNum: counter.text()
                }).animate({
                    countNum: countTo
                },
                {
                    duration: during,
                    easing: 'swing',
                    step: function() {
                        counter.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        counter.text(this.countNum);
                    }
                });
            }
        });
    };

    var counter = function () {
        icounter();
    };

    /* --------------------------------------------------
     * Progress bar
     * --------------------------------------------------*/
    function lineProgress() {
        $('.ot-progress-line:not([data-processed])').each(function() {
            var bar = $(this),
                line = bar.find(".progress-bar"),
                progressEnd = bar.data('percent'),
                percent = bar.find('.ppercent');
            var scrollTop = $(document).scrollTop() + $(window).height();

            if ( scrollTop >  bar.offset().top +  bar.height() ) {
                bar.attr("data-processed", "true");
                line.css("width", (bar.outerWidth() * (progressEnd / 100)) + "px");

                for (var i = 0; i <= 50; i++) {
                    (function (count) {
                        setTimeout(function () {
                            percent.html(Math.round((progressEnd / 50) * count) + "%");
                        }, 30 * count);
                    })(i);
                }
            }
        });
    };

    /* Progress bar size */
    function lineProgressSize() {
        $('.ot-progress-line[data-processed]').each(function () {
            var bar = $(this);
            var line = bar.find(".progress-bar");
            var progressEnd = parseInt(bar.data('percent'));

            line.css("width", (bar.outerWidth() * (progressEnd / 100)) + "px");
        });
    }

    function circleProgress() {
        $('.ot-progress-circle:not([data-processed])').each(function() {
            var circle    = $(this),
                bar_color = circle.data('color'),
                bar_hei   = circle.data('height'),
                bar_size  = circle.data('size');
            var scrollTop = $(document).scrollTop() + $(window).height();
            if ( scrollTop >  circle.offset().top +  circle.height() ) {
                circle.attr("data-processed", "true");
                circle.find('.ot-progress-circle__inner').easyPieChart({
                    barColor: bar_color,
                    trackColor: false,
                    scaleColor: false,
                    lineCap: 'square',
                    lineWidth: bar_hei,
                    size: bar_size,
                    animate: 1000,
                    onStart: $.noop,
                    onStop: $.noop,
                    /*easing: 'easeInOut',*/
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent) + '%');
                    }
                });
            }
        });
    };
    
    var progressBar = function () {
        lineProgress();
        circleProgress();
    };

    /* --------------------------------------------------
    * projects filter isotope
    * --------------------------------------------------*/
    var projectsFilter = function () {
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
            });
        }
        $('.projects-grid').each( function(){
            var $container = $(this); 
                $container.isotope({ 
                    itemSelector : '.project-item', 
                    animationEngine : 'css',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    },
                    isOriginLeft: rtl_isotop(),
                });
    
            var $optionSets  = $(this).closest('.project-filter-wrapper').find('.project_filters'),
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
            /* popup gallery */
            if( $container.hasClass('img-popup') ){
                $('.img-popup').lightGallery({
                    selector: '.projects-thumbnail',
                    share: false,
                    pager: false,
                    thumbnail: false
                });
            }
            /* count filters */
            updateFilter();
        });
    };

    /* --------------------------------------------------
    * message box
    * --------------------------------------------------*/
    var messageBox = function($scope, $){
        $scope.find('.ot-message-box').each( function(){
            var selector = $(this),
                close = selector.find('>i');
            close.on('click', function() {
                $scope.fadeOut();
            });
        });
    };

    /* --------------------------------------------------
     * Image Carousel With Tab
     * --------------------------------------------------*/
    var imageSliderSyncTab = function ($scope, $) {
        $scope.find('.ot-image-slider-sync-tab').each( function () {
            var selector     = $(this),
                selectorSlider = selector.find('.part-image-slider'),
                selectorTab = selector.find('.part-tab'),
                tabs     = selectorTab.find('.ot-tabs').find('.ot-tabs__heading li'),
                content  = selectorTab.find('.ot-tabs').find('.ot-tabs__content');

            /* Slider */
            selectorSlider.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                items: 1,
                autoplay: false,
                loop: false,
                dots: true,
                nav: false,
                dotsClass: 'owl-dots ot-custom-dots',
                responsive : {}
            }).on('changed.owl.carousel', function(e) {
                tabs.eq(e.item.index).trigger('click');
            });
            customNav(selector);

            /* Tabs */
            tabs.first().addClass('current');
            content.first().addClass('current');

            tabs.on( 'click', function(){
                var tab_id = $(this).attr('data-tab');
                $(this).siblings().removeClass('current');
                $(this).parents('.ot-tabs').find('.ot-tabs__content').removeClass('current');
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
                
                selectorSlider.find('.owl-carousel').owlCarousel({
                    rtl: rtl_owl(),
                    items: 1,
                    autoplay: false,
                    loop: false,
                    dots: true,
                    nav: false,
                    dotsClass: 'owl-dots ot-custom-dots',
                    responsive : {}
                }).trigger('to.owl.carousel', [$(this).index(), 300]);
            });
        });
    };

    /* --------------------------------------------------
     * Image Carousel
     * --------------------------------------------------*/
    var imageCarousel = function ($scope, $) {
        $scope.find('.ot-image-slider').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes' === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
            customNav(selector);
        });
    };

    /* --------------------------------------------------
     * Client Logo Carousel
     * --------------------------------------------------*/
    var clientLogoCarousel = function ($scope, $) {
        $scope.find('.ot-client-logo-slider').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes' === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
        });
    };

    /* --------------------------------------------------
     * Blockquote Carousel
     * --------------------------------------------------*/
    var blockquoteCarousel = function ($scope, $) {
        $scope.find('.ot-blockquote-slider').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes' === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
            customNav(selector);
        });
    };

    /* --------------------------------------------------
     * Testimonial Carousel
     * --------------------------------------------------*/
    var testimonialCarousel = function ($scope, $) {
        $scope.find('.ot-testimonial-slider.ot-testimonial-s1').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes' === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
        });
    };

    /* --------------------------------------------------
     * Testimonial Carousel 2
     * --------------------------------------------------*/
    var testimonialCarousel2 = function ($scope, $) {
        $scope.find('.ot-testimonial-slider.ot-testimonial-s2').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes' === sliderSettings.loop,
                animateOut: 'yes' === sliderSettings.fade ? 'fadeOut' : '',
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
        });
    };

    /* --------------------------------------------------
    * projects carousel
    * --------------------------------------------------*/
    var projectsCarousel = function ($scope, $) {
        $scope.find('.ot-project-slider').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes'   === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
            /* popup gallery */
            if( selector.hasClass('img-popup') ){
                $('.img-popup').lightGallery({
                    selector: '.projects-thumbnail',
                    share: false,
                    pager: false,
                    thumbnail: false
                });
            }
        });
    };

    /* --------------------------------------------------
    * projects carousel with title
    * --------------------------------------------------*/
    var projectsCarouselTitle = function ($scope, $) {
        $scope.find('.ot-project-slider.with-title').each( function () {
            var selector       = $(this),
                sliderSettings = selector.data('slider_options');

            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes'   === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });

            /* Custom Navigation Events */ 
            customNav(selector);

            /* popup gallery */
            if( selector.hasClass('img-popup') ){
                $('.img-popup').lightGallery({
                    selector: '.projects-thumbnail',
                    share: false,
                    pager: false,
                    thumbnail: false
                });
            }
        });
    };

    /* --------------------------------------------------
     * Custom Navigation Events
     * --------------------------------------------------*/
    function customNav(selector){
        var customNav   = selector.find('.custom-nav'),
            otOwl       = selector.find('.owl-carousel');
        if( customNav.length > 0 ){
            /* Go to the next item */
            customNav.find('.owl-next').on("click", function () {
                otOwl.trigger('next.owl.carousel', [300]);
            });
            /* Go to the previous item */
            customNav.find('.owl-prev').on("click", function () {
                otOwl.trigger('prev.owl.carousel', [300]);
            });  
        }
        return false;
    }

    /* --------------------------------------------------
    * blog carousel
    * --------------------------------------------------*/
    var blogCarousel = function ($scope, $) {
        $scope.find('.ot-blog-slider').each( function () {
            var selector     = $(this),
                sliderSettings = selector.data('slider_options');
            selector.find('.owl-carousel').owlCarousel({
                rtl: rtl_owl(),
                autoplay: 'yes' === sliderSettings.autoplay,
                autoplayTimeout: parseInt(sliderSettings.autoplay_time_out),
                loop: 'yes'   === sliderSettings.loop,
                responsiveClass:true,
                dotsClass: 'owl-dots ot-custom-dots',
                dots: sliderSettings.dots,
                nav: sliderSettings.arrows,
                navText:['<i class="ot-flaticon-left-arrow"></i>', '<i class="ot-flaticon-right-arrow"></i>'],
                responsive : {
                    0 : {
                        items: parseInt(sliderSettings.slides_show_mobile),
                        margin: parseInt(sliderSettings.margin_mobile),
                    },
                    768 : {
                        items: parseInt(sliderSettings.slides_show_tablet),
                        margin: parseInt(sliderSettings.margin_tablet),
                    },
                    1024 : {
                        items: parseInt(sliderSettings.slides_show_desktop),
                        margin: parseInt(sliderSettings.margin_desktop),
                    }
                }
            });
        });
    };

    /* --------------------------------------------------
     * Compare Pricing Table
     * --------------------------------------------------*/
    var compareTable = function ($scope, $) {
        $($scope.find(".ot-cpt-heading")[0]).addClass("active");
        $scope.find("ul").on("click", "li", function () {
            var pos = $(this).index() + 2;
            $scope.find("tr").find('td:not(:eq(0))').hide();
            $scope.find('td:nth-child(' + pos + ')').css('display', 'table-cell');
            $scope.find("tr").find('th:not(:eq(0))').hide();
            $scope.find('li').removeClass('active');
            $(this).addClass('active');
        });
    };

    /* --------------------------------------------------
    * Switcher
    * --------------------------------------------------*/
    var otSwitcher = function ($scope, $) {
        $('section.yearly').hide();
        $scope.find('.ot-switcher').each( function () {
            var selector  = $(this);
            selector.find('span').on( 'click', function() {
                var parent = $(this).parents('.elementor-top-section');
                selector.find('span').removeClass('active');
                $(this).addClass('active');
                if( $(this).hasClass('l-switch') ){
                    parent.find('section.yearly').hide();
                    parent.find('section.monthly').show();
                }else{
                    parent.find('section.monthly').hide();
                    parent.find('section.yearly').show();
                }
            });
        });
    }

    /* --------------------------------------------------
    * coming soon
    * --------------------------------------------------*/
    var countDown = function($scope, $){
        $scope.find('.ot-countdown').each( function(){
            var selector = $(this),
                date     = selector.data('date'),
                zone     = selector.data('zone'),
                day      = selector.data('day'),
                days     = selector.data('days'),
                hour     = selector.data('hour'),
                hours    = selector.data('hours'),
                min      = selector.data('min'),
                mins     = selector.data('mins'),
                second   = selector.data('second'),
                seconds  = selector.data('seconds');
            selector.countdown({
                date: date,
                offset: zone,
                day: day,
                days: days,
                hour: hour,
                hours: hours,
                minute: min,
                minutes: mins,
                second: second,
                seconds: seconds
            }, function () {
                alert('Done!');
            });
        });
    };

    /* --------------------------------------------------
    * image gallery
    * --------------------------------------------------*/
    var imageGallery = function ($scope, $) {
        $scope.find('.ot-image-gallery').each( function(){
            var selector = $(this),
                popup   = selector.find('.gallery-icon > a');
            popup.append('<span class="overlay"><i class="ot-flaticon-magnifiying-glass"></i></span>');
            selector.lightGallery({
                selector: popup,
                share: false,
                pager: false,
            });
        });
    };

    /* --------------------------------------------------
    * handle after scroll/load/resize
    * --------------------------------------------------*/
    $(window).on('scroll', function() {
        lineProgress();
        circleProgress();
        icounter();
    });
    $(window).on('load', function () {
        lineProgress();
        circleProgress();
        icounter();
    });
    $(window).on('resize', function () {
        lineProgressSize();
    });

    /**
     * Elementor JS Hooks
     */
    $(window).on("elementor/frontend/init", function () {
        
        /*Custom accordions*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iaccordions.default",
            customAccordions
        );

        /*Accordions Schedules*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iacc-schedule.default",
            accordionsSchedules
        );

        /*Custom tabs*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/itabs.default",
            customTabs
        );

        /*Tab Title*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/itabtitle.default",
            tabTitle
        );
        /*Tab Title*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/itab-schedule.default",
            tabSchedule
        );

        /*Counter*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/icounter.default",
            counter
        );

        /*Message box*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/imessagebox.default",
            messageBox
        );

        /*Progress bar*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iprogress.default",
            progressBar
        );

        /* projects filter */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ipfilter.default",
            projectsFilter
        );

        /* projects carousel */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ipcarousel.default",
            projectsCarousel
        );

        /* projects carousel with title */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ipcarouseltitle.default",
            projectsCarouselTitle
        );

        /*Blog carousel*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ipost_carousel.default",
            blogCarousel
        );

        /* image carousel with tab */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iimage-slider-sync-tab.default",
            imageSliderSyncTab
        );

        /* image carousel */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iimageslider.default",
            imageCarousel
        );

        /* client logo carousel */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iclientlogo.default",
            clientLogoCarousel
        );

        /* blockquote carousel */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iquoteslider.default",
            blockquoteCarousel
        );

        /* testimonial carousel */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/itestimonials.default",
            testimonialCarousel
        );

        /* testimonial carousel 2*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/itestimonials2.default",
            testimonialCarousel2
        );

        /* compare pricing table */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/icomparetable.default",
            compareTable
        );

        /* switcher */
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iswitcher.default",
            otSwitcher
        );

        /*countdown*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/icountdown.default",
            countDown
        );

        /*gallery*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/igimages.default",
            imageGallery
        );

        /*Borrow Lend*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/iborrow-lend.default",
            borrowLend
        );
    });

} )( jQuery );