
/*
生成日历的字符串，一个月
参数time,格式:可供new Date()使用的时间格式，比如：2016-08
返回：一个月的表格格式的字符串
*/
function get_calendar(time){
   var d=time?new Date(time):new Date();
   var y=d.getFullYear();
   var m=d.getMonth()+1;
   m=m<10?"0"+m:m;
   var fd=new Date(y+"-"+m+"-01").getDay();//一号的星期数0-6
   var ld=new Date(y,m,0).getDate();//一个月的天数
   //console.log(fd,ld);
   var len=fd?fd-1:6;//第一行空缺的天数
   var lenstr="";
   var lastempty=(len+ld)%7?7-(len+ld)%7:0;
   var laststr="";
//最后的填充   
//6行的情况
if(len+ld>35){
    for(var i=1;i<lastempty+1;i++){laststr+="<td class='gray'>"+i+"</td>";}
   }
 //5行的情况
else if(len+ld>28&&len+ld<36){
     for(var i=1;i<lastempty+8;i++){
      if(i==lastempty+1){
         laststr+="</tr><tr class='calendar_tr'><td class='gray'>"+i+"</td>";
      }else{
         laststr+="<td class='gray'>"+i+"</td>";
      }
     }
   }
//开始的填充
 if(m=='01'){var lastday=31;}else{
   var lastday=new Date(y,m-1,0).getDate();
 }
if(len>0){
   for(var i=lastday-len+1;i<lastday+1;i++){lenstr+="<td class='gray'>"+i+"</td>";}
}
//特殊情况，2月共28天，且1号为星期一,即共4行的情况
if(len==0&&ld==28){
      lenstr+="<tr class='calendar_tr'>";
   for(var i=25;i<32;i++){
      lenstr+="<td class='gray'>"+i+"</td>";
   }
     lenstr+="</tr>";

    laststr="<tr class='calendar_tr'>";
   for(var i=1;i<8;i++){
      laststr+="<td class='gray'>"+i+"</td>";
   }   
   laststr+="</tr>";
}

  var str="<table class='table table-bordered'>\
           <tr>\
             <td colspan='7' style='text-align:center;'>"+y+"年"+m+"月"+"</td>\
           </tr>\
           <tr>\
              <td>一</td>\
              <td>二</td>\
              <td>三</td>\
              <td>四</td>\
              <td>五</td>\
              <td>六</td>\
              <td>日</td>\
           </tr>\
           <tr class='calendar_tr'>"+lenstr;

  for(var i=1;i<ld+1;i++){
     var tem=i>9?i:"0"+i;
    if((i+len-1)%7==0){
      str+="</tr><tr class='calendar_tr'><td class='d"+y+"-"+m+"-"+tem+"'>"+i+"</td>";
    }else{
      str+="<td class='d"+y+"-"+m+"-"+tem+"'>"+i+"</td>";
    }
  }
  str+=laststr+"</tr></table>";
  return str;
}