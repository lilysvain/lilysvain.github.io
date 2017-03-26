$(window).load(function(){
    login_slider();
    // discriber();
    login_close();
    ershou_photo_slide();
    fade_back();
    wave_move();
    edit_info();
    change_photo();
    /*choose_sch();*/
    student_id();
    switchSchool();
    if($("#user_msg").length>0){
        grade_value_slide();
    }
    if($("#intergral-wrapper").length>0){
        scoreRotate();
    }
    if($("#ad-wrapper").length>0){
        adBanner();
    }
    if($(".return-to-top").length>0){
        returnToTop();
    }
})

function grade_value_slide(){
    var value_got = parseInt($("#value_box li:eq(1) span").html());
    var value_need = parseInt($("#value_box li:eq(2) span").html());
    var total_value = $("#need_value")[0];
    var total_width = parseInt(document.defaultView.getComputedStyle(total_value, null).width);
    var current_width = value_got/(value_got+value_need)*total_width;
    $("#got_value")[0].style.width = current_width + "px";
    $("#grade_value_btn")[0].style.left = current_width -15+ "px";
    $("#value_box")[0].style.left = current_width-70+ "px";
}

/*function choose_sch(){
    $(".switch").bind('click',function(){
        $("#schools").slideToggle();
    });
}*/

function student_id(){
    $("#student_id .id_it").bind('click',function(){
        $(".back_layer,.std_id_box").fadeIn();
    });
    $("#id_close").bind('click',function(){
        $(".back_layer,.std_id_box").fadeOut();
    });

}

function edit_info(){
    $("#edit_info").bind('click',function(){
        $(this).css({
            display: "none"
        })
        $("#save_info").css({
            display: "block"
        })
        $(".right_info span").css({
            display: "none"
        })
        $(".right_info input").css({
            display: "inline"
        })
    });

    $("#save_info").bind('click',function(){
        var nickname = $("#nickname").val(),
            phone = $("#phone").val(),
            qq = $("#qq").val();
        $.post(
            '/user/modify',
            {
                user_qq : qq,
                user_phone_number : phone,
                user_nickname : nickname
            },
            function(res) {
                res = $.parseJSON(res);
                if (res.code != 0) {
                    alert(res.msg);
                    return;
                }
                $("#qq_span").text(qq);
                $("#phone_span").text(phone);
                $("#nickname_span").text(nickname);
                $("#save_info").css({
                    display: "none"
                });
                $("#edit_info").css({
                    display: "block"
                });
                $(".right_info input").css({
                    display: "none"
                });
                $(".right_info span").css({
                    display: "inline"
                });
            }
        );
    });

}
function change_photo(){
    $("#origin_ph").bind('mouseenter',function(){
        $(this).css({
            display: "none"
        })
       $("#change_ph").css({
            display: "block"
        })
    });
    $("#change_ph").bind('mouseleave',function(){
       $(this).css({
            display: "none"
        })
       $("#origin_ph").css({
            display: "block"
        })
    });

}
function login_slider(){
    var in_person = 0;
    var in_slider = 0;

    $("#person_info").bind('mouseenter',function(){
        $(".login_border").css({
            display: "block"
        });
        if ($(".login_slider").css('display') != 'block') {
            $(".login_slider").slideToggle(200);
        }
        in_person = 1;
    });
    $("#person_info").bind('mouseleave', function(){
        setTimeout(function(){
            if (in_slider == 1) {
                return;
            }
            $(".login_border").css({
                display: "none"
            });
            $(".login_slider").hide();
        }, 200);
    });

    $(".login_slider").bind('mouseenter', function(){
        in_person = 0;
        in_slider = 1;
    });
    $(".login_slider").bind('mouseleave', function(){
        setTimeout(function(){
            if (in_person == 1) {
                return;
            }
            $(".login_border").css({
                display: "none"
            });
            $(".login_slider").hide();
        }, 200);
        in_slider = 0;
    });
}

function discriber(){
    var text_length=$("#user_cmt").text().length;
    var text_height=$("#user_cmt").outerHeight();
    if(text_length>45){
        $("#user_ph").css({
            float: "left"
        })
        $("#user_ph").css({
            marginBottom: text_height*0.7+"px"
        })
        $(".ershou-desc").css({
            textAlign: "left"
        })

    }
    else{
        $("#user_ph").css({
            float: "none"
        })
    }
}


function login_close(){
    $(".close").bind('click',function(){
        $(".login-cover").fadeOut();
    });
}

