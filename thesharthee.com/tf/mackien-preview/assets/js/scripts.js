
(function($) {
    "use strict";

    /*================================
    Preloader
    ==================================*/
    var preloader = $('#preloader');
    $(window).on('load', function() {
        preloader.fadeOut('slow', function() { $(this).remove(); });
    });

    /*================================
    stickey Header
    ==================================*/
    var headerHeight = $('.header-area').innerHeight();
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop(),
            header_area = $('.header-area');

        if (scroll > 1) {
            header_area.addClass("sticky-menu");
        } else {
            header_area.removeClass("sticky-menu");
        }
    });


    /*================================
    Owl Carousel
    ==================================*/
    function abt_srvice() {
        var myowl = $('.abt-service').owlCarousel({
            margin: 10,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            nav: false,
			dotsContainer: '#service-dot',
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    }
    abt_srvice();
	
	$('.owl-dot').on('click', function () {
		$('.owl-carousel').owlCarousel().trigger('to.owl.carousel', [$(this).index(), 300]);
	});

    /*================================
    Magnific Popup
    ==================================*/
    $('.expand-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }

    });

    /*================================
    counter up
    ==================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /*================================
    slicknav
    ==================================*/
    $('ul#navigation').slicknav({
        prependTo: "#mobile_menu"
    });


    /*================================
    Masonary
    ==================================*/
    $('#container').imagesLoaded(function() {
        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
        // init Isotopedddd
        var $grid = $('.portfolio-masonary').isotope({
            itemSelector: '.prt-grid',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.prt-grid',
            }
        });
    });

    $('.portfolio-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /*================================
    Smoth Scroll
    ==================================*/
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

    $(window).on("load", function() {
        smoothScrolling($("a.scroll-btn[href^='#']"), 0);
        smoothScrolling($(".main-menu ul li a[href^='#']"), headerHeight);
    });

    /*================================
    Active current Li
    ==================================*/
    $(window).on("scroll", function() {
        activeMenuItem($("#nav_mobile_menu"));
    });

    //function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");

        sections.each(function() {
            var top = $(this).offset().top - nav_height - 40,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("active");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("active");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("active");
                home.addClass("active");
            } else if ($(window).scrollTop() + windowHeight > documentHeight - 400) {
                nav.find("> ul > li > a").parent().removeClass("active");
            }
        });
    }

})(jQuery);