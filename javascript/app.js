(function ($) {

    $(window).on('load', function () {
        $('#loader').slideUp('slow');
        $('body').removeClass('loaderbody');
    });
    // ========================
    // mobile menu
    // ========================
    $('.js-mob-tog').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('modal-open');
        $('.js-mob-tog, .bk-mob-nav, .bk-wrapper, .bk-header, .bk-notice').toggleClass(
            'active');
    });

    $('.js-mob-list').on('click', 'button', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).next().next().slideToggle();
    });

    $('.js-mob-list li a').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('modal-open');
        $('.js-mob-tog, .bk-mob-nav, .bk-wrapper, .bk-header, .bk-notice').removeClass(
            'active');

        var selectedMenu = $(this).attr('href');
        $('.server-details-wrapper').addClass('d-none');
        $(selectedMenu).removeClass('d-none');
        $('.js-mob-list li').removeClass('current_page_item');
        $(this).parent().addClass('current_page_item');
        $('.bk-server-details').addClass('active');
        $('.open-all-box').addClass('d-none');

        $('html, body').animate({
            scrollTop: $('#price-holder').offset().top - 40
        }, 0);
    });

    $(document).ready(function () {
        $('.js-notice-bk').parent().height($('.js-notice-bk').outerHeight());
        $('.js-mob-list .menu-item-has-children').prepend('<button type="button"><span class="sr-only">Open Sub Menu</span></button>');
    });

    $('.bk-header nav ul li a').click(function (e) {
        e.preventDefault();
        var selectedMenu = $(this).attr('href');
        $('.server-details-wrapper').addClass('d-none');
        $(selectedMenu).removeClass('d-none');
        $('.bk-header nav ul li').removeClass('current_page_item');
        $(this).parent().addClass('current_page_item');

        $('html, body').animate({
            scrollTop: $('#price-holder').offset().top - 20
        }, 0);

    })

    $('.view-all-btn').click(function (e) {
        e.preventDefault();
        $('.server-details-wrapper').removeClass('d-none');
        $('.open-all-box').addClass('d-xl-none');
        $('.bk-server-details').addClass('active');
    })


    // ========================
    // fixed header
    // ========================

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $(".bk-header").addClass("fixed-top");
        } else {
            $(".bk-header").removeClass("fixed-top");
        }
    });

    $('.bk-server-details').mouseover(function () {
        $(this).addClass('active');
    });

    $('.open-all-box').click(function () {
        $(this).closest('.server-details-wrapper').find('.bk-server-details').addClass('active');
        $(this).closest('.server-details-wrapper').find('.open-all-box').addClass('d-xl-none')
    });


})(jQuery);


var timeleft;
var downloadTimer;

// Check if there is a stored time in localStorage
if (localStorage.getItem("remainingTime")) {
    timeleft = parseInt(localStorage.getItem("remainingTime"), 10);
} else {
    timeleft = 1200; // Set the initial time
}

function startTimer() {
    downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            localStorage.removeItem("remainingTime"); // Remove the stored time
            location.reload();
        } else {
            var hours = Math.floor(timeleft / 3600);
            var mins_1 = timeleft % 3600;
            var mis = Math.floor(mins_1 / 60);
            var seconds = mins_1 % 60;

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (mis < 10) {
                mis = '0' + mis;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            $('#hrs').html(hours);
            $('#min').html(mis);
            $('#sec').html(seconds);

            // Store the remaining time in localStorage
            localStorage.setItem("remainingTime", timeleft);
        }
        timeleft -= 1;
    }, 1000);
}

startTimer();