function ershou_photo_slide(){
    var address;
    $(".ershou-small-photos img").mouseover(function(){
        $(".ershou-small-photos img").removeClass("cur");
        $(this).addClass("cur");
        address=$(this).attr("src");
        $(".bigger").attr({ src : address });
        $(".bigger-photo").attr({ href : address });
    });
}

function fade_back(){
    $(".fd_close").click(function(){
        $(".fade_back").fadeOut();
    });
    $("#fd_footer").click(function(){
        $(".fade_back").fadeIn();
    });
    $("textarea").focus(function(){
        $(this).css({
            color: "#333"
        })
    });
    $("textarea").blur(function(){
        $(this).css({
            color: "#858D8E"
        })
    });


}

function wave_move(){
    if($('#commend').hasClass("cur")){
        $('#commend').mouseover(function(){
            $('#wave_w').animate({
                left: "32px"
            }, 300);
        });

        $('#new_pro').mouseover(function(){
            $('#wave_w').animate({
                left: "160px"
            }, 300);  
        });

        $('#new_pro').mouseleave(function(){
            $('#wave_w').animate({
                left: "32px"
            }, 300);  
        });
    }

    if($('#new_pro').hasClass("cur")){

        $("#wave_w").css({
            left: "160px"
        })

        $('#commend').mouseover(function(){
            $('#wave_w').animate({
                left: "32px"
            }, 300);
        });

        $('#new_pro').mouseover(function(){
            $('#wave_w').animate({
                left: "160px"
            }, 300);  
        });

        $('#commend').mouseleave(function(){
            $('#wave_w').animate({
                left: "160px"
            }, 300);  
        });
    }
}

/*********** New Added Javascript *****************
 *                        ---- By Lily
 */

/**************** 回到顶部 *********************/
function returnToTop(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.return-to-top').fadeIn(100);
        } else {
            $('.return-to-top').fadeOut(100);
        }
    });

    $('.return-to-top').click(function(event) {
        event.preventDefault();
        $(".return-to-top").addClass("move");
        $('html, body').animate({
            scrollTop: 0
        }, 200, function() {
            $(".return-to-top").hide();
            $(".return-to-top").removeClass("move");
        });
    });
}

/**********  Intergral Circle Function ****************/
function scoreRotate() {
    var score_total = parseInt($("[name=score-need]:input")[0].value);
    var score_got = parseInt($("[name=score-got]:input")[0].value);
    var score_get = parseInt($("[name=score-add]:input")[0].value);
    var angle = (score_got / score_total) * 360;
    var new_angle = ((score_got + score_get) / score_total) * 360;
    var ani_time=1000;

    initCircle();
    setTimeout(function(){
        $("#intergral-wrapper").addClass("opacity");
        scoreAni();
    },500);
    ani_time+=1000;

    function scoreAni(){
        setTransform($(".round-circle")[0], "rotate(" + angle + "deg)");
        if (angle < 180 && new_angle > 180) {
            var half_time = 1000 * (180 - angle) / (new_angle - angle);
            setTimeout(function () {
                $(".color-circle").addClass("color-change");
                $(".color-change").removeClass("color-circle");
                $(".round-circle")[0].style.zIndex = 4;
            }, half_time + 500);
        }
        if (new_angle >= 360) {
            setTimeout(function () {
                $(".round-circle").addClass("rotate");
                setTransform($(".round-circle")[0], "rotate(" + 360 + "deg)");
                setTimeout(function () {
                    setTransform($(".score-add")[0], "rotateY(" + 180 + "deg)");
                    setTransform($(".lv-role")[0], "rotateY(" + 0 + "deg)");
                    setTimeout(function () {
                        $(".score-desc").addClass("hidden");
                        $(".role-desc").removeClass("hidden");
                    }, 300);
                }, 1000);
            }, 500);
            ani_time += 1500;
        } else {
            setTimeout(function () {
                $(".round-circle").addClass("rotate");
                setTransform($(".round-circle")[0], "rotate(" + new_angle + "deg)");
            }, 500);
            ani_time += 500;
        }
        setTimeout(function(){
            $("#intergral-wrapper").removeClass("opacity");
            setTimeout(function(){
                /*$("#intergral-wrapper").removeClass("opacity");*/
                $("#intergral-wrapper").addClass("hidden");
            },600);
        },ani_time+800);
    }

    function initCircle() {
        var pattern = /pic\/\w+\./;
        var matches = $(".score-pic")[0].src.match(pattern);
        var wrapper = $("#intergral-wrapper")[0];
        if (matches) {
            var score_item = matches[0].slice(4, matches[0].length - 1);
            $(wrapper).addClass(score_item);
        }
        var level = $(".lv-num span").text();
        if (level) {
            switch (level) {
                case "LV2":
                case "LV3":
                case "LV4":
                case "LV5":
                    $(wrapper).addClass("role_lv2");
                    break;
                case "LV6":
                case "LV7":
                    $(wrapper).addClass("role_lv6");
                    break;
                case "LV8":
                case "LV9":
                case "LV10":
                    $(wrapper).addClass("role_lv8");
                    break;
                case "LV11":
                case "LV12":
                case "LV13":
                    $(wrapper).addClass("role_lv11");
                    break;
                case "LV14":
                    $(wrapper).addClass("role_boss");
                    break;
            }
        }
        if (angle >= 180) {
            $(".round-circle")[0].style.zIndex = 4;
            $(".color-circle").addClass("color-change");
            $(".color-change").removeClass("color-circle");
        }
    }

    function setTransform(element, func_str) {
        element.style.webkitTransform = func_str;
        element.style.msTransform = func_str;
        element.style.transform = func_str;
    }
}

