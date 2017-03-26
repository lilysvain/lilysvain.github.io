window.onload=function(){
	var container = selectorUtil("#container");

	var key = selectorUtil("#key");
	key.width=89;
	key.height=50;
	var key_item=selectorUtil("#key_item");
	var drawer = selectorUtil("#drawer");
	var envelope = selectorUtil("#envelope");
	var envelope_item=selectorUtil("#enve_item");
    var case_close = selectorUtil("#case_close");
    var case_open = selectorUtil("#case_open");
	
	var door=selectorUtil("#door");
    door.prepare=false;
	var bubble = selectorUtil("#bubble");
	var people = selectorUtil("#people");
	var start = selectorUtil("#start");
	var black = selectorUtil("#black");
	var white = selectorUtil("#white");

	var use_container = selectorUtil("#use_container");
	var use_button = selectorUtil("#use_button");
	var bag = selectorUtil("#bag");
	var helper = selectorUtil("#helper");
	var use_items = selectorUtil("#use_items");
	var mix_items = selectorUtil("#mix_items");
	var devive_items = selectorUtil("#devive_items");
	var close = selectorUtil("#close");
    var card_tip = selectorUtil("#card_black");
    var code_black = selectorUtil("#code_black");
    var tip_black = selectorUtil("#tip_black");
    var case_tip=selectorUtil("#tip");
	
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
		var img = black.getElementsByTagName("img").item(0);
		switch(item){
			case "key":
				p.innerHTML="你得到一把钥匙~";
				img.src="image/key.png";
				img.className="tada";
				setTimeout(function(){
					img.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
			break;
			case "envelope":
				p.innerHTML="你得到一个信封~";
				img.src="image/envelope.png";
				img.className="tada";
				setTimeout(function(){
					img.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
			break;
			/*case "card":
				p.innerHTML="信封中有一些卡牌~";
				img.src="image/card.png";
				*//*setTimeout(function(){
					*//**//*black.className="hide";
					door.className="";*//**//*
					*//**//*setTimeout(function(){
						white.className="show";
						white.style.zIndex="99";
					},300);*//**//*
					*//**//*setTimeout(function(){
						var storage=getLocalStorage();
						storage.setItem("level3","pass");
						location.href="select.html";
					},1000);*//**//*
				},2500);*//*
			break;*/
			case "grass":
				p.innerHTML="恭喜你进入下一关~";
				img.src="image/grass.png";
				setTimeout(function(){
					black.className="hide";
				},1000);
			break;
		}
	}
	function checkReact(){
		var id1 = setInterval(function(){
			if(key.className != "hide" && key.xPos>960 && key.xPos<1000
				&& key.yPos>340 && key.yPos < 372){
				clearInterval(id1);
				drawer.className="";
				envelope.addEventListener("click",get_envelope);
			}
		},300);
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
	function get_key(){
		key_item.className="item";
		key.className="hide";
		black.className="";
		remind("key");
		key.removeEventListener("click",get_key);
		key_item.addEventListener("click",key_use);
	}
	function key_use(event){
		key.className="";
		key.style.left=event.clientX-container.offsetLeft-.5*key.width + "px";
		key.style.top=event.clientY+getScrollTop()-.5*key.height + "px";
		use_container.className="hide";
		document.body.addEventListener("mousemove",key_move);
	}
	function key_move(event){
		key.style.left=event.clientX-container.offsetLeft-.5*key.width + "px";
		key.style.top=event.clientY+getScrollTop()-.5*key.height + "px";
		key.addEventListener("click",key_still);
	}
	function key_still(event){
		key.xPos = event.clientX-container.offsetLeft;
		key.yPos = event.clientY+getScrollTop();
		key.removeEventListener("click",key_still);
		document.body.removeEventListener("mousemove",key_move);
		key.addEventListener("click",key_use);
	}
	function devive(){
		card_tip.className="";
        var img = selectorUtil(card_tip,"img");
        img.src="image/card.png";
        card_tip.addEventListener("click",function(){
            card_tip.className="hide";
        })
		/*remind("card");*/
	}
	function get_envelope(){
		envelope.className="hide";
		black.className="";
		remind("envelope");
		envelope_item.className="item";
		envelope_item.addEventListener("click",devive);
	}

    function get_password(){
        code_black.className="";
        var nums = code_black.getElementsByTagName("ul");
        var len=nums.length;
        for(var i=0;i<len;i++){
            nums[i].n=0;
            nums[i].style.top = 0 + "px";
            nums[i].addEventListener("click",function(event){
                var target = event.target.parentNode;
                setTimeout(function(){
                    target.n+=1;
                    if(target.n == 10){
                        target.n=0;
                    }
                    target.style.top = -target.n*290 + "px";
                    if(!door.prepare && nums[0].n==5 && nums[1].n==7 && nums[2].n==3 && nums[3].n==9){
                        setTimeout(function(){
                            code_black.className="hide";
                            open_case();
                            door.prepare=true;
                        },70);
                    }
                    if(door.prepare && nums[0].n==4 && nums[1].n==4 && nums[2].n==4 && nums[3].n==5){
                        setTimeout(function(){
                            code_black.className="hide";
                            door.className="";
                            setTimeout(function(){
                                white.className="show";
                                white.style.zIndex="99";
                            },300);
                            setTimeout(function(){
                                var storage=getLocalStorage();
                                storage.setItem("level3","pass");
                                location.href="select.html";
                            },1000);
                        },70);
                    }
                },70);
            });
        }
    }
    function open_case(){
        case_open.className="";
        case_tip.addEventListener("click", function(){
            case_tip.className="hide";
            tip_black.className="";
            tip_black.addEventListener("click",function(){
                case_tip.className="";
                tip_black.className="hide";
                case_open.className="hide";
            });
        });
    }

	var begin=function(){
		var i = 0;
		bubble.addEventListener("click",function(event){
			speak(event,i);
			i++;
		});
	}();

    case_close.addEventListener("click",get_password);
    door_code.addEventListener("click",get_password);
	bag.addEventListener("click",use_pop);
	use_button.addEventListener("click",change_panel);
	close.addEventListener("click",function(){
		use_container.className="hide";
	});
	key.addEventListener("click",get_key);
	checkReact();
}