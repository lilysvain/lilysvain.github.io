window.onload = function(){
    var drawing = selectorUtil("#drawing");
    if (drawing.getContext){
        var context = drawing.getContext("2d");
    }else{
        return;
    }

    //UI HTML elements
    var container = selectorUtil("#container");
    var uiLoad = selectorUtil("#loading");
    var uiTitle = selectorUtil("#start");
    var uiStart = selectorUtil("#start_light");
    var uiSelect = selectorUtil("#select");
    var uiCali = selectorUtil("#cali_container");
    var uiGrade = selectorUtil("#grade");
    var uiArrow = selectorUtil("#arrow");
    var uiTip = selectorUtil("#score_tip");
    var uiReplay = selectorUtil("#replay");
    var uiBack = selectorUtil("#gohome");
    var uiScore = selectorUtil("#user_score");

    //Game preload
    var loadCount;
    var itemsToLoad = 8;
    //sounds
    var music1;
    var audioType;
    //Big Picture
    var backgroundPic1;
    var backgroundPic2;
    var backgroundPic3;
    var soundPic1;
    var soundPic2;
    var soundPic3;
    var soundPic4;
    /*var areaPic;*/
    var arrowPic;
    var greatLightPic;

    //const Variable
    var host = "10.10.100.101";
    //var host = "192.168.2.30";
    var port = 8888;
    var path = "/websocket";
    var meters=[];
    var meters_colone=[];
    var receives=[];
    var first_time;
    var FALLTIME = 0.8;
    var LEFT = "2";
    var DOWN = "0";
    var UP = "1";
    var RIGHT = "3";
    var BIG = "6";

    const FRAME_RATE=33;
    var intervalTime=1000/FRAME_RATE;
    var perfectTime= 0.5;
    var greatTime=1;
    var delayTime=200;
    var fallSpeed;
    var dScale;
    var pageWidth;
    var pageHeight;
    var gameOver=false;

    //create game objects and arrays
    var notes=[];
    var currentScore;
    var currentTime;
    var lastTime;

    //score
    var user_score=0;
    var total_tempo;

    function gameStateInit(){
        pageWidth=getPageWidth();
        pageHeight=getPageHeight();
        container.style.height = pageHeight + "px";
        drawing.width=pageWidth;
        drawing.height=pageHeight;
        fallSpeed = (pageHeight-140)/(FRAME_RATE*FALLTIME);
        dScale = 0.5/(FRAME_RATE*FALLTIME);
        window.addEventListener("resize",function(){
            pageHeight=getPageHeight();
            pageWidth=getPageWidth();
            drawing.width=pageWidth;
            drawing.height=pageHeight;
            container.style.height = pageHeight + "px";
            fallSpeed = (pageHeight-140)/(FRAME_RATE*FALLTIME);
        });

        loadCount=0;
        backgroundPic1 = new Image();
        backgroundPic1.addEventListener("load", itemLoaded);
        backgroundPic1.src = "image/start.png";
        backgroundPic2 = new Image();
        backgroundPic2.addEventListener("load", itemLoaded);
        backgroundPic2.src = "image/select_bg.png";
        backgroundPic3 = new Image();
        backgroundPic3.addEventListener("load", itemLoaded);
        backgroundPic3.src = "image/game_bg.png";
        soundPic4 = new Image();
        soundPic4.addEventListener("load", itemLoaded);
        soundPic4.src = "image/4.jpg";
        soundPic1 = new Image();
        soundPic1.addEventListener("load", itemLoaded);
        soundPic1.src = "image/1.jpg";
        soundPic2 = new Image();
        soundPic2.addEventListener("load", itemLoaded);
        soundPic2.src = "image/2.jpg";
        soundPic3 = new Image();
        soundPic3.addEventListener("load", itemLoaded);
        soundPic3.src = "image/3.jpg";

        /*areaPic = new Image();
        areaPic.addEventListener("load", itemLoaded);
        areaPic.src="image/areas.png";*/
        arrowPic = new Image();
        arrowPic.addEventListener("load", itemLoaded);
        arrowPic.src="image/arrows.png";
        greatLightPic = new Image();
        greatLightPic.src="image/great.png";
    }

    function itemLoaded(event) {
        loadCount++;
        if (loadCount >= itemsToLoad) {
            backgroundPic1.removeEventListener("load", itemLoaded);
            backgroundPic2.removeEventListener("load", itemLoaded);
            backgroundPic3.removeEventListener("load", itemLoaded);
            soundPic4.removeEventListener("load",itemLoaded);
            soundPic1.removeEventListener("load",itemLoaded);
            soundPic2.removeEventListener("load",itemLoaded);
            soundPic3.removeEventListener("load",itemLoaded);
            /*areaPic.removeEventListener("load", itemLoaded);*/
            arrowPic.removeEventListener("load", itemLoaded);
            gameStateTitle();
        }
    }

    function gameStateTitle(){
        addClass(uiLoad,"hide");
        uiStart.addEventListener("click",function(event){
            event.preventDefault();
            correct();
        });
        window.addEventListener("keyup",k_correct);
    }
    function k_correct(event){
        if(event.keyCode == 0 || event.keyCode == 32){
            correct();
        }
    }

    function correct(){
        window.removeEventListener("keyup",k_correct);
        selectorUtil("#selector").className="hide";
        selectorUtil("#start_container").className="hide";
        removeClass(uiCali,"hide");
        window.onkeyup = function(event){
            var data = event.keyCode;
            switch(data){
                case 40:
                    if(uiArrow.className == "down"){
                        uiArrow.className = "left2";
                    }
                    break;
                case 37:
                    if(uiArrow.className == "left"){
                        uiArrow.className = "down"
                    }
                    if(uiArrow.className == "left2"){
                        selectMusic();
                    }
                    break;
                /*case 39:
                    if(uiArrow.className == "left2"){
                        selectMusic();
                    }
                    break;*/
            }
        };
        /*var socket = new WebSocket("ws://"+host+":"+port+path);
        var message = "start";*/
        //message = JSON.stringify(message);
        /*socket.onopen = function(){
            socket.send(message);
        };
        socket.onmessage = function(event) {
            var data = event.data;
            switch(data){
                case "0":
                    if(uiArrow.className == "down"){
                        uiArrow.className = "left2";
                    }
                break;
                case "2":
                    if(uiArrow.className == "left"){
                        uiArrow.className = "down"
                    }
                break;
                case "4":
                    if(uiArrow.className == "left2"){
                        selectMusic();
                        socket.close();
                    }
                break;
            }
        }*/
    }

    function selectMusic(){
        window.onkeyup = null;
         addClass(uiTitle,"hide");
         /*var socket = new WebSocket("ws://"+host+":"+port+path);
         socket.onmessage = function(event){
            var data = event.data;
            turnPic(data,event.target);
         };*/
         //socket.close();
        window.onkeyup = turnPic;
    }
    function turnPic(event/*data,socket*/){
        var selPic = selectorUtil(".select");
        var len = document.images.length;
        var i;
        /*var data=event.target.id;*/
        var data = event.keyCode;
        for(i=0;i<len;i++){
            if(selPic == document.images[i]){
                break;
            }
        }
        var prevPic = document.images[(i-1+4)%4];
        var nextPic = document.images[(i+1)%4];
        var nonePic = document.images[(i+2)%4];;
        if(data == 37){
            selPic.className = "prev";
            prevPic.className = "none";
            nonePic.className = "next";
            nextPic.className = "select";
        }
        if(data == 39){
            selPic.className = "next";
            prevPic.className = "select";
            nonePic.className = "prev";
            nextPic.className = "none";
        }
        if(data == 0 || data== 32 || data == 8){
            gameStateNewGame();
            /*socket.close();*/
        }
        /*if(data == "left"){
            selPic.className = "prev";
            prevPic.className = "none";
            nonePic.className = "next";
            nextPic.className = "select";
        }
        if(data == "right"){
            selPic.className = "next";
            prevPic.className = "select";
            nonePic.className = "prev";
            nextPic.className = "none";
        }else{
            gameStateNewGame();
            *//*socket.close();*//*
        }*/
    }

    function gameStateNewGame(){
        /*var socket = new WebSocket("ws://"+host+":"+port+path);
        var message = "music";
        socket.onopen = function(){
            socket.send(message);
        };
        socket.onmessage = function(event) {
            var data = JSON.parse(event.data);
            //console.log(data);
            if(data.music) {
                meters = data.music;
                total_tempo = meters.length;
                meters_colone = [].concat(meters);
                //console.log(meters);
                first_time = meters[0][1];
                music1 = document.createElement("audio");
                audioType = supportedAudioFormat(music1);
                document.body.appendChild(music1);
                music1.addEventListener("canplaythrough",gameStatePlayerStart);
                music1.src= "audio/CountingStars." + audioType;
            }else if(typeof data == "number" && lastTime){
                //console.log(data);
                currentTime = new Date();
                var dur = (currentTime-lastTime)/1000.0;
                data = data + "";
                var arrayTmp = [data,dur];
                receives.push(arrayTmp);
            }
        };*/
        //if(data.music) {
            //meters = data.music;
            meters = [["2",1],["0",2],["1",3],["3",4]];
            total_tempo = meters.length;
            meters_colone = [].concat(meters);
            //console.log(meters);
            first_time = meters[0][1];
            music1 = document.createElement("audio");
            audioType = supportedAudioFormat(music1);
            document.body.appendChild(music1);
            //music1.addEventListener("canplaythrough",gameStatePlayerStart);
            music1.src= "audio/CountingStars." + audioType;
        //}else if(typeof data == "number" && lastTime){
            //console.log(data);
        window.onkeyup = function(event){
            currentTime = new Date();
            var dur = (currentTime-lastTime)/1000.0;
            var data;
            switch(event.keyCode){
                case 37:
                    data = LEFT;
                    break;
                case 38:
                    data=UP;
                    break;
                case 39:
                    data=RIGHT;
                    break;
                case 40:
                    data=DOWN;
                    break;
            }
            data = data + "";
            var arrayTmp = [data,dur];
            receives.push(arrayTmp);
        }
        gameStatePlayerStart();
        //}
    }

    function gameStatePlayerStart(){
        addClass(uiSelect,"hide");
        /*initAreas();*/
        initNote();
        var play_time = FALLTIME-first_time;
        setTimeout(function(){
            music1.play();
            lastTime = new Date();
        },play_time);
        var render = function(){
            context.clearRect(0, 0, pageWidth, pageHeight);
            /*updateAreas();*/
            updateLight();
            updateNote();
            if(!gameOver){
                setTimeout(arguments.callee,intervalTime);
            }
        }();
    }
    function gameStateGameOver(){
        gameOver = true;
        removeClass(uiGrade,"hide");
        uiScore.innerHTML = user_score + "%";
        uiReplay.addEventListener("click",function(){
            addClass(uiGrade,"hide");
            meters = [].concat(meters_colone);
            music1.start=0.0;
            user_score = 0;
            gameOver=false;
            gameStatePlayerStart();
        });
        uiBack.addEventListener("click",function(){
            addClass(uiGrade,"hide");
            removeClass(uiSelect,"hide");
            selectMusic();
            //location.reload();
        });
    }

    function initNote(){
        var tempo = meters.shift();
        var direction = tempo[0];
        var time = tempo[1];
        var noteTmp = new Note(dScale,fallSpeed,pageWidth,direction,time);
        notes.push(noteTmp);
        context.drawImage(arrowPic,0,noteTmp.yPic,noteTmp.width,noteTmp.height,noteTmp.xPos,noteTmp.yPos,noteTmp.scale*noteTmp.width,noteTmp.scale*noteTmp.height);
        if(meters.length != 0){
            var duration = meters[0][1]-time;
            setTimeout(initNote, duration * 1000);
        }
    }
    function updateNote(){
        var i;
        var noteTmp;
        for(i=0;i<notes.length;i++){
            noteTmp=notes[i];
            noteTmp.yPos += noteTmp.dy;
            noteTmp.scale += noteTmp.dScale;
            noteTmp.xPos = 0.5*(pageWidth-(noteTmp.scale)*noteTmp.width);
            if(noteTmp.yPos > pageHeight-140 || noteTmp.scale > 1){
                noteTmp.yPos = pageHeight-140;
                noteTmp.scale = 1;
                if(!noteTmp.delete) {
                    setTimeout(function () {
                        notes.shift();
                        if (meters.length == 0 && notes.length == 0) {
                            gameStateGameOver();
                        }
                    }, delayTime);
                    checkReact(noteTmp);
                    noteTmp.delete=true;
                }
            }
            context.drawImage(arrowPic,0,noteTmp.yPic,noteTmp.width,noteTmp.height,noteTmp.xPos,noteTmp.yPos,noteTmp.scale*noteTmp.width,noteTmp.scale*noteTmp.height);
        }
    }

    function checkReact(targetNote){
        var target_time =targetNote.time;
        var target_dir =targetNote.direction;
        //console.log(receives.length);
        for(;receives.length!=0;){
            var receive = receives.shift();
            var receive_time = receive[1];
            var d_time = target_time-receive_time;
            //console.log(target_time);
            //console.log(receive_time);
            var receive_dir = receive[0];
            if(d_time < 0){
                receives.unshift(receive);
                display("miss");
                return;
            }else if(receive_dir == target_dir && d_time <= perfectTime) {
                user_score = Math.ceil(user_score + 1.0 / total_tempo * 100);
                display("perfect");
                return;
            }else if(receive_dir == target_dir && greatTime >= d_time && d_time > perfectTime){
                user_score = Math.ceil(user_score + 0.8/total_tempo*100);
                display("great");
                return;
            }else if(d_time > greatTime || receive_dir != target_dir) {
                display("miss");
                continue;
            }
        }
        display("miss");
    }
    function display(state){
        switch(state){
            case "great":
                currentScore="great";
                uiTip.className="great";
                break;
            case "perfect":
                currentScore="perfect";
                uiTip.className="perfect";
            break;
            case "miss":
                currentScore="miss";
                uiTip.className="miss";
            break;
        }
        setTimeout(function(){
            uiTip.className="hide";
            currentScore="";
        },delayTime);
    }
    function updateLight(){
        if(currentScore == "great" || currentScore == "perfect"){
            context.drawImage(greatLightPic, 0.5 * (pageWidth - 480), pageHeight - 254, 480, 294);
        }
    }

    /**
     * Constructors
     */
    function Note(dScale,dy,pageWidth,direction,time){
        this.direction = direction;
        this.time = time;
        this.dy = dy;
        this.dScale = dScale;
        this.xPos = 0.5*(pageWidth-(this.scale)*this.width);
        switch(direction){
            case LEFT:
                this.yPic = 0;
            break;
            case RIGHT:
                this.yPic = 1*this.height;
            break;
            case UP:
                this.yPic = 2*this.height;
            break;
            case DOWN:
                this.yPic = 3*this.height;
            break;
            case BIG:
                this.yPic = 4*this.height;
            break;
        }
    }
    Note.prototype = {
        constructor: Note,
        width : 278,
        height : 153,
        scale : 0.5,
        yPos:0
    };

    //*** application start
    gameStateInit();
}