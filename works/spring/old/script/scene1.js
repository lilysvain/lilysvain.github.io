window.onload=function(){
	var container = selectorUtil("#container");

	var fire= selectorUtil("#fire");
	fire.xPos = 606;
	fire.yPos = 386;
	fire.die=false;
	var seed = selectorUtil("#seed");
	seed.width = 59;
	seed.height = 22;
	var seed_item=selectorUtil("#seed_item");
	seed_item.select=false;
	seed_item.addEventListener("click",item_mix);
	var pipe = selectorUtil("#pipe");
	pipe.open=false;
	var water = selectorUtil("#water");
	water.xPos = 525;
	water.yPos = 250;
	var door = selectorUtil("#door");
	var dog = selectorUtil("#dog");
	var hat = selectorUtil("#hat");
	var robot = selectorUtil("#robot");
	var water_bucket = selectorUtil("#water_bucket");
	var bucket = selectorUtil("#bucket");
	bucket.width=getWidth(bucket);
	bucket.height=getHeight(bucket);
	bucket.full=false;
	var bucket_item=selectorUtil("#bucket_item");;
	var flower_pot = selectorUtil("#flower_pot");
	var flower_pot_item=selectorUtil("#flower_pot_item");
	flower_pot_item.addEventListener("click",item_mix);
	flower_pot_item.select=false;
	flower_pot_item.seed=false;
	var water_item=selectorUtil("#water_item");
	water_item.select=false;
	water_item.addEventListener("click",item_mix);
	var door=selectorUtil("#door");
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

	function ani_fire(){
		var id1=setInterval(function(){
			fire.style.backgroundImage="url(image/fire2.png)";
			if(fire.die){
				clearInterval(id1);
			}
		}, 1000);
		setTimeout(function(){
			var id2=setInterval(function(){
				fire.style.backgroundImage="url(image/fire1.png)";
				if(fire.die){
					clearInterval(id2);
				}
			},1000);
		},500);
	}
	function ani_water(){
		water.style.backgroundPosition = "top";
		var id1=setInterval(function(){
			water.style.backgroundPosition = "top";
			if(!pipe.open){
				clearInterval(id1);
			}
		},1200);
		setTimeout(function(){
			water.style.backgroundPosition = "center";
			var id2 = setInterval(function(){
				water.style.backgroundPosition = "center";
				if(!pipe.open){
					clearInterval(id2);
				}
			},1200);
		},400);
		setTimeout(function(){
			water.style.backgroundPosition = "bottom";
			var id3 = setInterval(function(){
				water.style.backgroundPosition = "bottom";
				if(!pipe.open){
					clearInterval(id3);
				}
			},1200);
		},800);
	}
	function ani_robot_open(){
		robot.style.backgroundPosition="center";
		robot.removeEventListener("click",ani_robot_open);
		robot.addEventListener("click",ani_robot_close);
		document.getElementById("pot").addEventListener("click",function(event){
			event.stopPropagation();
			robot.style.backgroundPosition="right";
			robot.removeEventListener("click",ani_robot_close);
			robot.style.cursor="arrow";
			pot.className="hide";
			flower_pot_item.className="item";
			black.className="";
			remind("flower_pot");
			flower_pot_item.className="item";
			/*flower_pot_item.addEventListener("click",item_mix);*/
		})
	}
	function ani_robot_close(){
		robot.style.backgroundPosition="0px 0";
		robot.removeEventListener("click",ani_robot_close);
		robot.addEventListener("click",ani_robot_open);
	}

	function checkReact(){
		var id1 = setInterval(function(){
			if(water.className != "hide" && (!bucket.full) && Math.abs(bucket.xPos-water.xPos)<=25
				&& (bucket.yPos-water.yPos > 140) && (bucket.yPos-water.yPos < 190)){
				clearInterval(id1);
				setTimeout(function(){
					water_bucket.className="show";
					bucket.full=true;
					setTimeout(function(){
						water_close();
					},300);
				},300);
			}
		},300);
		var id2 = setInterval(function(){
			if(bucket.full){
				var distance = Math.sqrt((fire.xPos-bucket.xPos)*(fire.xPos-bucket.xPos)
					+ (fire.yPos-bucket.yPos)*(fire.yPos-bucket.yPos));
				if(distance < 60){
					clearInterval(id2);
					fire.className="dieout";
					water_bucket.className="opacity";
					bucket.className="hide";
					bucket.full = false;
					seed.addEventListener("click", get_seed);
					setTimeout(function(){
						fire.className="hide";
						fire.die=true;
					},900);
					/*setTimeout(function(){
						bucket.className="hide";
						bucket_item.style.backgroundImage="url(image/tong.png)";
						bucket.full = false;
						bucket.removeEventListener("click",bucket_still);
						bucket.removeEventListener("click",bucket_use);
					},500);
					clearInterval(id2);*/
				}
			}
		},300);
		var id3 = setInterval(function(){
			if(fire.die && water.className != "hide" && (!bucket.full) && Math.abs(bucket.xPos-water.xPos)<=25
				&& (bucket.yPos-water.yPos > 140) && (bucket.yPos-water.yPos < 190)){
				clearInterval(id3);
				setTimeout(function(){
					water_bucket.className="show";
					bucket.full=true;
					water_item.className="item";
					bucket_item.className="hide";
					setTimeout(function(){
						water_close();
					},300);
				},300);
			}
		},300);
	}
	function use_pop(){
		use_container.className="";
		var items = mix_items.getElementsByTagName("div");
		for(var i=0;i<items.length;i++){
			removeClass(items[i],"select");
			items[i].addEventListener("click",item_mix);
			items[i].removeEventListener("click",item_cancel);
			items[i].select=false;
		}
		check_mix();
	}
	function check_mix(){
		var id1 = setInterval(function(){
			if(flower_pot_item.select && seed_item.select && !water_item.select){
				clearInterval(id1);
				setTimeout(function(){
					seed_item.className="hide";
					flower_pot_item.className="tada item";
					setTimeout(function(){
						removeClass(flower_pot_item,"tada");
						flower_pot_item.seed=true;
						flower_pot_item.addEventListener("click",item_mix);
						flower_pot_item.removeEventListener("click",item_cancel);
						flower_pot_item.select=false;
					},700);
				},300);
			}
		},300);
		var id2 = setInterval(function(){
			if(flower_pot_item.select && flower_pot_item.seed && water_item.select){
				clearInterval(id2);
				setTimeout(function(){
					water_item.style.backgroundImage="url(image/tong.png)";
					flower_pot_item.style.backgroundImage="url(image/grass.png)";
				},300);
				setTimeout(function(){
					use_container.className="hide";
					black.className="";
					remind("grass");
				},600);
				setTimeout(function(){
					door.className="";
					setTimeout(function(){
						white.className="show";
						white.style.zIndex="99";
					},300);
					setTimeout(function(){
						var storage=getLocalStorage();
						storage.setItem("level1","pass");
						location.href="select.html";
					},1000);
				},1800);
			}
		},300);
	}
	function item_mix(event){
		var item = event.target;
		item.className="item select";
		item.removeEventListener("click",item_mix);
		item.addEventListener("click",item_cancel);
		item.select=true;
	}
	function item_cancel(event){
		var item = event.target;
		item.className="item";
		item.addEventListener("click",item_mix);
		item.removeEventListener("click",item_cancel);
		item.select=false;
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
	function get_seed(){
		seed_item.className="item";
		seed.className="hide";
		black.className="";
		remind("seed");
	}
	function remind(item){
		var p = black.getElementsByTagName("p").item(0);
		var img = black.getElementsByTagName("img").item(0);
		switch(item){
			case "bucket":
				p.innerHTML="你得到一个水桶~";
				img.src="image/tong.png";
				img.className="tada";
				setTimeout(function(){
					img.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
			break;
			case "flower_pot":
				p.innerHTML="你得到一个花盆~";
				img.src="image/huapen.png";
				img.className="tada";
				setTimeout(function(){
					img.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
			break;
			case "seed":
				p.innerHTML="你得到一颗种子~";
				img.src="image/seed.png";
				img.className="tada";
				setTimeout(function(){
					img.className="";
				},700);
				setTimeout(function(){
					black.className="hide";
				},1100);
			break;
			case "grass":
				p.innerHTML="恭喜你进入下一关~";
				img.src="image/grass.png";
				setTimeout(function(){
					black.className="hide";
				},1000);
			break;
		}
	}
	function get_bucket(event){
		hat.className="hide";
		black.className="";
		remind("bucket");
		bucket_item.className="item";
		bucket_item.addEventListener("click",bucket_use);
	}
	function bucket_use(event){
		bucket.className="";
		bucket.style.left=event.clientX-container.offsetLeft-.5*bucket.width + "px";
		bucket.style.top=event.clientY+getScrollTop()-.5*bucket.height + "px";
		use_container.className="hide";
		document.body.addEventListener("mousemove",bucket_move);
	}
	function bucket_move(event){
		bucket.style.left=event.clientX-container.offsetLeft-.5*bucket.width + "px";
		bucket.style.top=event.clientY+getScrollTop()-.5*bucket.height + "px";
		bucket.style.cursor="pointer";
		bucket.addEventListener("click",bucket_still);
	}
	function bucket_still(event){
		bucket.xPos = event.clientX-container.offsetLeft;
		bucket.yPos = event.clientY+getScrollTop();
		bucket.removeEventListener("click",bucket_still);
		document.body.removeEventListener("mousemove",bucket_move);
		bucket.addEventListener("click",bucket_use);
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
	function water_open(){
		pipe_switch();
		setTimeout(function(){
			water.className="";
			ani_water();
		},700);
		pipe.removeEventListener("click",water_open);
		pipe.addEventListener("click",water_close);
	}
	function water_close(){
		pipe_switch();
		setTimeout(function(){
			water.className="hide";
		},700);
		pipe.addEventListener("click",water_open);
		pipe.removeEventListener("click",water_close);
	}
	function pipe_switch(){
		if(pipe.open){
			pipe.className="flipOutY"
			pipe.open=false;
		}else{
			pipe.className="flipInY";
			pipe.open=true;
		}
	}

	var begin=function(){
		var i = 0;
		bubble.addEventListener("click",function(event){
			speak(event,i);
			i++;
		});
	}();
	/*var storage=getLocalStorage();*/
						/*window.*/localStorage.setItem("level1","pass");
						/*location.href="select.html";*/

	ani_fire();
	bag.addEventListener("click",use_pop);
	hat.addEventListener("click",get_bucket);
	pipe.addEventListener("click",water_open);
	robot.addEventListener("click",ani_robot_open);

	use_button.addEventListener("click",change_panel);
	close.addEventListener("click",function(){
		use_container.className="hide";
	})
	checkReact();
}