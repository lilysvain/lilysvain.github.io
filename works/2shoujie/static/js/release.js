// (function() {

//     var catSelect = function() {
//         var sel = $(".goods-cat .select"),
//             input = $("#cat"),
//             state = 0;// 1=isshowing, 0=hidden,
//         function showIn() {
//             if(state === 1) {
//                 return ;
//             }
//             var that = this;
//             state = 1;
//             console.log(sel)
//             $(sel).fadeIn("fast");
//             $(sel).one("click", "li span", function() {
//                 var value = $(this).text();
//                 $(".goods-cat .form-input-wr span").text( value );
//                 $(input).val(value);
//                 that.hide();
//             });
//         }

//         function hideOut() {
//             if(state === 0) {
//                 return ;
//             }
//             state = 0;
//             $(sel).fadeOut("fast");
//         }

//         function bindShow() {
//             var that = this;
//             $(".goods-cat .form-input-wr span").on("click", function() {
//                 that.show();
//             });
//         }
//         return {
//             show: showIn,
//             hide: hideOut,
//             bind: bindShow
//         };
//     }();

//     var discount = function() {
//         var dis = $(".goods-discount .form-input-wr"),
//             input = $("#discount"),
//             nowVal = "no";

//         function _value(value) {
//             $(input).val(value);
//         }

//         function _selThis(dom) {
//             var val = $(dom).data("value");
//             if(val === nowVal) return ;
//             _value(val);
//             $(dis).children("." + nowVal).removeClass("sel");
//             nowVal = val;
//             $(dis).children("." + nowVal).addClass("sel");
//         }

//         function bindSel() {
//             var that = this;
//             $(dis).on("click", "span", function() {
//                 _selThis(this);
//             });
//         }

//         return {
//             bind: bindSel
//         };
//     }();

//     catSelect.bind();
//     discount.bind();
//     var inputs = $("input, textarea");
//     $(inputs).on("focus", function() {
//         $(this).parent(".form-input-wr").addClass("focus");
//     });
//     $(inputs).on("blur", function() {
//         $(this).parent(".form-input-wr").removeClass("focus");
//     });
// })();

var status=0;
function getImgURL(node) {  
  var imgURL = "";  
    try{   
        var file = null;
        if(node.files && node.files[0] ){
          file = node.files[0]; 
        }else if(node.files && node.files.item(0)) {                          
          file = node.files.item(0);   
        }   
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
          //Firefox7.0 
      imgURL =  file.getAsDataURL();  
      //alert("//Firefox7.0"+imgRUL);                   
        }catch(e){
          //Firefox8.0以上                          
          imgRUL = window.URL.createObjectURL(file);
      //alert("//Firefox8.0以上"+imgRUL);
        }
     }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常               
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (node.files && node.files[0]) {                        
          var reader = new FileReader(); 
          reader.onload = function (e) {                                  
              imgURL = e.target.result;  
          };
          reader.readAsDataURL(node.files[0]); 
        }  
     }
  imgurl = imgURL;
  // creatImg(imgRUL);
  return imgRUL;
}
   
//    function creatImg(imgRUL){   //根据指定URL创建一个Img对象
//   alert(imgRUL);
// }

var catSelect=function(){
        var curUlId=null,
        $mainCat=$('.goods-cat .form-value'),
        $viceCat=$('.goods-cat .form-value-l');
        $mainCat.children('.form-input-wr').click(function(){
            $mainCat.children('.select').css('display','block');
        })
        $mainCat.children('.select').children('li').click(function(){
            var val=$(this).text(),
            cid=$(this).attr('cid');
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
            if(cid==undefined) $viceCat.css('display','none');
            else{
                $viceCat.css('display','block');
                curUlId=cid;
            }
            $mainCat.children('.form-input-wr').children('span').text(val);
            $('#cat_l').val('');
            $viceCat.children('.form-input-l-wr').children('span').text('未选择');
            $('#cat').val(val);
            $mainCat.children('.select').css('display','none');
        })
        $viceCat.children('.form-input-l-wr').click(function(){
                $viceCat.children('.select').eq(curUlId).css('display','block');
        })
        $viceCat.children('.select').children('li').click(function(){
            var val=$(this).text();
            $('#cat_l').val(val);
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
            $viceCat.children('.form-input-l-wr').children('span').text(val);
            $viceCat.children('.select').eq(curUlId).css('display','none');
        })
        $(document).click(function(){ if ($(event.srcElement).is(".goods-cat .form-value,.goods-cat .form-value *,goods-cat form-value-l,.goods-cat .form-value-l *")) {  return false; } else { $mainCat.children('.select').css('display','none');$viceCat.children('.select').css('display','none'); } });
    }
var addrSelect=function(){
    var $addr=$('.goods-place .form-value');
    $addr.children('.form-input-wr').click(function(){
        $addr.children('ul').css('display','block');
    })
    $addr.children('ul').children('li').click(function(){
        var val=$(this).text();
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
        $addr.children('.form-input-wr').children('span').text(val);
        $('#place').val(val);
        $addr.children('ul').css('display','none');
    })
    $(document).click(function(){ if ($(event.srcElement).is(".goods-place .form-value,.goods-place .form-value *")) {  return false; } else { $addr.children('.select').css('display','none'); } });
}


