function WageWorks() {
    this.timeout;
    this.hoverout;
    this.onNav = false;
    this.hasTouch = false;
    this.hasMediaQuery = true;
    this.hoverWait = false;
    this.isSearching = false;
    this.braceHtml = '<div class="b-bracket :class:" style="height::height:px;"><div class="b-holder"><div class="b-top"></div><div class="b-bottom"></div><div class="b-center" style="top::top:px;"></div></div></div>';

    this.sidebarOff = function (n) {
        $('#viewport').removeClass('menuright');
        $('#viewport').removeClass('menuleft');
        $(".menu-button-close").removeClass('menuright');
        $(".menu-button-close").removeClass('menuleft');
        $(".menu-button-1, .menu-button-2").removeClass("show-close");
        $('#container').css({ 'height': '', 'overflow': '' });
        if(n)
            WageWorks.timeout = setTimeout(function () { $('.menu-' + n).addClass('visible-desktop').removeClass("show"); }, 1000);
        else
            WageWorks.timeout = setTimeout(function () { $('.menu-1, .menu-2').addClass('visible-desktop').removeClass("show"); }, 1000);
    },
    this.sidebarOn = function (type, n) {
        var winH = $(window).height();
        $('#viewport').addClass(type);
        $(".menu-button-close").addClass(type);
        $(".menu-button-1, .menu-button-2").addClass("show-close");
        $('#container').css({ 'height': winH + 'px', 'overflow': 'hidden' });
        $('.menu-' + n).removeClass('visible-desktop').addClass("show");
        clearTimeout(WageWorks.timeout);
    },
    this.sidebarToggle = function (e) {
        e.stopPropagation();
        if ($('#viewport').eq(0).hasClass('menuright'))
            WageWorks.sidebarOff(2);
        else if ($('#viewport').eq(0).hasClass('menuleft'))
            WageWorks.sidebarOff(1);
        else {
            if ($(this).eq(0).hasClass('menu-button-1'))
                WageWorks.sidebarOn('menuleft', 1);
            else
                WageWorks.sidebarOn('menuright', 2);
        }
    },
    this.searchOff = function (e) {
        WageWorks.isSearching = false;
        WageWorks.hoverWait = false;
        WageWorks.subnavOff(e);
    },
    this.subnavOff = function (e) {
        if (!WageWorks.isSearching) {
            e.preventDefault();
            if (!WageWorks.hoverWait) {
                $('.navigations .sub-nav, .navigations .nav-search').removeClass('active');
                $('.navigations .sub-nav .sub-nav-inner').removeClass('activemobile');
            }
            WageWorks.hoverWait = false;
            WageWorks.onNav = false;
        }
    },
    this.subnavOn = function (e) {
        if (!WageWorks.isSearching) {
            WageWorks.onNav = true;
            e.stopPropagation();
            e.preventDefault();
            if ($(".left-menu").first().is(":visible")) {
                var cur = $(e.currentTarget).attr("rel");
                $('.navigations .sub-nav, .navigations .nav-search').removeClass('active');
                $('.navigations .' + cur).addClass('active');
            }

            WageWorks.timeout = self.setInterval(function () {
                if (!WageWorks.onNav) {
                    if (!WageWorks.isSearching) {
                        if (!WageWorks.hoverWait) {
                            $('.navigations .sub-nav, .navigations .nav-search').removeClass('active');
                            $('.navigations .sub-nav .sub-nav-inner').removeClass('activemobile');
                        }
                        WageWorks.hoverWait = false;
                        WageWorks.onNav = false;
                    }
                    WageWorks.timeout = window.clearInterval(WageWorks.timeout);
                }
            }, 1000);
        }
    },
    this.subnavOnMobile = function (e) {
        if (!($(this).parent().find(".sub-nav").hasClass("active")) && !($("#viewport").hasClass("menuleft") || $("#viewport").hasClass("menuright"))) {
            e.stopPropagation();
            e.preventDefault();
            var cur = $(e.currentTarget).attr("rel");
            $('.navigations .sub-nav, .navigations .nav-search').removeClass('active');
            $('.navigations .' + cur).addClass('active');
        }
    },
    this.loginOn = function (e) {
        if (!WageWorks.isSearching) {
            var cur = $(e.currentTarget).next();
            if (!cur.hasClass('active')) {
                cur.addClass('active');
                WageWorks.onNav = true;
            } else {
                WageWorks.subnavOff(e);
            }

        }
    },
    this.loginSubNav = function (e) {
        e.preventDefault();
        var $sec = $(this).next();
        WageWorks.hoverWait = true;
        WageWorks.hoverout = setTimeout(function () { WageWorks.hoverWait = false }, 1000)
        $(".menu-2-sec").not($sec).addClass("navhidden")
        $sec.removeClass("navhidden");
    },
    this.mobilenavOn = function (e) {
        if ($(".visible-menu").css("display") == "none") {
            e.preventDefault();
        }

        WageWorks.setNavHeights();
        var $link = $(e.currentTarget).prev();
        var cur = $link.attr("rel");
        var on = $('.navigations nav .' + cur + ' .sub-nav-inner').hasClass('mobilehidden');
        $('.navigations .show-subnav').removeClass("active");
        $(this).addClass("active");
        $('.navigations nav .sub-nav-inner').addClass('mobilehidden');
        if (on) {
            $('.navigations nav .' + cur + ' .sub-nav-inner').removeClass('mobilehidden');
        } else {
            $('.navigations .show-subnav').removeClass("active");
        }
    },
    this.searchOn = function (e) {
        e.preventDefault();
        $('.navigations nav .sub-nav, .navigations nav .nav-search').removeClass('active');
        $('.navigations nav .nav-search').addClass('active');
        clearTimeout(WageWorks.hoverout);
        WageWorks.hoverWait = true;
        WageWorks.isSearching = true;
        WageWorks.timeout = window.clearInterval(WageWorks.timeout);
        $("#search-box").focus();
    },
    this.setNavHeights = function () {
        $("nav .sub-nav .sub-nav-inner").each(function (i, e) {
            var t = 0;
            $(e).children().each(function (i2, e2) {
                t += $(e2).height();
                if ($(e2).height() > 210)
                    $(e2).closest(".sub-nav").addClass("taller");
            });

            $(e).css('height', (t) + 'px');
        });
    },
    this.faqSearch = function (data, searchBoxID, searchResultsID) {
        var $search = $('#' + searchBoxID);
        var $results = $('#' + searchResultsID);
        WageWorks.accordion(".question", ".answer-holder", ".answer", $results);
        if (data.length > 10) {
            var find = function (phrase) {
                var matches = new Array();
                $.grep(data, function (d, i) {
                    if (d.question != undefined && (d.question.toLowerCase()).indexOf(phrase) != -1)
                        matches.push(d);
                });
                return matches;
            };
            $search.keyup(function () {
                $results.removeClass('noresults');
                $results.find('.result').removeClass('active');
                $results.find('.shown').removeClass('shown');
                var phrase = $.trim($(this).val());
                if (phrase.length >= 1) {
                    var matches = find(phrase.toLowerCase());
                    $(matches).each(function (i, p) {
                        $results.find('.result').addClass('active');
                        $("#index-" + p.id).addClass("shown");
                    });
                    if (matches.length) return;
                } else {
                    return;
                }
                $results.addClass('noresults');
                return false;
            });
        } else {
            $search.parent().hide();
        }
    },
    this.accordionReset = function (desc, $descinnerSet) {
        $descinnerSet.each(function (e, i) {
            var height = $(this).outerHeight();
            $(this).closest(desc).css('height', height + 'px');
        });
    },
    this.accordion = function (title, desc, descinner, $results) {
        var $descinnerSet = $results.find(descinner);
        var $descSet = $results.find(desc);
        var $titleSet = $results.find(title);
        if ($results.hasClass("no-accordion")) {
            $descSet.removeClass("heighthidden");
            $descSet.find(".b-bracket").remove();
        } else {
            WageWorks.accordionReset(desc, $descinnerSet);

            $titleSet.on('click', function (e) {
                WageWorks.brackets(".bracket-js-accordion");
                $titleSet.removeClass("active");
                $(this).addClass("active");
                var $ans = $(this).next();
                if ($ans.hasClass("heighthidden")) {
                    if ($(this).next().height() != $(this).next().find(descinner).height) {
                        WageWorks.accordionReset(desc, $descinnerSet);
                    }

                    $descSet.addClass("heighthidden");
                    $results.find(".close").removeClass("show");

                    $(this).find(".close").addClass("show");
                    $(this).next().removeClass("heighthidden");
                } else {
                    $results.find(".close").removeClass("show");
                    $titleSet.removeClass("active");
                    $descSet.addClass("heighthidden");
                }
            });
        }
    },
    this.brackets = function (cssClass) {
        var $brace = $(cssClass);
        $brace.css("position", "relative");
        if ($brace.find(".b-bracket").size() == 0) {
            $brace.wrapInner("<div class='brace-self'></div>");
            $brace.each(function (i, e) {
                var $that = $(this)
                var height = $that.height();
                var topH = height / 2 - 51;
                var braceL = WageWorks.braceHtml.replace(/:height:/g, height).replace(/:class:/g, "brace-left").replace(/:top:/g, topH);
                var braceR = WageWorks.braceHtml.replace(/:height:/g, height).replace(/:class:/g, "brace-right").replace(/:top:/g, topH);
                $that.find(".brace-self").css({ "min-height": height + "px" });
                $that.prepend(braceL);
                $that.prepend(braceR);

                $that.removeClass("short-brack").removeClass("shorter-brack");
                if (height < 125)
                    $that.addClass("shorter-brack");
                else if (height < 190)
                    $that.addClass("short-brack");
            });
        } else {
            $brace.each(function (i, e) {
                var $that = $(this)
                $that.find(".brace-self").css({ "min-height": "" });
                var height = $that.find(".brace-self").height();
                var topH = height / 2 - 51;
                $that.find(".brace-left, .brace-right").css("height", height + "px");
                $that.find(".b-center").css("top", topH + "px");
                $that.find(".brace-self").css({ "min-height": height + "px" });

                $that.removeClass("short-brack").removeClass("shorter-brack");
                if (height < 125)
                    $that.addClass("shorter-brack");
                else if (height < 190)
                    $that.addClass("short-brack");
            });
        }
    }
    this.closeCompBlocksTrack = function (e) {
        e.preventDefault();
        var $block = $(e.currentTarget).closest(".cont-block");

        $block = $block.prev();

        var tracking = ($block.find(".original-text").text() != "") ? $block.find(".original-text").text() : $block.find(".rollover-text .inner-text").text();
        ga('send', 'event', 'Tile', 'Close', tracking);

        WageWorks.closeCompBlocks();
    }
    this.closeCompBlocks = function () {
        var $vid = null;
        var prev = ($(".comp-block.currentroll").attr("id"));
        if (prev && prev != "") {
            $vid = $("." + prev).find(".embed-container");
        }

        if ($vid) {
            var temp = $vid.html();
        }

        $(".comp-block").removeClass('showroll').removeClass('currentroll');
        $(".cont-block, .comp-block-spacer").addClass("heighthidden");

        WageWorks.isSearching = false;
        WageWorks.hoverWait = false;
        WageWorks.onNav = false;
        $('.navigations .sub-nav, .navigations .nav-search').removeClass('active');
        $('.navigations .sub-nav .sub-nav-inner').removeClass('activemobile');

        window.setTimeout(function () {
            $(".comp-block-spacer").remove();
            if ($vid) {
                $vid.html(temp);
            }
        }, 300);

    },
    this.compBlockRolloverHoverOn = function (e) {
        $(this).addClass('showroll');
    },
    this.compBlockRolloverHoverOff = function (e) {
        $(this).removeClass('showroll');
    },
    this.compBlockRolloverClick = function (e) {
        var $block = $(this);
        var hasContent = $block.hasClass('hasContent');
        if (hasContent) {
            e.preventDefault();
            var id = $block.attr("id");
            if ($("." + id).hasClass("heighthidden")) {
                $(".comp-block").removeClass('showroll').removeClass('currentroll');
                $(".cont-block, .comp-block-spacer").addClass("no-transition").addClass("heighthidden").height(0);
                $(".comp-block-spacer").remove();
                var top = $block.position().top;
                var $nextAll = $block.nextAll(".comp-block");
                var $next = $block;

                $nextAll.each(function (i, obj) {
                    if (top != $(obj).position().top) {
                        return;
                    }
                    $next = $(obj);
                });

                $next.after("<div class=\"clrbth comp-block-spacer\"></div>");
                var top2 = $(".comp-block-spacer").position().top;
                $("." + id).css("top", top2 + "px").removeClass("heighthidden");
                var height = $("." + id).find(".cont-block-container").first().height();
                $(".comp-block-spacer, ." + id).css('height', height + "px");
                $block.addClass("currentroll");

                var tile = $block.find(".c-video").size() > 0 ? "Video" : "Expand";
                var tracking = ($block.find(".original-text").text() != "") ? $block.find(".original-text").text() : $block.find(".rollover-text .inner-text").text();
                ga('send', 'event', 'Tile', tile, tracking);
            }
        } else {
            WageWorks.closeCompBlocks();
        }
        $(".cont-block, .comp-block-spacer").removeClass("no-transition");
    },
    this.compBlockRolloverTouch = function (e) {
        var $block = $(this);
        var hasContent = $block.hasClass('hasContent');

        if (!$block.hasClass('showroll')) {
            $(".comp-block").removeClass('showroll').removeClass('currentroll');
            $(".cont-block, .comp-block-spacer").addClass("no-transition").addClass("heighthidden")
            $(".comp-block-spacer").remove();
            $block.addClass('showroll').addClass('currentroll');
            if (hasContent) {
                e.preventDefault();
                var id = $block.attr("id");
                if ($("." + id).hasClass("heighthidden")) {
                    var top = $block.position().top;
                    var $nextAll = $block.nextAll(".comp-block");
                    var $next = $block;

                    $nextAll.each(function (i, obj) {
                        if (top != $(obj).position().top) {
                            return;
                        }
                        $next = $(obj);
                    });

                    $next.after('<div class="clrbth comp-block-spacer"></div>');
                    var top2 = $(".comp-block-spacer").position().top;
                    $("." + id).css("top", top2 + "px").removeClass("heighthidden");
                    var height = $("." + id).find(".cont-block-container").first().height();
                    $(".comp-block-spacer, ." + id).css('height', height + "px");
                    $block.addClass("currentroll");
                }
            }
        } else {
            WageWorks.closeCompBlocks();
        }
        $(".cont-block, .comp-block-spacer").removeClass("no-transition");
    },
    this.sliderInit = function (tracking, swipeID, bulletID, speed, autoScroll) {
        var bullets = document.getElementById(bulletID) ? document.getElementById(bulletID).getElementsByTagName('li') : null;
        var indexNum = window.slider.length;
        window.slider.push(
            new Swipe(document.getElementById(swipeID), {
                startSlide: 0,
                speed: speed,
                auto: autoScroll,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: function (pos) {
                    var i = bullets.length;
                    while (i--) {
                        bullets[i].className = ' ';
                    }
                    bullets[pos].className = 'on';
                }
            })
        );

        $('#' + bulletID + ' .prev').click(function (e) { slider[indexNum].prev(); ga('send', 'event', 'Carousel', tracking, 'Left Arrow'); });
        $('#' + bulletID + ' .next').click(function (e) { slider[indexNum].next(); ga('send', 'event', 'Carousel', tracking, 'Right Arrow'); });

        if (bullets != null) {
            $(bullets).click(function (e) {
                if ($(this).attr("class") != "on") {
                    var ind = $(this).index();
                    slider[indexNum].slide(ind, 400);
                    ga('send', 'event', 'Carousel', tracking, 'Panel ' + (ind + 1));
                }
            });
        }
    },
    this.Search = function () {
        var terms = $.trim($('#search-box').val());
        if (terms != '')
            window.location.assign("/search?q=" + encodeURI(terms));
        else
            window.location.assign("/search");
    },
    this.SurveyResponse = function (helpful, comments) {
        var survey = new Object();
        survey.Helpful = $('input:radio[name=radioHelpful]:checked').val();
        survey.Comments = $('#txtComment').val();
        var surveyData = { "survey": survey };
        console.log(surveyData);
        $.ajax({
            async: true,
            type: "POST",
            url: "/newsletter-signup.asmx/SaveSurvey",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(surveyData),
            success: function (msg) {
                $('#surveyForm').hide();
                $('#survey-thanks').show();
                ga('send', 'event', 'Form', 'Survey', 'Submit');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log('FAIL');
            }
        });
    },
    this.SurveyForm = function (e) {
        e.preventDefault();
        $(".fluid-form-row.btn input").attr("disabled", "disabled");
        var submits = $(this).serializeArray();
        var submitsSer = $(this).serialize();

        $(".fluid-form-row input, .fluid-form-row .select-container").removeClass("error");

        var send = true;
        $(".req-txt").each(function (i, e) {
            if (e.value == "") {
                send = false;
                $(e).addClass('error');
                if (e.tagName.toString().toLowerCase() == 'select')
                    $(e).parents(".select-container").addClass("error");
            }
        });

        if (send) {
            var data = new Object();
            $.each(submits, function (index, value) {
                data[value.name] = value.value;
            });

            if (send) {
                WageWorks.SurveyResponse(data);
            } else {
                $(".fluid-form-row.btn input").removeAttr("disabled");
            }
        } else {
            $(".fluid-form-row.btn input").removeAttr("disabled");
        }
    },
    this.SignupRFP = function (serial) {
        var data = { "n": serial };
        var formType = serial.SourceCode == 'undefined' ? serial.SubmitType : serial.SourceCode + " " + serial.SubmitType;
        $.ajax({
            async: true,
            type: "POST",
            url: "/newsletter-signup.asmx/RFPSignup",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            submitType: serial.SubmitType,
            data: JSON.stringify(data),
            success: function (msg) {
                var $parentForm = $("#frpForm").parent();
                if ($parentForm.find(".response-text").size() > 0) {
                    $("#frpForm").remove();
                    $parentForm.find(".response-text").show();
                } else {
                    $parentForm.html('<p class="title-Text">Thank you for submitting.</p><p>A Sales representative will contact you shortly.</p>');
                }
                ga('send', 'event', 'Form', formType, 'Submit');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log('FAIL', XMLHttpRequest, textStatus, errorThrown);
            }
        });
    },
    this.RFPForm = function (e) {
        e.preventDefault();
        $(".fluid-form-row.btn input").attr("disabled", "disabled");
        var submits = $(this).serializeArray();
        var submitsSer = $(this).serialize();

        $(".fluid-form-row input, .fluid-form-row .select-container").removeClass("error");

        var send = true;
        $(".req-txt").each(function (i, e) {
            if (e.value == "") {
                send = false;
                $(e).addClass('error');
                if (e.tagName.toString().toLowerCase() == 'select')
                    $(e).parents(".select-container").addClass("error");
            }
        });

        if (send) {
            var data = new Object();
            $.each(submits, function (index, value) {
                data[value.name] = value.value;
            });

            if (!(data.Phone1.length == 3 && data.Phone2.length == 3 && data.Phone3.length == 4 && !isNaN(data.Phone1 + data.Phone2 + data.Phone3))) {
                send = false;
                $(".input-phone").addClass("error");
            }
            if (!(data.Email.search(/^[a-zA-Z]+([_\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})+$/) != -1)) {
                send = false;
                $(".req-email").addClass("error");
            }

            if (send) {
                WageWorks.SignupRFP(data);
            } else {
                $(".fluid-form-row.btn input").removeAttr("disabled");
            }
        } else {
            $(".fluid-form-row.btn input").removeAttr("disabled");
        }
    },
    this.Qualification = function (e) {
        var id = $(this).attr("id");
        var name = $(this).attr("name");
        var $labels = $('.' + name);
        var $inputs = $("input[name='" + name + "']");
        var $selected = $("input[name='" + name + "']:checked");
        var $selectedLabel = $selected.siblings('label');
        $labels.removeClass("active");
        $selectedLabel.addClass("active");

        if ($('#wizardHSA').serialize().length >= 55) {
            if ($('#wizardHSA').serialize() == "rad1=1&rad2=1&rad3=1&rad4=0&rad5=0&rad6=0&rad7=0&rad8=0" || $('#wizardHSA').serialize() == "rad1=1&rad2=1&rad3=1&rad4=0&rad5=0&rad6=1&rad7=0&rad8=0") {
                $("#doQualify").html('<strong>Yes</strong>');
            } else {
                $("#doQualify").html('<strong>No</strong>');
            }
        }
    },
    this.supportsTransitions = function () {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = 'transition';
        if (typeof s[p] == 'string') { return true; }

        // Tests for vendor specific prop
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string') { return true; }
        }
        return false;
    },
    this.showSniff = function () {
        var $div1 = $('<div id="sniffer" style="display:none;"></div>').appendTo($('body'));
        $div1.html('<a href="//windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank" class="sniff-content">We recommend you upgrade your browser for the best experience using this site</a><div class="sniff-close"><span class="close"></span></div>');
        $div1.show();
        $("#sniffer .close").click(function (e) { $("#sniffer").hide() });
    },
    this.selectOther = function ($container, val, other) {
        if (val == other) {
            $container.addClass("show");
        } else {
            $container.removeClass("show");
        }
    }
}

WageWorks.prototype.isTouch = function () {
    if (typeof (window.ontouchstart) != 'undefined') {
        this.hasTouch = true;
        $('body').addClass("touch")
    }
};

WageWorks.prototype.isMediaQuery = function () {
    if (!(typeof window.matchMedia == 'function'))
        this.hasMediaQuery = false;
};

WageWorks.prototype.checkIE = function (version) {
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieversion = new Number(RegExp.$1)
        if (ieversion < version || version < 0)
            return true;
        else 
            return false;
    }
    else
        return false;
};