/************ 学号认证  *********************/
function uploading(){
    $('.uploading').removeClass("hidden");
}
//$('.upload-target').bind("click", uploading);

function idtfSucceed(){
    if($.browser && $.browser.msie && ($.browser.version <= "8.0")) {
        $('.idtf-succeed')[0].style.border = "1px solid #c1c1c1";
    }
    $(".succeed-container").removeClass("hidden");
    setTimeout(function(){
        $(".succeed-container").addClass("hidden");
    },2500);
}
//idtfSucceed();

/***************** 选择学校  ***************/
function searchSchool(keyword)
{
    $.post('/school/search', {keyword:keyword}, function(res){
        res = $.parseJSON(res);
        schoolList = res.school_list;
        $(".search-down").empty();
        var len = schoolList.length;
        for (i = 0; i < len; i++) {
            host_a = location.host.split(".");
            host_a_len = host_a.length;
            url = "http://"+schoolList[i].school_short_name+"."+host_a[host_a_len-2]+"."+host_a[host_a_len-1];
            li = "<li><a href=\""+url+"\">"+schoolList[i].school_name+"</a></li>";
            $(".search-down").append(li);
        }
    });
}

function switchSchool(){
    if($("#department-container").length>0) {
        if (!$("#department-container").hasClass("hidden")) {
            selSchool();
        }
        $(".area .switch").bind("click", function () {
            $("#department-container").removeClass("hidden");
            selSchool();
            $("#department-container").bind("click", function (event) {
                if (event.target.id == "department-container") {
                    $(this).addClass("hidden");
                }
            });
        });
    }
}

function selSchool(){
   $(".school-search input").bind("keyup",function(){
        var keyword = $(this).val();
        if (keyword.length==0) {
            $(this).next().addClass("hidden");
        } else {
            searchSchool(keyword);
            $(this).next().removeClass("hidden");
        }
    })
    if($("#sel-d2").length > 0 && !$("#sel-d2").hasClass("hidden")){
        _optpkOpen();
        $(".sel-content a").bind("click",function(event){
            event.preventDefault();
            var department = $(this).text();
            var sel_hd = $(this).closest(".sel-content").prev(".sel-hd");
            var slideTarget;
            sel_hd.find(".department-item").val(department);
            if($(this).closest("ul").hasClass("search-down")){
                $(this).closest("ul").addClass("hidden");
                $(this).closest("ul").prev("input").val("");
            }
            slideTarget = sel_hd.children("a");
            _slideUp(slideTarget);
        });
        $(".sel-hd a").bind("click",function(event){
            event.preventDefault();
            var slide_target = $(this).closest(".sel-hd").next(".sel-content");
            if(slide_target.hasClass("slide-down")){
                _slideUp($(this));
            }else{
                _slideDown($(this));
            }
        });
    }

    function _slideDown(target){
        $(".optpk-container").addClass("hidden");
        clearInterval(ani);
        if(target.html() == "切换"){
            target.html("收起");
        }else{
            target.children("img").addClass("arrow-down");
        }
        var slide_target = target.closest(".sel-hd").next(".sel-content");
        slide_target.addClass("slide-down");
    }

    function _slideUp(target){
        if(target.html() == "收起"){
            target.html("切换");
        }else{
            target.children("img").removeClass("arrow-down");
        }
        var slide_target = target.closest(".sel-hd").next(".sel-content");
        slide_target.removeClass("slide-down");
        var i,len = $(".department-item").length;
        _optpkOpen();
    }

    function _optpkOpen(){
        var i,len = $(".department-item").length;
        for(i=0;i<len;i++){
            var val = $(".department-item").eq(i).val();
            if(val == ""){
                return;
            }
        }
        if($(".slide-down").length == 0){
            setTimeout(function(){
                $(".optpk-container").removeClass("hidden");
                ani = setInterval(_aniDots,400);
            },200);
        }
    }

    var color1="yellow";
    var color2="red";
    var ani;
    function _aniDots(){
        var dots = $(".decorating-dots li");
        var len = dots.length;
        var color_tmp
        for(var i=0;i<len;i++){
            if(dots[i].className == color1){
                dots[i].className=color2;
                return;
            }
            if(i==len-1){
                color_tmp=color1;
                color1=color2;
                color2=color_tmp;
            }
        }
    }
}

