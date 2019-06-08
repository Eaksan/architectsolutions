$(function () {

    $('.n-main-slider').slick({
        arrows: false,
        dots: true
    });

    $.fn.customTabs = function () {
        return this.each(function () {
            var $this = $(this);
            var tabButtons = $this.find('.js_btn-tab');
            var tabItems = $this.find('.js_tab-item');
            tabButtons.each(function () {
                if ($(this).hasClass('active')) {
                    showTab($(this), $this, tabButtons, tabItems);
                }
            });

            function showTab(btnToShow, tabBox, buttons, tabs) {
                if (!tabBox.hasClass('animated')) {
                    tabBox.addClass('animated');
                    var tabToShow = $(btnToShow.data('target'));
                    buttons.removeClass('active');
                    tabs.fadeOut(500, function () {
                        setTimeout(function () {
                            tabs.removeClass('tab-active');
                            tabToShow.fadeIn(400, function () {
                                setTimeout(function () {
                                    tabToShow.addClass('tab-active');
                                    tabBox.removeClass('animated');
                                }, 400);
                            });
                            btnToShow.addClass('active');
                        }, 500);
                    });
                }
            }

            tabButtons.on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    showTab($(this), $this, tabButtons, tabItems);
                }
            })
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

});
