$.fn.selectDay=function(option){

var mystyle={
	'before':100,
	'after':0,
};
var setting=$.extend({},mystyle,option);

return this.each(function(){

this.setHtml=function(){
  var str='<select class="form-control" style="width:7rem;display:inline-block;"></select>年';
  str+='<select class="form-control" style="width:7rem;display:inline-block;"></select>月';
  str+='<select class="form-control" style="width:7rem;display:inline-block;"></select>日';
  $(this).html(str);
}
this.setHtml();


this.getYear=function(){
      var d=new Date();
      var y=d.getFullYear();
      var ymax=y+setting.after;
      var ymin=y-setting.before;
      var yhtml="";
      for(var i=ymax;i>=ymin;i--){
        yhtml+="<option>"+i+"</option>";
      }
      $(this).children("select").eq(0).html(yhtml);
      //this.setDay();
  }
this.getYear();

this.getMonth=function(){
    var mhtml="";
    for(var i=1;i<=12;i++){
      mhtml+="<option>"+i+"</option>";
    }
    $(this).children("select").eq(1).html(mhtml); 
   // setDay();
}
this.getMonth();

function isLeap(y){
  if(y%400==0){return true;}
  else if(y%100!=0&&y%4==0){return true;}
  else{return false;}
}      

function countDay(y,m){
 var isrun=isLeap(y);
 if(m%2==1){var len=31}
 else if(m%2==0&&m!=2){var len=30;}
 else if(m==2&&!isrun){var len=28;}
 else{var len=29;}
 var dhtml="";
 for(var i=1;i<=len;i++){
  dhtml+="<option>"+i+"</option>";
 }
 return dhtml;
} 

//设置默认值
$(this).children("select").eq(2).html(countDay($(this).children("select").eq(0).val(),$(this).children("select").eq(1).val()));
$(this).children("select").eq(0).val(new Date().getFullYear());
$(this).children("select").eq(1).val(new Date().getMonth()+1);
$(this).children("select").eq(2).val(new Date().getDate());

//为年和月添加change事件
this.setDay=function(){
$(this).children("select").eq(0).off().on('change',function(){
 var y=$(this).val();
 var m=$(this).next().val();
 $(this).next().next().html(countDay(y,m));
});
$(this).children("select").eq(1).off().on('change',function(){
var y=$(this).prev().val();
 var m=$(this).val();
 $(this).next().html(countDay(y,m));
}); 
}
this.setDay();

})//eachFn
}