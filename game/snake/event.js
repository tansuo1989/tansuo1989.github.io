window.onkeydown=function(e){
    if(e.keyCode==37){
        controller.left();
    }else if(e.keyCode==38){
        controller.up();
    }else if(e.keyCode==39){
        controller.right();
    }else if(e.keyCode==40){
        controller.down();
    }
}

!function(){
    var down={};
    var up={};
    var min=30;
    var event_type="";
    $("body").on("touchstart",function(e){
        var edata=e.originalEvent.changedTouches[0];
        down={x:edata.clientX,y:edata.clientY};
    })
    
    $("body").on("touchend",function(e){
        var edata=e.originalEvent.changedTouches[0];
        up={x:edata.clientX,y:edata.clientY};
        var x=up.x-down.x;
        var y=up.y-down.y;
        var x_count=Math.abs(x);
        var y_count=Math.abs(y);
        if(x_count<=min&&y_count<=min){return;}
        if(x_count>=y_count){
            event_type=x>0?"right":"left";
        }else{
            event_type=y>0?"down":"up";
        }
        controller[event_type]();
        haddo=true;
    })
}();
