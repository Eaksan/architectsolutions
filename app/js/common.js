$(function () {

    $('.n-main-slider').slick({
        arrows: false,
        dots: true
    });

    $.fn.customTabs = function () {
        return this.each(function () {
            var $this = $(this);
            var tabButtons = $this.find('.js_btn-tab');
            var accordionButtons = $this.find('.js_btn-accordion');
            var tabItems = $this.find('.js_tab-item');
            tabButtons.each(function () {
                if ($(this).hasClass('active')) {
                    showTab($(this), $this, tabButtons, tabItems);
                }
            });
            accordionButtons.each(function () {
                if ($(this).hasClass('active')) {
                    showTab($(this), $this, accordionButtons, tabItems);
                }
            });

            tabButtons.on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    showTab($(this), $this, tabButtons, tabItems);
                }
            });

            accordionButtons.on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    showTab($(this), $this, accordionButtons, tabItems);
                }
            });

            function showTab(btnToShow, tabBox, buttons, tabs) {
                if (tabBox.hasClass('animated')) {
                    return;
                }
                tabBox.addClass('animated');
                var tabToShow = $(btnToShow.data('target'));
                buttons.removeClass('active');
                tabs.fadeOut(400);
                setTimeout(function () {
                    tabs.removeClass('tab-active');
                    tabToShow.fadeIn(400);
                    setTimeout(function () {
                        tabToShow.addClass('tab-active');
                        tabBox.removeClass('animated');
                    }, 400);
                    btnToShow.addClass('active');
                }, 400);
            }
        })
    };

    $('.js_tabs').customTabs();

    if (window.innerWidth > 768) {
        $('.n-catalog-list').outerHeight($('.n-catalog-left').outerHeight() - $('.n-catalog-top').outerHeight());
    }

    $('.js_catalog-tab button').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var buttons = $('.js_catalog-tab button');
        var categoryList = $this.data('list');
        var catalogItems = $('.n-catalog-item');
        var itemsToShow;
        if ($this.hasClass('active') || buttons.hasClass('animating')) {
            return;
        }
        if (categoryList === 'all') {
            itemsToShow = catalogItems;
        } else {
            itemsToShow = $('.n-catalog-item[data-category='+ categoryList +']');
            console.log(itemsToShow);
        }
        $this.addClass('animating');
        buttons.removeClass('active');
        catalogItems.fadeOut();
        setTimeout(function () {
            itemsToShow.fadeIn();
            $this.addClass('active').removeClass('animating');
        }, 410);
    });

    $('.js_mobile-btn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var btn = $(this);
        var menu = $('.n-header-menu');
        var body = $('body');
        if (!btn.hasClass('open-menu')) {
            $(window).on('click', checkClick);
        } else {
            $(window).off('click', checkClick);
        }
        btn.toggleClass('open-menu');
        menu.toggleClass('open-menu');
        body.toggleClass('open-menu');
        function checkClick(e) {
            var target = $(e.target);
            if (target.closest('.js_mobile-btn').length < 1 && target.closest('.n-header-menu').length < 1) {
                e.preventDefault();
                e.stopPropagation();
                btn.removeClass('open-menu');
                menu.removeClass('open-menu');
                body.removeClass('open-menu');
                $(window).off('click', checkClick);
            }
        }
    });

    $('.js_dropdown-menu > .n-btn').on('click', function (e) {
        if (window.innerWidth > 992) {
            return;
        }
        e.preventDefault();
        var btn = $(this).closest('.js_dropdown-menu');
        var menu = btn.find('ul');
        if (btn.hasClass('open-menu')) {
            btn.removeClass('open-menu');
            menu.slideUp();
        } else {
            btn.addClass('open-menu');
            menu.slideDown();
        }
    });

});
