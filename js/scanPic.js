$.fn.scanPic=function(option){

var mystyle={
	'zindex':1000,
};
var setting=$.extend({},mystyle,option);

return this.each(function(){
var _this=this;
this.imgs=[];
$(this).find("img").each(function(){
  	_this.imgs.push($(this).attr('src'));
  })

this.num={
	  h:$(window).height(),
    w:$(window).width(),
};

this.setHtml=function(){
  var str="<div class='scanpic'><div class='back'></div>";
  str+="<div class='showpic'><span class='prev'>&lt;</span><img src=''/><span class='next'>&gt;</span></div>";
  str+="<div class='msg'></div></div>";
  $(this).after(str);
}

this.setStyle=function(){
  $(".scanpic>.back").css({
    width:this.num.w,
    height:this.num.h,
    background:"#999",
    opacity:'0.5',
    position:'fixed',
    left:0,
    top:0,
    'z-index':setting.zindex,
  });
  $(".scanpic>.showpic").css({
     position:'fixed',
    'z-index':setting.zindex+100,
    left:this.num.w*0.26,
    top:'5rem',
  });
  $(".scanpic>.showpic>img").css({
  	 "height":$(window).height()-120,
  })
  $(".scanpic>.showpic>.prev").css({
     "font-size":"10rem",
     'margin-right':"1rem",
     'color':'white',
  });
  $(".scanpic>.showpic>.next").css({
     "font-size":"10rem",
     'margin-left':"1rem",
     'color':'white',
  });
  $(".scanpic>.msg").css({
    position:'fixed',
    top:"5rem",
    left:this.num.w*0.26+80,
    color:'#eee',
    background:'#999',
    "z-index":setting.zindex+100,
    padding:"0.2rem 0.5rem",
  });
}


//添加事件
$(this).find("img").on('click',function(){
 	_this.setHtml();
	_this.setStyle();
 	var url=$(this).attr('src');
 	$(".scanpic>.showpic>img").attr('src',url);
 	_this.select();
 })

this.select=function(){
  var now=$('.scanpic>.showpic>img').attr("src");
  _this.nowindex=_this.getindex(_this.imgs,now);
  $(".scanpic>.msg").text((_this.nowindex+1)+"/"+_this.imgs.length);

$(".scanpic>.showpic>.prev").off().on('click',_this.prev);	
$(".scanpic>.showpic>.next").off().on('click',_this.next);	
$('.scanpic>.back').off().on('click',function(){
 	$(".scanpic").hide();
 })
$('body').off().on("keydown",function(e){
	var key=e.keyCode;
	if(key==37){_this.prev();}else if(key==39){_this.next();}
})
}

this.getindex=function(arr,value){
	for(var i=0,len=arr.length;i<len;++i){
		if(arr[i]==value){
			return i;
		}
	}
}

this.prev=function(){
	var url=_this.imgs[_this.nowindex-1];
    if(_this.nowindex>0){
    $(".scanpic>.msg").text((_this.nowindex)+"/"+_this.imgs.length).show();
    	_this.nowindex--;
    }else{$('.scanpic>.msg').text("已是第一张").show();return;}
	$(".scanpic>.showpic>img").attr('src',url);
}

this.next=function(){
	var url=_this.imgs[_this.nowindex+1];
    if(_this.nowindex<_this.imgs.length-1){
       $(".scanpic>.msg").text((_this.nowindex+2)+"/"+_this.imgs.length).show();
    	_this.nowindex++;}else{
    	$('.scanpic>.msg').text("已是最后一张").show();return;
    }
	$(".scanpic>.showpic>img").attr('src',url);
}
})//return
}