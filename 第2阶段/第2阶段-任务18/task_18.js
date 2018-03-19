/**
 * Created by Alan on 2017/12/19.
 */
var queue = new Array();
function massage(node,i){
    //console.log(node);
    var p_node = document.createElement('p');
    p_node.setAttribute("class","p");
    p_node.innerHTML = i+1;
    node.appendChild(p_node);
}
function dele(node){
    //console.log(node);
    var p = node.getElementsByTagName('p');
    node.removeChild(p[0]);
}
function showToArray(){
    var node = document.getElementById('queue');
    node.innerHTML = "";
    for(var i = 0; i<queue.length; i++){
        var div_node = document.createElement('div');
        div_node.setAttribute("class","queue_style");
        div_node.innerHTML = queue[i];
        div_node.setAttribute("onmouseover","massage(this,"+i+")");
        div_node.setAttribute("onmouseout","dele(this)");
        div_node.index = i;
        div_node.onclick = function(){alert("delete : "+ queue[this.index]);queue.splice(this.index,1);showToArray();};
        node.appendChild(div_node);
    }
}
function leftIn(){
    var left_in = document.getElementById('number');
    var left_in_value = left_in.value.trim();
    if((/^(0|[1-9][0-9]*)$/.test(left_in_value))){
        left_in.style.boxShadow = "0 0 0 ";
        left_in.style.border = "1.5px solid green";
        var number = Number(left_in_value);
        queue.unshift(number);
        showToArray();
        //console.log(queue);
    }
    else {
        left_in.style.boxShadow = "0 0 2px red";
        left_in.style.border = "1.4px solid #f00101";
    }
}
function leftOut(){
    alert("delete:"+queue[0]);
    queue.shift();
    showToArray();
    //console.log(queue);
}
function rightIn(){
    var right_in = document.getElementById('number');
    var right_in_value = right_in.value.trim();
    if((/^(0|[1-9][0-9]*)$/.test(right_in_value))){
        right_in.style.boxShadow = "0 0 0 ";
        right_in.style.border = "1.5px solid green";
        var number = Number(right_in_value);
        queue.push(number);
        showToArray();
        //console.log(queue);
    }
    else {
        right_in.style.boxShadow = "0 0 2px red";
        right_in.style.border = "1.4px solid #f00101";
    }
}
function rightOut(){
    alert("delete:"+queue[queue.length-1]);
    queue.pop();
    showToArray();
    //console.log(queue);
}
function init(){
    var left_in = document.getElementById('left_in');
    var left_out = document.getElementById('left_out');
    var right_in = document.getElementById('right_in');
    var right_out = document.getElementById('right_out');
    left_in.onclick = function(){leftIn();};
    left_out.onclick = function(){leftOut();};
    right_in.onclick = function(){rightIn();};
    right_out.onclick = function(){rightOut();};
}
init();