$('.photo-area').attr('id','unique_img');
var img_count=0;
var addImg=function(){
    $('.choose-area').click(function(){
        $(this).next().click();
    });
    $('input[type="file"]').change(function(){
        img_count++;
        if(img_count<4){
            // alert($(this).val());
                var src=getImgURL(this);
                var $img=$('<img style="max-width:140px;max-height:140px;margin:auto;display:block;" src="'+src+'">');
                var $c_node=$('#unique_img').clone(true).attr('id','');
                $c_node.append($img);
                $c_node.children('div').css('display','none');
                $c_node.children('span').css('display','block');
                $('#unique_img').before($c_node);
            }
        else if(img_count==4){
                var src=getImgURL(this);
                var $img=$('<img style="width:auto;height:140px;" src="'+src+'">');
                var $c_node=$('#unique_img').clone(true).attr('id','');
                $c_node.append($img);
                $c_node.children('div').css('display','none');
                $c_node.children('span').css('display','block');
                $('#unique_img').before($c_node);
                $('#unique_img').css('display','none');
        }
    });
function o_a_i(){
    if(status==0){
      $('.upload-area').css('display','inline-block');
      $('.photo-area').removeClass('over-up');
      $('.photo-area').addClass('init-up');
    }
    else if(status>=4){
      $('.upload-area').css('display','none');
    }
    else{
      $('.upload-area').css('display','inline-block');
    }
}
    $('.close').click(function(){
        $(this).parent('div').remove();
        $(this).parent('div').empty();
        status--;
        o_a_i();
    })
}
 var discount=function(){
    $('.goods-discount .form-value .form-input-wr span').click(function(){
        var val=$(this).attr('data-value');
        $('.goods-discount .form-value .form-input-wr span').removeClass('sel');
        $(this).addClass('sel');
        $('#discount').val(val);
    })
 }
var act=function(){
    $('.form-value input,.form-value textarea').focus(function(){
        $(this).parent('div').css({
            'background-color': 'rgb(255,255,255)',
            'border-color':'rgb(68,193,165)'
        });
        $(this).parent('div').removeClass('form-alert');
    });
    $('.form-value input,.form-value textarea').blur(function(){
       if($(this).val()==''){
        $(this).parent('div').css({
            'border': '1px solid rgb(208,224,226)',
            'background-color': 'rgb(246,249,249)'
        });
       } 
       else{
        $(this).parent('div').css({
            'background-color': 'rgb(255,255,255)',
            'border-color':'rgb(68,193,165)'
        });
       }
    });
}
function submitCaution(elem){
    $('#'+elem).parent('div').css({
        'background-color': 'rgb(255,233,236)',
        'border-color':'rgb(235,80,83)'
    });
    $('#'+elem).parent('div').addClass('form-alert');
}
var submitAct=function(){
    $('.form-wr form').submit(function(){
        var tel=$('#tel').val(),
            price=$('#price').val(),
            title=$('#title').val(),
            qq=$('#qq').val(),
            desc=$('#desc').val();
        var i=1;
        if(price==''){
            submitCaution('price');
            i=0;
        }
        if(title==''){
            submitCaution('title');
            i=0;
        }
        if(desc==''){
            submitCaution('desc');
            i=0;
        }
        if(!tel.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
            submitCaution('tel');
            i=0;
        }
        if(!qq.match(/^[1-9]d{4,8}$/)){
            submitCaution('qq');
            i=0;
        }
        if(i==0) return false;
        else return true;
    })
}
var selectPhoto=function(){
    $('.camera-button').click(function(){
        $(this).parent('div').css('display','none');
        $('.gallery').css('display','block');
    })
}
$(document).ready(function(){
    // photo_init();
    act();
    selectPhoto();
    catSelect();
    addrSelect();
    discount();
    addImg();
    submitAct();
});
function o_o_i(src){
    if(status<=0){
        $('.upload-area').css('display','inline-block');
        $('.photo-area').removeClass('over-up');
        $('.photo-area').addClass('init-up');
    }
    else if(status>=4){
        $('.upload-area').css('display','none');
        var $elem=$('.clone-target div').clone(true);
        $elem.children('img').attr('src',src);
        $('.upload-area').before($elem);
    }
    else{
        $('.upload-area').css('display','inline-block');
        $('.photo-area').removeClass('init-up');
        $('.photo-area').addClass('over-up');
        var $elem=$('.clone-target>div').clone(true);
        $elem.children('img').attr('src',src);
        $('.upload-area').before($elem);
    }
}
$(function(){
      $('#upload').uploadify({
        height        : 160,
        swf           : 'static/js/uploadify/uploadify.swf',
        uploader      : 'static/js/uploadify/uploadify.php',
        width         : 160,
        multi         : false,
        fileObjName   : 'image',
        fileTypeDesc  : 'Image Files',
        fileTypeExts  : '*.gif;*.png;*.jpeg;*.jpg;*.bmp',
        fileSizeLimit : '5MB',
        successTimeout: 10,
        onUploadSuccess : function(file, data, response) {
            status++;
            o_o_i(data);
        }
    });
})

function processSetUp(elem) {
    var bar = document.createElement('div');
    bar.className = 'processbar';
    elem.appendChild(bar);
    
    return function (x) {
        bar.style.width = x.toFixed(3)*100 + '%';
    }
}

/* 传入要显示进度条的图片块的节点（html中class为photo的那个元素）进行初始化
** 例如：var elem = document.getElementById('thephoto');
** var processNode = processSetUp(elem);
** 然后调用processNode(x)函数，传入你的值作为参数即可。
*/