/**
 * Created by Alan on 2017/12/19.
 */
var queue = new Array();
function showToArray(){
    var node = document.getElementById('queue');
    node.innerHTML = "";
    for(var i = 0; i<queue.length; i++){
        var div_node = document.createElement('div');
        div_node.setAttribute("class","queue_style");
        div_node.innerHTML = queue[i];
        //div_node.setAttribute("onmouseover","massage(this,"+i+")");
        //div_node.setAttribute("onmouseout","dele(this)");
        div_node.index = i;
        div_node.onclick = function(){alert("delete : "+ queue[this.index]);queue.splice(this.index,1);showToArray();};
        node.appendChild(div_node);
    }
}
function leftIn(){
    var node = document.getElementById('string');
    if(queue.length>=60){
        alert("Queue overflow!");
    }
    var string = node.value;
    var str = string.split(" ");
    var str1 = new Array();
    var str2 = new Array();
    var str3 = new Array();
    var str4 = new Array();
    for(var n1=0;n1<str.length;n1++) {
        var temp_array1 = str[n1].split(",");
        for (var m1 = 0; m1 < temp_array1.length; m1++) {
            str1.push(temp_array1[m1]);
        }
    }
    for(var n2=0;n2<str1.length;n2++) {
        var temp_array2 = str1[n2].split("、");
        for (var m2 = 0; m2 < temp_array2.length; m2++) {
            str2.push(temp_array2[m2]);
        }
    }
    for(var n3=0;n3<str2.length;n3++) {
        var temp_array3 = str2[n3].split("，");
        for (var m3 = 0; m3 < temp_array3.length; m3++) {
            str3.push(temp_array3[m3]);
        }
    }
    for(var n4=0;n4<str3.length;n4++) {
        var temp_array4 = str3[n4].split("\n");
        for (var m4 = 0; m4 < temp_array4.length; m4++) {
            str4.push(temp_array4[m4]);
        }
    }

   // var str2 = string.split("、");
    for(var i=0;i<str4.length;i++){
        queue.unshift(str4[i]);
    }
    showToArray();
   // console.log(queue);
}
function leftOut(){
    alert("delete:"+queue[0]);
    queue.shift();
    showToArray();
    //console.log(queue);
}
/*从队列右侧插入*/
function rightIn(){
    var node = document.getElementById('string');
    if(queue.length>=60){
        alert("Queue overflow!");
    }
    var string = node.value;
    var str = string.split(" ");
    var str1 = new Array();
    var str2 = new Array();
    var str3 = new Array();
    var str4 = new Array();
    for(var n1=0;n1<str.length;n1++) {
        var temp_array1 = str[n1].split(",");
        for (var m1 = 0; m1 < temp_array1.length; m1++) {
            str1.push(temp_array1[m1]);
        }
    }
    for(var n2=0;n2<str1.length;n2++) {
        var temp_array2 = str1[n2].split("、");
        for (var m2 = 0; m2 < temp_array2.length; m2++) {
            str2.push(temp_array2[m2]);
        }
    }
    for(var n3=0;n3<str2.length;n3++) {
        var temp_array3 = str2[n3].split("，");
        for (var m3 = 0; m3 < temp_array3.length; m3++) {
            str3.push(temp_array3[m3]);
        }
    }
    for(var n4=0;n4<str3.length;n4++) {
        var temp_array4 = str3[n4].split("\n");
        for (var m4 = 0; m4 < temp_array4.length; m4++) {
            str4.push(temp_array4[m4]);
        }
    }

    // var str2 = string.split("、");
    for(var i=0;i<str4.length;i++){
        queue.push(str4[i]);
    }
    showToArray();
   // console.log(queue);
}
function rightOut(){
    alert("delete:"+queue[queue.length-1]);
    queue.pop();
    showToArray();
    //console.log(queue);
}
function search_fun(){
    showToArray();
    var search = document.getElementById('text');
    search_string = search.value.trim();
    var div_node = document.getElementsByClassName('queue_style');
    for(var i=0;i<queue.length;i++){
        if( queue[i].indexOf(search_string) >= 0){
            div_node[i].innerHTML =  div_node[i].innerHTML.split(search_string).join('<span class=keyword>'+search_string+'</span>');
           // div_node[i].innerHTML.replace("Benjamin","<span class=keyword>1111</span>");
            console.log(div_node[i].innerHTML);
        }
    }
    //console.log(string.value);
}
function init(){
    var left_in = document.getElementById('left_in');
    var left_out = document.getElementById('left_out');
    var right_in = document.getElementById('right_in');
    var right_out = document.getElementById('right_out');
    var search = document.getElementById('search');
    left_in.onclick = function(){leftIn();};
    left_out.onclick = function(){leftOut();};
    right_in.onclick = function(){rightIn();};
    right_out.onclick = function(){rightOut();};
    search.onclick = function(){search_fun();};

}
init();