/************ 广告栏  *******************/
function adBanner(){
    var ani_time = 500;
    var delay_time = 1000;
    var timeout1;
    var banner = $("#ad-wrapper");
    function _pullBack(){
        banner.addClass("pull-back")
        $(".ad-close").addClass("hidden");
        setTimeout(function(){
            $(".ad-close").removeClass("hidden");
            $(".ad-l").addClass("hidden");
            $(".ad-s").removeClass("hidden");
        },ani_time);
    }
    setTimeout(function(){
        _pullBack();
        $("#ad-wrapper").hover(function(){
            if(banner.hasClass("pull-back")) {
                timeout1 = setTimeout(_stretch, delay_time);
            }
        },function(){
            clearTimeout(timeout1);
            if(!banner.hasClass("pull-back")) {
                _pullBack();
            }
        })
    },5000);

    function _stretch(){
        banner.removeClass("pull-back");
        $(".ad-l").removeClass("hidden");
        $(".ad-s").addClass("hidden");
        $(".ad-close").addClass("hidden");
        setTimeout(function(){
            $(".ad-close").removeClass("hidden");
        },ani_time);
    }

    $(".ad-close").bind("click",function(event){
        event.preventDefault();
        if(banner.hasClass("pull-back")){
            banner.addClass("hidden");
        }else{
            _pullBack();
        }
    })
}

/********** 关闭弹窗  ************/
function closeContainer(){
    var closes = $(".close-ico");
    if(closes.length>0){
        closes.each(function(){
            $(this).bind("click",function(event){
                event.preventDefault();
                var cont = $(this).closest(".close-container");
                if(cont.length>0){
                    cont.addClass("hidden");
                }
            })
        })
    }
}
closeContainer();

function detectFlash(tips){
    var hasFlash = false;
    try{
        hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    }catch(exception){
        hasFlash = ('undefined'!=typeof navigator.mimeTypes['application/x-shockwave-flash']);
    }
    if(!hasFlash){
        alert(tips);
    }
}

if($(".upload-area").length){
    detectFlash("为不影响图片上传功能，请取消浏览器对Flash的禁用~ 例如IE下：设置->安全->ActiveX");
}

/********* IE compatibility **********/
if ($.browser && $.browser.msie && ($.browser.version == "9.0")||($.browser.version == "8.0")||($.browser.version == "7.0")){
    if($("#circular-loading").length>0){
        var circular_num = $(".circularG").length;
        for(var i=0;i<circular_num;i++){
            $(".circularG")[i].style.opacity = 1.0*(i+1)/circular_num;
        }
    }
    if($('.std_input input').length>0) {
        $('.std_input input').each(function () {
            $(this).val($(this).attr("placeholder"));
        });
        $('.std_input input').on('blur', function () {
            if ($(this).val().length === 0) {
                $(this).val($(this).attr("placeholder"));
            }
        }).on('focus', function () {
            if ($(this).val() === $(this).attr("placeholder")) {
                $(this).val('');
            }
        });
    }

    if($('input.input-class').length>0) {
        $('input.input-class').each(function () {
            $(this).val($(this).attr("placeholder"));
            if($(this).hasClass("pw-input")){
                $(this).attr("style","display:none");
                $(this).attr("style","display:none");
                $(this).prev(".pw-text").val($(this).attr("placeholder"));
            }
        });
        $('input.input-class').on('blur', function () {
            if ($(this).val().length === 0) {
                if($(this).hasClass("pw-input")){
                    $(this).prev("input.pw-text").attr("style","");
                    $(this).attr("style","display:none");
                }
                $(this).val($(this).attr("placeholder"));
            }
        }).on('focus', function () {
            if($(this).hasClass("pw-text")){
                $(this).attr("style","display:none");
                $(this).next(".pw-input").attr("style","");
                $(this).next(".pw-input").focus();
            }
            if ($(this).val() === $(this).attr("placeholder")) {
                $(this).val('');
            }
        });
    }

    $(document.body).addClass("ie-compat");
}