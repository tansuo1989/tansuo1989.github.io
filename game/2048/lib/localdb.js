//通过localStorage实现类似数据库的操作

var db={};
db.local_set=function(key,value){
    var len=JSON.stringify(value).length;
    this.set_size(len);
    return localStorage.setItem(key,JSON.stringify(value));
}
db.local_get=function(key){
   return JSON.parse(localStorage.getItem(key));
}
db.maxid=function(table){
    var max=this.local_get(table+"_maxid");
    return max?max:0;
}

db.show_tables=function(){
    var tables=this.local_get("db_tables");
    if(!tables){return false;}
    var re=[];
    for(var i in tables){
      re.push(i);
    }
    return re;
}

db.key=function(table,id){
   return "db_"+table+"_id_"+id;
}

db.insert=function(table,data){
    data.id=this.maxid(table)+1;
    var key=this.key(table,data.id);
    this.local_set(key,data);
    this.local_set(table+"_maxid",data.id);
    var tables=this.local_get("db_tables");
    if(!tables){var tables={};}
    if(!tables[table]){
      tables[table]=1;
      this.local_set("db_tables",tables);
    }
    return data.id;
}

db.find=function(table,id){
    var key=this.key(table,id);
    return this.local_get(key);
}

db.select=function(table,limit){
	var maxid=this.maxid(table);
	var re=[];
	var len=limit?limit:maxid;
	var min=maxid-len>0?maxid-len:0;
	for(var i=maxid;i>min;i--){
        var key=this.key(table,i);
        re.push(this.local_get(key));
	}
	return re;
}

db.max=function(table,field){
    var max=0;
    var maxid=this.maxid(table);
    for(var i=1;i<=maxid;i++){
        var key=this.key(table,i);
        var item=this.local_get(key);
        if(item[field]>max){max=item[field];}
    }
    return max;
}

db.update=function(table,id,data){
	var key=this.key(table,id);
	this.local_set(key,data);
}

db.delete=function(table,id){
	this.update(table, id, "");
}

db.get_size=function(){
    var size=localStorage.getItem("db_size");
    return size?size:0;
}

db.set_size=function(len){
    var size=parseInt(this.get_size())+len;
    localStorage.setItem("db_size",size);
}

