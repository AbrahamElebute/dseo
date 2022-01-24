(function($) {
    "use strict";
  
    /* --------------------------------------------------
    * side panel
    * --------------------------------------------------*/
    var element = $('#panel-btn'),
    sidebar = $('#side-panel');
  
    function panel_handler() {
        var isActive = !element.hasClass('active');
  
        element.toggleClass('active', isActive);
        sidebar.toggleClass('side-panel-open', isActive);
        $('body').toggleClass('side-panel-active', isActive);
        return false;
    }
  
    $('#panel-btn, .side-panel-close, .panel-overlay').on('click', panel_handler);
  
    /* --------------------------------------------------
    * toggle search
    * --------------------------------------------------*/
    var tgSearch  = function($scope, $){
        $scope.find('.octf-search').each( function(){
            var btn = $(this).find('.toggle_search'),
            form = $(this).find('.h-search-form-field');
            function search_handler() {
                var isActive = !btn.hasClass('active');

                btn.toggleClass('active', isActive);
                form.toggleClass('show', isActive);
                return false;
            }
            $('.search-overlay, .h-search-form-inner > i, .toggle_search').on('click', search_handler);
        });
    };
  
    /* --------------------------------------------------
    * mobile menu
    * --------------------------------------------------*/
    var mmenuPanel  = function(){
        var element = $('#mmenu-toggle'),
            mmenu   = $('#mmenu-wrapper');

        function mmenu_handler() {
            var isActive = !element.hasClass('active');

            element.toggleClass('active', isActive);
            mmenu.toggleClass('mmenu-open', isActive);
            $('body').toggleClass('mmenu-active', isActive);
            return false;
        }

        $('#mmenu-toggle, .mmenu-close, .mmenu-overlay').on('click', mmenu_handler);

        $('.mmenu-wrapper li:has(ul)').prepend('<span class="arrow">+</span>');
        $(".mmenu-wrapper .mobile_mainmenu > li span.arrow").on('click',function() {
            $(this).parent().find("> ul").stop(true, true).slideToggle()
            $(this).toggleClass( "active" ); 
        });
    };

    /* --------------------------------------------------
    * menu vertical
    * --------------------------------------------------*/
    var menuVertical = function($scope, $){
        if( $scope.find('.vertical-main-navigation').length ){
            $scope.find('.vertical-main-navigation').each( function(){
                var selector         = $(this),
                    itemHasChildren  = selector.find('> ul > li.menu-item-has-children > a'),
                    nItemHasChildren = selector.find('ul ul > li.menu-item-has-children > a');

                itemHasChildren.prepend('<span class="arrow"><svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg></span>');
                nItemHasChildren.prepend('<span class="arrow"><svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg></span>');
                itemHasChildren.find('span.arrow').on('click',function() {
                    itemHasChildren.parent().not($(this).parents('li.menu-item-has-children')).find('>ul').stop(true, true).slideUp();
                    nItemHasChildren.parent().find('>ul').stop(true, true).slideUp();
                    nItemHasChildren.find('span.arrow').removeClass('active');
                    itemHasChildren.find('span.arrow').not($(this)).removeClass('active');
                    $(this).parents('li.menu-item-has-children').find('>ul').stop(true, true).slideToggle();
                    $(this).toggleClass( 'active' );
                });
                nItemHasChildren.find('span.arrow').on('click',function() {
                    $(this).parents('sub-menu').eq(0).find('li.menu-item-has-children').not($(this).parents('li.menu-item-has-children').eq(0)).find('>ul').stop(true, true).slideUp();
                    $(this).parents('sub-menu').eq(0).find('li.menu-item-has-children').find('>a span.arrow').not($(this)).removeClass('active');
                    $(this).parents('li.menu-item-has-children').eq(0).find('>ul').stop(true, true).slideToggle();
                    $(this).toggleClass( 'active' );
                });
            });
        }
    };

    /* --------------------------------------------------
    * Hamburger menu
    * --------------------------------------------------*/
    var hamburgerMenu = function($scope, $){
        $scope.find('.menu-hamburger-toggle').each( function(){
            var selector         = $(this),
                menuHamburger    = selector.next('.octf-menu-hamburger'),
                mainNav          = menuHamburger.find('.main-navigation'),
                btnClose         = menuHamburger.find('#menu-hamburger-close');
            selector.on('click', function() {
                menuHamburger.addClass('open-menu');
            });
            btnClose.on('click', function() {
                menuHamburger.removeClass('open-menu');
            });
            document.addEventListener('keydown', function(event){
                if(event.key === "Escape"){
                    menuHamburger.removeClass('open-menu');
                }
            });
        });
    };
  
    /**
     * Elementor JS Hooks
     */
    $(window).on("elementor/frontend/init", function () {
        /*toggle search*/
        elementorFrontend.hooks.addAction(
             "frontend/element_ready/isearch.default",
            tgSearch
        );
        /*mmenu*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/imenu_mobile.default",
            mmenuPanel
        );
        /*menu vertical*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/imenu.default",
            menuVertical
        );
        /*menu hamburger*/
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/imenu_hamburger.default",
            hamburgerMenu
        );
    });
  
  })(jQuery);