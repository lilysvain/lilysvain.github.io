window.onload=function(){
	var container = selectorUtil("#container");
	var one = selectorUtil("#one");
	var two = selectorUtil("#two");
	var three = selectorUtil("#three");
	var white = selectorUtil("#white");
	var storage = getLocalStorage();

	function show_level2(){
		two.style.backgroundPosition="right";
		two.addEventListener("click",function(){
			white.className="show";
			white.style.zIndex="99";
			setTimeout(function(){
				location.href="scene2.html";
			},700);
		})
	}
	function show_level3(){
		three.style.backgroundPosition="right";
		three.addEventListener("click",function(){
			white.className="show";
			white.style.zIndex="99";
			setTimeout(function(){
				location.href="scene3.html";
			},700);
		})
	}
	function detLevel(){
		if(storage.level1){
			var snow = selectorUtil(one,"div");
			if(storage.snow1 != "hide"){
				snow.className="snow opacity";
				setTimeout(function(){
					snow.className="hide";
					storage.setItem("snow1","hide");
					show_level2();
				},1500);
			}else{
				snow.className="hide";
				show_level2();
			}
		}
		if(storage.level2){
			var snow = selectorUtil(two,"div");
			if(storage.snow2 != "hide"){
				snow.className="snow opacity";
				setTimeout(function(){
					snow.className="hide";
					storage.setItem("snow2","hide");
					show_level3();
				},1500);
			}else{
				snow.className="hide";
				show_level3();
			}
		}
		if(storage.level3){
			var snow = selectorUtil(three,"div");
			if(storage.snow3 != "hide"){
				snow.className="snow opacity";
				setTimeout(function(){
					snow.className="hide";
					storage.setItem("snow3","hide");
				},1500);
			}else{
				snow.className="hide";
			}
		}
	}

	detLevel();
	one.addEventListener("click",function(event){
		white.className="show";
		white.style.zIndex="99";
		setTimeout(function(){
			location.href="scene1.html";
		},700);
	})
}