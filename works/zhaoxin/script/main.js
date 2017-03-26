window.onload = function(){
	var start_time = new Date();
	var end_time;
	var container = document.getElementById("container");
	var cat=document.getElementById("cat");
	var logo=document.getElementById("logo");
	var product = document.getElementById("product");
	var design = document.getElementById("design");
	var program = document.getElementById("program");
	var mobile = document.getElementById("mobile");
	var front = document.getElementById("front");
	var back = document.getElementById("back");
	var close = document.getElementById("close");
	var animate = document.getElementById("animate_container");
	animate.style.height=document.documentElement.clientHeight +"px";
	var notice = document.getElementById("notice");

	if(document.defaultView){
		var computedStyle = document.defaultView.getComputedStyle(container, null);
	}

	alert("clientWidth: " + document.documentElement.clientWidth);
	alert("computeWidth: "+ computedStyle.width);

	var ratio = (parseInt(computedStyle.width)-16)/1280;
	var bg_height = 2419 * ratio;
	if(computedStyle.width=="1400px"){
		container.style.height=1400/1280*2419 + "px";
	}else{
		container.style.height=bg_height + "px";
	}
	/*var ratio = document.documentElement.clientWidth/1280;*/
	var sceneWidth = ratio * 560;
    var sceneHeight = ratio * 396;
	var productY = ratio * 782;
	var designY = ratio * 984;
	var programY = ratio * 1339; 
	var mobileY = ratio * 1613;
	var frontY = ratio * 1956;

	var itemsToLoad = 5;
	var loadCount=0;

	function getScrollTop(){
		var scrollTop = document.body.scrollTop || (document.documentElement && document.documentElement.scrollTop);
		console.log("body: " + document.body.scrollTop);
		console.log("documentElement: " + document.documentElement.scrollTop);
		console.log("scrollTop: " + scrollTop);
		return scrollTop;
		/*return document.documentElement.scrollTop;
		if (document.compatMode == "CSS1Compat"){
     		return document.documentElement.scrollTop;
		} else {
     		return document.body.scrollTop;
		}*/
	}
	function setScrollTop(num){
		/*if(document.body.scrollTop){
			document.body.scrollTop = num;
		}else if(document.documentElement && document.documentElement.scrollTop){
			document.documentElement.scrollTop = num;
		}*/
		document.body.scrollTop = num;
		document.documentElement.scrollTop = num;
		/*if (document.compatMode == "CSS1Compat"){
     		document.documentElement.scrollTop = num;
		} else {
     		document.body.scrollTop = num;
		}*/
	}

	function slideDown(){
		var i=0;
		if(container.offsetHeight - document.documentElement.clientHeight-getScrollTop()<=50){
			(function(){
				if(getScrollTop()>document.documentElement.clientHeight){
					setScrollTop(getScrollTop()-40);
					setTimeout(arguments.callee,18);
					i++
				}
			})();
			/*logo.className="slide_in";*/
		}else{
			logo.className="slide_out";
			(function(){
				if(i < document.documentElement.clientHeight/40){
					setScrollTop(getScrollTop()+40);
					setTimeout(arguments.callee,18);
					i++
				}
			})();
		}
	}
	function getWheelDelta(event){
        if (event.wheelDelta){
            return event.wheelDelta;
        } else {
            return -event.detail * 40;
        }
    }
    function locateScene(){
    	product.style.width=sceneWidth + "px";
    	product.style.height=sceneHeight + "px";
    	product.style.top=productY+"px";
    	product.style.left=15*ratio + "px";
    	design.style.width=sceneWidth + "px";
    	design.style.height=sceneHeight + "px";
    	design.style.top=designY+"px";
    	design.style.right=10*ratio + "px";
    	program.style.width=sceneWidth + "px";
    	program.style.height=sceneHeight + "px";
    	program.style.top=programY+"px";
    	program.style.left=24*ratio + "px";
    	mobile.style.width=sceneWidth + "px";
    	mobile.style.height=sceneHeight + "px";
    	mobile.style.top=mobileY+"px";
    	mobile.style.right=18*ratio + "px";
    	front.style.width=sceneWidth + "px";
    	front.style.height=sceneHeight + "px";
    	front.style.top=frontY+"px";
    	front.style.left=24*ratio + "px";
    }

    function itemLoaded(event) {
        loadCount++;
        end_time=new Date();
        var interval = end_time-start_time;
        if (interval >= 30000 || loadCount >= itemsToLoad) {
        	document.getElementById("loading").style.display="none";
        	/*setScrollTop(0);*/
        	setTimeout(function(){
        		/*setScrollTop(0);*/
				logo.className="slide_in";
				cat.style.backgroundPosition = "0px 15px";
				cat.className="cat_move";
				cat.addEventListener("mouseover", function(){
					cat.style.cursor="pointer";
					cat.className="";
					cat.style.backgroundPosition = "-180px 15px";
				}, false);
				cat.addEventListener("mouseout",function(){
					cat.style.backgroundPosition = "0px 15px";
				});
				cat.addEventListener("click", slideDown, false);
			},500);
        }
    }

    function preLoad(){
    	var product_gif = new Image();
        product_gif.onload = itemLoaded;
       /* setTimeout(function(){
        	product_gif.src = "image/product.gif";
        },10000);*/
        product_gif.src = "http://staticf.secretlisa.com/bingyan/2014czx/product.gif";
        var design_gif = new Image();
        design_gif.onload = itemLoaded;
        design_gif.src = "http://staticf.secretlisa.com/bingyan/2014czx/design.gif";
        var program_gif = new Image();
        program_gif.onload = itemLoaded;
        program_gif.src = "http://staticf.secretlisa.com/bingyan/2014czx/program.gif";
        var mobile_gif = new Image();
        mobile_gif.onload = itemLoaded;
        mobile_gif.src = "http://staticf.secretlisa.com/bingyan/2014czx/mobile.gif";
        var front_gif = new Image();
        front_gif.onload = itemLoaded;
        front_gif.src = "http://staticf.secretlisa.com/bingyan/2014czx/front.gif";
    }

    function popUp(){
    	cat.style.display="none";
    	animate.style.display="block";
    	notice.style.display="block";
    	notice.style.left="-600px";
    	animate.firstElementChild.className="animate_show";
    	notice.className="notice_move";
    }

	/*setTimeout(function(){setScrollTop(0);}, 500);*/
	setScrollTop(0);
	preLoad();
	locateScene();
	window.addEventListener("resize",function(){
		alert("clientWidth: " + document.documentElement.clientWidth);
		animate.style.height=document.documentElement.clientHeight +"px";
		computedStyle = document.defaultView.getComputedStyle(container, null);
		ratio = (parseInt(computedStyle.width))/1280;
		alert("computeWidth: " + computedStyle.width);
		bg_height = 2419 * ratio;
		if(computedStyle.width=="1400px"){
			container.style.height=1400/1280*2419 + "px";
		}else{
			container.style.height=bg_height + "px";
		}
		sceneWidth = ratio * 560;
    	sceneHeight = ratio * 396;
		productY = ratio * 782;
		designY = ratio * 984;
		programY = ratio * 1339; 
		mobileY = ratio * 1613;
		frontY = ratio * 1956;
		locateScene();
	});
	document.addEventListener("mousewheel",function(event){
		var delta = getWheelDelta(event);
		if(delta < 0){
			logo.className="slide_out";
		}else if(delta > 0 && getScrollTop() == 0){
			logo.className="slide_in";
		}
	},false);
	document.addEventListener("DOMMouseScroll",function(event){
		var delta = getWheelDelta(event);
		if(delta < 0){
			logo.className="slide_out";
		}else if(delta > 0 && getScrollTop() == 0){
			logo.className="slide_in";
		}
	},false);

	back.addEventListener("click",function(){
    	animate.firstElementChild.className="animate_hide";
    	notice.className="";
    	cat.style.display="block";
    	setTimeout(function(){
    		animate.style.display="none";
    	},300);
	})
	close.addEventListener("click",function(){
		notice.style.display="none";
	});
	document.getElementById("pull_out").addEventListener("click",function(){
		notice.style.display="block";
		if (!!window.ActiveXObject || "ActiveXObject" in window){
			notice.style.left="80px";
		}
		notice.className="notice_move2";
	});
	product.addEventListener("click",function(){
		animate.firstElementChild.style.backgroundImage = "url(http://staticf.secretlisa.com/bingyan/2014czx/product.gif)";
		notice.firstElementChild.innerHTML=document.getElementById("words_product").innerHTML;
    	popUp();
    });
    design.addEventListener("click",function(){
    	animate.firstElementChild.style.backgroundImage = "url(http://staticf.secretlisa.com/bingyan/2014czx/design.gif)";
    	notice.firstElementChild.innerHTML=document.getElementById("words_design").innerHTML;
    	popUp();
    })
    program.addEventListener("click",function(){
    	animate.firstElementChild.style.backgroundImage = "url(http://staticf.secretlisa.com/bingyan/2014czx/program.gif)";
    	notice.firstElementChild.innerHTML=document.getElementById("words_program").innerHTML;
    	popUp();
    })
    mobile.addEventListener("click",function(){
    	animate.firstElementChild.style.backgroundImage = "url(http://staticf.secretlisa.com/bingyan/2014czx/mobile.gif)";
    	notice.firstElementChild.innerHTML=document.getElementById("words_mobile").innerHTML;
    	popUp();
    })
    front.addEventListener("click",function(){
    	animate.firstElementChild.style.backgroundImage = "url(http://staticf.secretlisa.com/bingyan/2014czx/front.gif)";
    	notice.firstElementChild.innerHTML=document.getElementById("words_front").innerHTML;
    	popUp();
    })
    /*alert(navigator.userAgent);*/
    alert("clientWidth: " + document.documentElement.clientWidth);
	alert("computeWidth: "+ computedStyle.width);
}