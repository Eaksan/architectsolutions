$(function() {

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

});
