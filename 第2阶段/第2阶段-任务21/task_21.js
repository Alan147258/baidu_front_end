function TagHobby() {
    this.tag_queue = new Array();
}
TagHobby.prototype = {
    constructor : TagHobby,
    showToArray : function(show){
        show.innerHTML = "";
        var tag_queue_temp = this.tag_queue;
        var that = this;//保存对象
        for(var i = 0; i< tag_queue_temp.length; i++){
            var div_node = document.createElement('div');
            div_node.setAttribute("class","tag_queue_style");
            div_node.innerHTML = tag_queue_temp[i];
            div_node.index = i;
            div_node.onclick = function(){
                if(confirm("delete : "+ tag_queue_temp[this.index] + "?")){
                    tag_queue_temp.splice(this.index,1);
                    that.showToArray(show);
                }
            };
            div_node.onmouseover = function(){
                this.innerHTML = "删除"+ this.innerHTML;
            };
            div_node.onmouseout = function(){
                this.innerHTML = this.innerHTML.slice(2);
            };
            show.appendChild(div_node);
        }
    },
    leftIn : function(node,show){
        var tag_queue = this.tag_queue;
        var string = node.value;
        var string1 = string.split(/ |,|，|、|\n/);
        for(var i = 0;i<string1.length;i++){
            if(string1[i].length!=0){
                tag_queue.unshift(string1[i]);
            }
        }
        tag_queue = this.duplicateRemoval(tag_queue);
        while(tag_queue.length>10){
            tag_queue.pop();
        }
        this.showToArray(show);
    },
    leftOut : function(show){
        var tag_queue = this.tag_queue;
        if(tag_queue.length == 0){
            alert("已空");
        }
        else{
            if(confirm("delete:"+tag_queue[0] + "?")){
                tag_queue.shift();
                that.showToArray(show);
            }
        }
    },
    rightIn : function(node,show){
        var tag_queue = this.tag_queue;
        var string = node.value;
        var string1 = string.split(/ |,|，|、|\n/);
        for(var i = 0;i<string1.length;i++){
            if(string1[i].length!=0){
                tag_queue.unshift(string1[i]);
            }
        }
        tag_queue = this.duplicateRemoval(tag_queue);
        while(tag_queue.length>10){
            tag_queue.shift();
        }
        this.showToArray(show);
    },
    rightOut : function(show){
        var tag_queue = this.tag_queue;
        if(tag_queue.length == 0){
            alert("已空");
        }
        else{
            if(confirm("delete:"+tag_queue[tag_queue.length-1] + "?")){
                tag_queue.pop();
                that.showToArray(show);
            }
        }
    },
    clear : function(show){
        this.tag_queue.length = 0;
        this.showToArray(show);
    },
   duplicateRemoval: function(array){
       for(var n = 0;n<array.length;n++){
           for(var m=0;m<n;m++){
               if(array[n] == array[m]){
                   array.splice(n--,1);
               }
           }
       }
       return array;
  }
};
function init(){
    var left_in = document.getElementById('left_in');
    var left_out = document.getElementById('left_out');
    var right_in = document.getElementById('right_in');
    var right_out = document.getElementById('right_out');
    var hobby_in = document.getElementById('hobby_in');
    var tag_queue = document.getElementById('tag_queue');
    var tag_input  = document.getElementById('tag_input');
    var tag_clear  = document.getElementById('tag_clear');

    var tag = new TagHobby();
    left_in.onclick = function(){
        tag.leftIn(tag_input,tag_queue);
    };
    left_out.onclick = function(){
        tag.leftOut(tag_queue);
    };
    right_in.onclick = function(){
        tag.rightIn(tag_input,tag_queue);
    };
    right_out.onclick = function(){
        tag.rightOut(tag_queue);
    };
    tag_clear.onclick = function(){
        tag.clear(tag_queue);
    };
    var hobby_queue = document.getElementById('hobby_queue');
    var hobby_right_in = document.getElementById('hobby_right_in');
    var hobby_clear = document.getElementById('hobby_clear');
    var hobby_text = document.getElementById('hobby_text');
    var hobby = new TagHobby();
    hobby_right_in.onclick = function(){
        hobby.rightIn(hobby_text,hobby_queue);
    };
    hobby_clear.onclick = function(){
        hobby.clear(hobby_queue);
    };
}
init();