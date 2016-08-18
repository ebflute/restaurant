var WageWorks = new WageWorks();

$(document).ready(function () {
    WageWorks.isTouch();
    WageWorks.isMediaQuery();

    if (WageWorks.checkIE(-1)) {
        if (document.documentMode < 8 || WageWorks.checkIE(8))
            WageWorks.showSniff();
    } else {
        $("label select").parent().addClass("add-before");
    }


    if (WageWorks.hasMediaQuery && !WageWorks.hasTouch) {
        $(window).resize(function () { WageWorks.sidebarOff(); WageWorks.closeCompBlocks() });
    } else {
        window.onorientationchange = function () { WageWorks.sidebarOff(); WageWorks.closeCompBlocks() };
    }

    if (navigator.userAgent.match(/Firefox[\/\s]/i) != null) {
        $('#container').addClass('isFF');
    }

    /* Sliders */
    window.slider = new Array();
    WageWorks.sliderInit('Homepage-Lead', 'home-slider', 'home-position', 1000, 5500);
    WageWorks.sliderInit('Latest-News', 'component-swipe', 'component-position', 400, 5500);

    /* Comp Blocks */
    $(".bodyText .close, .landing-links .close").on("click", WageWorks.closeCompBlocksTrack);

    /* Touch check */
    if (WageWorks.hasTouch) {
        $('.comp-block').on('click', WageWorks.compBlockRolloverTouch);
        $('.show-subnav').on('click', WageWorks.mobilenavOn);
        $('.nav-expand').on('click', WageWorks.subnavOnMobile);
    } else {
	    $('.comp-block:not(.no-hover)').hover(WageWorks.compBlockRolloverHoverOn, WageWorks.compBlockRolloverHoverOff);
	    //$('.subFooterBtn').hover(WageWorks.compBlockRolloverHoverOn, WageWorks.compBlockRolloverHoverOff);
        $('.comp-block').on('click', WageWorks.compBlockRolloverClick);
        if (WageWorks.checkIE(9)) {
            $('.nav-expand').hover(WageWorks.subnavOn, function(e) { WageWorks.onNav = false; });
        } else {
            $('.nav-expand').hoverIntent(WageWorks.subnavOn, function (e) { WageWorks.onNav = false; });
        }
            
        $('.show-subnav').on('click', WageWorks.mobilenavOn);
        $('.navigations .sub-nav').hover(function (e) { WageWorks.onNav = true; }, function (e) { WageWorks.onNav = false; });
    }

    /* Menus */
    //$(".menu-2-name").on('click', WageWorks.loginSubNav);

    $('.menu-button-1, .menu-button-2').on('click', WageWorks.sidebarToggle);
    $('#nav-login').on('click', WageWorks.loginOn);

    $('.search-expand').on('click', WageWorks.searchOn);
    $('.nav-search .close').on('click', WageWorks.searchOff);

    $('#viewport').children().on('click', function (e) {
        if ($('#viewport').eq(0).hasClass('menuright')) {
            WageWorks.sidebarOff(2);
            return false;
        }
        else if ($('#viewport').eq(0).hasClass('menuleft')) {
            WageWorks.sidebarOff(1);
            return false;
        }
        return true;
    });

    WageWorks.setNavHeights();

    $('#search-box').keyup(function (e) {
        if (e.keyCode == 13) {
            WageWorks.Search();
        }
    });

    $("#search-link").on("click", function (e) {
        e.preventDefault();
        WageWorks.Search($('#search-box').val());
    });

    $(window).load(function () {
        WageWorks.brackets(".bracket-js");
    });

    //Check to see whether we should show or hide the Newsletter Signup
    var cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
        var cookieName = $.trim(cookies[i].split('=')[0]);
        var cookieValue = $.trim(cookies[i].split('=')[1]);

        if (cookieName === 'newsletter' && cookieValue === 'true') {
            $('#newsletter-signup').hide();
            $('#newsletter-thanks').show();
        }
        else {
            $('#newsletter-signup').show();
            $('#newsletter-thanks').hide();
        }
    }

    $('#newsletter-button').on('click', function (e) {
        e.preventDefault();
        if ($('#newsletter-email').val() != '') {
            var emailBox = document.getElementById('newsletter-email');
            if (emailBox.value.search(/^[a-zA-Z]+([_\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})+$/) != -1) {
                $(this).attr("disabled", "disabled");
                $('#newsletter-button').addClass('clicked');
                $('#newsletter-email').removeClass('error');
                var form = document.getElementById('newsletter-signup-form');
                form.submit();
            }
            else
                $('#newsletter-email').addClass('error');
        }
        else
            $('#newsletter-email').addClass('error');
    });

    $(".expense-stand input").change(WageWorks.Qualification);

    $("#frpForm").on("submit", WageWorks.RFPForm);
    $("#surveyForm").on("submit", WageWorks.SurveyForm);

    $(".withOther select").each(function (i, e) {
        var option = $("option:selected", this);
        var value = this.value;
        var $parent = $(this).closest(".withOther");
        WageWorks.selectOther($parent, value, "-");
    });

    $(".withOther select").on('change', function (e) {
        var option = $("option:selected", this);
        var value = this.value;
        var $parent = $(this).closest(".withOther");
        WageWorks.selectOther($parent, value, "-");
    });


    //Below is for the show / hide functionality on the Employees > Support Center FAQ search
    var supportBanner = $('.supportBannerFocus');
    $('input.supportInput').focus(function () {
	    supportBanner.fadeIn(300);
    });

    $('.flyoutClose').on('click', function () {
	    supportBanner.fadeOut(300);
    });
});