var msgTransmit = {
    name: null,
    score: 0,
    tel: 0,
    game: 1,
    flag: false
};
var GAME={
    score:0,
    name:""
};

var form = document.forms[0];
var dom = {
	popup: getBId("popup"),
	submitName: getBId("submitName"),
	submitTel: getBId("submitTel"),
	playerName: form.elements["playerName"],
	userName: getBId("userName"),
	lis: document.querySelectorAll("ul li"),
	myScore: getBId("myScore"),
	myRank: getBId("myRank"),
	playerTel: form.elements["playerTel"],
	firstGame: getBId("firstGame"),
	contact: getBId("contact")
}

function sendMsg() {
	var result
	,endArg = {
		arg1: 0,
		arg2: 1,
		arg3: 2
	};
	function dealPopupT(e) {
		e.preventDefault();
		msgTransmit.tel = dom.playerTel.value;
		dom.popup.addClass("hide");
    	dom.contact.addClass("hide");
		dom.submitTel.removeEventListener("click", dealPopupT, false);
		msgTransmit.flag = true;
		contact( true, secondContact, "http://christmas.hustonline.net/game1/end", "msg="+JSON.stringify(msgTransmit) );
	}
	function inputTel() {
		dom.popup.removeClass('hide');
    	dom.contact.removeClass('hide');
    	dom.submitTel.addEventListener("click", dealPopupT, false);
	}
	function firstContact() {
		var list = dom.lis
			,i
			,len
			,index
			,index2
			,rankrec;
		for( i = 0, len = list.length; i < len; i++ ) {
     		if( i == 6 ) continue;
     		if( i < 6 ) {
      			index2 = i;
     		}else {
      			index2 = i-1;
     		}
     		index = -1;
     		while( list[i].children[++index].nodeType != 1 );
     		list[i].children[index].innerHTML = result.list[index2].rank;
     		while( list[i].children[++index].nodeType != 1 );
     		list[i].children[index].innerHTML = result.list[index2].name;
     		while( list[i].children[++index].nodeType != 1 );
     		list[i].children[index].innerHTML = result.list[index2].score;
    	}
		result.is6 <= 6 && inputTel();
		dom.myScore.innerHTML = GAME.score;
    	dom.myRank.innerHTML = result.is6;
	}
	function secondContact() {
		alert("提交成功~~等待好消息吧~~");
	}
	function endReq() {
		var rar = ""
			,i
			,uid
			,abs
			,password = ""
			,t
			,efs;
		for( i = 0, uid = 4; i < uid; i++ ) {
			password = password + i; 
		}
		t = password;
		password = "";
		rar += "{\"" + result.keys[0].substring(result.index[0], result.index[0] + 8)+"\":\"";
		efs = rar;
		rar = null;
		password = efs;
		rar = password  + result.keys[1].substring(result.index[1], result.index[1]+13) + "\",\"" + 
							result.keys[2].substring(result.index[2], result.index[2] + 8)+"\":\"" + result.keys[3].substring(result.index[3], result.index[3]+13) + 
				"\",\"" + "score\":" + GAME.score + ",\"name\":\"" + GAME.name + "\",\"tel\":0" + ",\"game\":1" +
						"}";
		contact(false, firstContact, "http://christmas.hustonline.net/game1/end", "msg="+rar);
	}
	function contact(flag, callback, url, arg) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 ) {
				if( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ) {
					if( url.indexOf("begin") == -1 ) {
						result = JSON.parse(xhr.responseText);
					}
					if(callback) {
						callback();
					}
				}else {
					if( confirm("网络请求失败，是否重试？") ) {
						arguments.callee(flag, callback, url, arg);
					}
				}
			}
		}
		xhr.open("post", url, false);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(arg);
	}
	contact(false, endReq, "http://christmas.hustonline.net/game1/end_auth", "ARG1="+endArg.arg1+"&ARG2="+endArg.arg2+"&ARG3="+endArg.arg3);
}
		

Element.prototype.removeClass = function( value ) {
	var classes, elem, cur, clazz, j,
		i = 0,
		len = this.length,
		proceed = arguments.length === 0 || typeof value === "string" && value;

	if ( proceed ) {
		classes = ( value || "" ).match( /\S+/g ) || [];
		elem = this;
		cur = elem.nodeType === 1 && ( elem.className ?
			( " " + elem.className + " " ).replace( /[\t\r\n\f]/g, " " ) :
			""
		);

		if ( cur ) {
			j = 0;
			while ( (clazz = classes[j++]) ) {
				while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
					cur = cur.replace( " " + clazz + " ", " " );
				}
			}
			elem.className = value ? cur : "";
		}
	}
}
Element.prototype.addClass = function( value ) {
	var classes, elem, cur, clazz, j,
		i = 0,
		len = this.length,
		proceed = typeof value === "string" && value;
	if ( proceed ) {
		classes = ( value || "" ).match( /\S+/g ) || [];
		elem = this;
		cur = elem.nodeType === 1 && ( elem.className ?
			( " " + elem.className + " " ).replace( /[\t\r\n\f]/g, " " ) :
			" "
		);
		if ( cur ) {
			j = 0;
			while ( (clazz = classes[j++]) ) {
				if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
					cur += clazz + " ";
				}
			}
			elem.className = cur ;
		}
	}
}

function getBId(id) {
	return document.querySelector("#" + id) || document.getElementById(id);
}
