window.onload=function(){
	var container = selectorUtil("#container");

	var pear = selectorUtil("#pear");
	pear.width=getWidth(pear);
	pear.height=getHeight(pear);
	pear.xpos=0;
	pear.ypos=0;
	var apple = selectorUtil("#apple");
	apple.width=getWidth(apple);
	apple.height=getHeight(apple);
	apple.xpos=0;
	apple.ypos=0;
	var blueberry = selectorUtil("#blueberry");
	blueberry.width=getWidth(blueberry);
	blueberry.height=getHeight(blueberry);
	blueberry.xpos=0;
	blueberry.ypos=0;
	var rock = selectorUtil("#rock");
	var squeezer = selectorUtil("#squeezer");
	squeezer.lpos = 930;
	squeezer.rpos=1130;
	squeezer.tpos = 200;
	squeezer.bpos=345;
	var red_item = selectorUtil("#red_item");
	var purple_item = selectorUtil("#purple_item");
	var orange_item = selectorUtil("#orange_item");
	var liquid = selectorUtil("#liquid");
	liquid.width=204;
	liquid.height=162;
	liquid.xpos=0;
	liquid.ypos=0;
	var clown = selectorUtil("#clown");
	clown.lpos = 200;
	clown.rpos=410;
	clown.tpos = 470;
	clown.bpos=570;
	var eye = selectorUtil("#eye");
	eye.color="red";

	var bubble = selectorUtil("#bubble");
	var people = selectorUtil("#people");
	var start = selectorUtil("#start");
	var black = selectorUtil("#black");
	var white = selectorUtil("#white");
	var bottle = selectorUtil("#bottle");

	var use_container = selectorUtil("#use_container");
	var use_button = selectorUtil("#use_button");
	var bag = selectorUtil("#bag");
	var helper = selectorUtil("#helper");
	var use_items = selectorUtil("#use_items");
	var mix_items = selectorUtil("#mix_items");
	var devive_items = selectorUtil("#devive_items");
	var close = selectorUtil("#close");

	function checkReact(){
		var id1 = setInterval(function(){
		},300);
		var id2 = setInterval(function(){
		},300);
		var id3 = setInterval(function(){
		},300);
	}
	function use_pop(){
		use_container.className="";
	}
	function change_panel(event){
		var select;
		select = event.target.id;
		if(select == "use"){
			use_button.style.backgroundPosition= "0 0";
			use_items.className="";
			mix_items.className="hide";
			devive_items.className="hide";
		}else if(select == "mix"){
			use_button.style.backgroundPosition= "center";
			mix_items.className="";
			use_items.className="hide";
			devive_items.className="hide";
		}else if(select == "devive"){
			use_button.style.backgroundPosition= "bottom";
			use_items.className="hide";
			mix_items.className="hide";
			devive_items.className="";
		}
	}
	function remind(item){
		var p = black.getElementsByTagName("p").item(0);
		black.className="";
		switch(item){
			case "red":
				p.innerHTML="你得到一瓶红色药水~";
				bottle.style.backgroundPosition="center";
				bottle.className="tada";
				setTimeout(function(){
					bottle.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
				red_item.className="item";
				red_item.addEventListener("click",bottleUse);
			break;
			case "orange":
				p.innerHTML="你得到一瓶橙色药水~";
				bottle.style.backgroundPosition="bottom";
				bottle.className="tada";
				setTimeout(function(){
					bottle.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
				orange_item.className="item";
				orange_item.addEventListener("click",bottleUse);
			break;
			case "purple":
				p.innerHTML="你得到一瓶紫色药水~";
				bottle.style.backgroundPosition="top";
				bottle.className="tada";
				setTimeout(function(){
					bottle.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
				purple_item.className="item";
				purple_item.addEventListener("click",bottleUse);
			break;
			case "over":
				p.innerHTML="恭喜你获得终极药水进入下一关~";
				bottle.style.backgroundImage="url(image/final_bottle.png)";
				bottle.className="tada";
				setTimeout(function(){
					bottle.className="";
				},700);
				setTimeout(function(){
					white.className="show";
					white.style.zIndex="99";
					setTimeout(function(){
						var storage=getLocalStorage();
						storage.setItem("level2","pass");
						location.href="select.html";
					},700);
				},1000);
			break;
		}
		if(orange_item.className=="item" && red_item.className=="item"){
			apple.className="hide";
			apple.select=false;
		}
	}
	function speak(event,i){
		var ps = bubble.getElementsByTagName("p");
		if(i<2){
			ps[i].className="hide";
			ps[i+1].className="";
			i++;
		}else if(i==2){
			start.className="opacity";
			setTimeout(function(){
				start.className="hide";
			},500);
		}
	}

	var DragDrop = function(){
    	var dragging = null;
    	var diffX;
    	var diffY;
    	function handleEvent(event){
        	switch(event.type){
            	case "mousedown":
            	    if (event.target.className.indexOf("draggable") > -1){
                    	dragging = event.target;
                    	dragging.style.backgroundPosition="left";
                    	dragging.innerHTML="<p>Drag me!</p>";
                    	diffX=event.clientX - event.target.offsetLeft;
                    	diffY=event.clientY - event.target.offsetTop;
                	}
            	break;
            	case "mousemove":
                	if (dragging !== null){
                		dragging.innerHTML="";
                    	dragging.style.left = event.clientX-diffX + "px";
                    	dragging.style.top = event.clientY-diffY + "px";
                	}
            	break;
            	case "mouseup":
            		if (dragging !== null){
            			dragging.xpos=event.clientX-container.offsetLeft;
            			dragging.ypos=event.clientY+getScrollTop();
                		dragging = null;
                	}
            	break;
        	}
    	};
    	//public interface
    	return {
    		enable: function(){
        		document.addEventListener("mousedown", handleEvent);
        		document.addEventListener("mousemove", handleEvent);
        		document.addEventListener("mouseup", handleEvent);
    		},
    		disable: function(){
        		document.removeEventListener("mousedown", handleEvent);
        		document.removeEventListener("mousemove", handleEvent);
        		document.removeEventListener("mouseup", handleEvent);
    		}
    	}
	}();

	function bottleUse(event){
		var id = event.target.id;
		liquid.xpos=0;
		liquid.ypos=0;
		switch(id){
			case "red_item":
				liquid.style.backgroundPosition="center";
				liquid.color="red";
			break;
			case "orange_item":
				liquid.style.backgroundPosition="bottom";
				liquid.color="orange";
			break;
			case "purple_item":
				liquid.style.backgroundPosition="top";
				liquid.color="purple";
			break;
		}
		liquid.className="";
		use_container.className="hide";
		liquid.style.left=event.clientX-container.offsetLeft-.5*liquid.width + "px";
		liquid.style.top=event.clientY+getScrollTop()-.5*liquid.height + "px";
		document.body.addEventListener("mousemove",liquid_move);
	}
	function liquid_move(event){
		liquid.style.left=event.clientX-container.offsetLeft-.5*liquid.width + "px";
		liquid.style.top=event.clientY+getScrollTop()-.5*liquid.height + "px";
		liquid.addEventListener("click",liquid_still);
	}
	function liquid_still(event){
		liquid.xpos = event.clientX-container.offsetLeft;
		liquid.ypos = event.clientY+getScrollTop();
		liquid.removeEventListener("click",liquid_still);
		document.body.removeEventListener("mousemove",liquid_move);
		liquid.addEventListener("click",function(event){
			liquid.style.left=event.clientX-container.offsetLeft-.5*liquid.width + "px";
			liquid.style.top=event.clientY+getScrollTop()-.5*liquid.height + "px";
			document.body.addEventListener("mousemove",liquid_move);
		});
	}

	function pull(){
		rock.className="pull_down";
		rolling();
		var fruit = squeeze();
		setTimeout(function(){
			rock.className="";
		},200);
		if(fruit){
			setTimeout(function(){
				remind(fruit);
			},1000);
		}
	}

	function rolling(){
		var i = 0;
		setTimeout(function(){
			squeezer.style.backgroundPosition="left";
			if(i < 3){
				setTimeout(arguments.callee,500);
			}
			i++;
		},500);
		setTimeout(function(){
			squeezer.style.backgroundPosition="right";
			if(i < 3){
				setTimeout(arguments.callee,500);
			}
		},250);
	}

	function determin_area(){
		var id1=setInterval(function(){
			var fruits = document.querySelectorAll(".fruit");
			var i, len;
			for (i=0, len=fruits.length; i < len; i++){
     			fruit = fruits[i];
     			if(fruit.xpos > squeezer.lpos&&fruit.xpos < squeezer.rpos
     				&& fruit.ypos>squeezer.tpos&&fruit.ypos < squeezer.bpos){
     				fruit.select=true;
     			}else{
     				fruit.select=false;
     			}
			}
			if(len==0){
				clearInterval(id1);
			}
		},500);
		var id2=setInterval(function(){
     		if(liquid.xpos > clown.lpos&&liquid.xpos < clown.rpos
     				&& liquid.ypos>clown.tpos&&liquid.ypos < clown.bpos){
     			liquid.select=true;
     		}else{
     			liquid.select=false;
     		}
		},500);
		var id3=setInterval(function(){
			if(liquid.select && eye.color=="red" && liquid.color=="red"){
				liquid.select=false;
				liquid.className="hide";
				setTimeout(function(){
					eye.style.backgroundPosition="center";
				},400);
				eye.color="purple";
			}
			if(liquid.select && eye.color=="purple" && liquid.color=="purple"){
				liquid.select=false;
				liquid.className="hide";
				setTimeout(function(){
					eye.style.backgroundPosition="right";
				},400);
				eye.color="orange";
			}
			if(liquid.select && eye.color=="orange" && liquid.color=="orange"){
				liquid.className="hide";
				liquid.select=false;
				setTimeout(function(){
					remind("over");
				},500);
			}
		},500);
	}
	function squeeze(){
		if(!blueberry.select && apple.select && pear.select){
			pear.className="hide";
			pear.select=false;
			return "orange";
		}
		if(apple.select && !pear.select && !blueberry.select){
			return "red";
		}
		if(!apple.select && !pear.select && blueberry.select){
			blueberry.className="hide";
			blueberry.select=false;
			return "purple";
		}
		return "";
	}

	var begin=function(){
		var i = 0;
		bubble.addEventListener("click",function(event){
			speak(event,i);
			i++;
		});
	}();
	var end=function(){

	}();
/*var storage=getLocalStorage();
						storage.setItem("level2","pass");*/
	DragDrop.enable();
	bag.addEventListener("click",use_pop);
	use_button.addEventListener("click",change_panel);
	close.addEventListener("click",function(){
		use_container.className="hide";
	})
	rock.addEventListener("click",pull);
	determin_area();
}