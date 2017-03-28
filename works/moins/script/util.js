/**
 * the dimensions of the page viewport
 */
function getPageWidth(){
    var pageWidth = window.innerWidth;
    if (typeof pageWidth != "number"){
        if (document.compatMode == "CSS1Compat"){
            pageWidth = document.documentElement.clientWidth;
        } else {
            pageWidth = document.body.clientWidth;
        }
    }
    return pageWidth;
}
function getPageHeight(){
    var pageHeight = window.innerHeight;
    if (typeof pageHeight != "number"){
        if (document.compatMode == "CSS1Compat"){
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageHeight = document.body.clientHeight;
        }
    }
    return pageHeight;
}

function selectorUtil(element,pattern){
    if(pattern === undefined){
        return document.querySelector(element);
    }else{
        return element.querySelector(pattern);
    }
}

function supportedAudioFormat(audio) {
    var returnExtension = "";
    if (audio.canPlayType("audio/ogg")) {
        returnExtension = "ogg";
    } else if(audio.canPlayType("audio/mpeg")) {
        returnExtension = "mp3";
    } else if(audio.canPlayType("audio/wav")) {
        returnExtension = "wav";
    }
    return returnExtension;
}

function removeClass(item,className){
    var classNames = item.className.split(/\s+/);
    var pos = -1, i, len;
    for (i=0, len=classNames.length; i < len; i++){
        if (classNames[i] == className){
            pos = i;
            break;
        }
    }
    if(i<len){
        classNames.splice(i,1);
        item.className = classNames.join(" ");
    }
}
function addClass(item,className){
    var classes = item.className;
    if(classes.indexOf(className) > -1) {
        return true;
    }
    if(!classes){
        classes=className;
    }else{
        classes = classes + " " + className;
    }
    item.className = classes;
}