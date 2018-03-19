/**
 * Created by Alan on 2017/12/19.
 */
var queue = new Array();
function massage(node,i){
    //console.log(node);
    var p_node = document.createElement('p');
    p_node.setAttribute("class","p");
    var height = node.style.height;
    p_node.innerHTML = (i+1)+"<br>"+Number(height.slice(0,height.length-2))/2;
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
        //div_node.innerHTML = queue[i];
        div_node.setAttribute("onmouseover","massage(this,"+i+")");
        div_node.setAttribute("onmouseout","dele(this)");
        div_node.style.height = 2*queue[i]+"px";
        div_node.style.left += i*15+"px";
        div_node.index = i;
        div_node.onclick = function(){alert("delete : "+ queue[this.index]);queue.splice(this.index,1);showToArray();};
        node.appendChild(div_node);
    }
}
function leftIn(){
    var left_in = document.getElementById('number');
    var left_in_value = left_in.value.trim();
    if(queue.length>=60){
        alert("Queue overflow!");
    }
    if((/^(0|[1-9][0-9]*)$/.test(left_in_value))&&left_in_value>=10&&left_in_value<=100){
        left_in.style.boxShadow = "0 0 0 ";
        left_in.style.border = "1.5px solid green";
        var number = Number(left_in_value);
        queue.unshift(number);
        showToArray();
        console.log(queue);
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
/*从队列右侧插入*/
function rightIn(){
    var right_in = document.getElementById('number');
    var right_in_value = right_in.value.trim();
    if(queue.length>=60){
        alert("Queue overflow!");
    }
    if((/^(0|[1-9][0-9]*)$/.test(right_in_value))&&right_in_value>=10&&right_in_value<=100){
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
function upset_generation(){
    for(var i=0;i<queue.length*2;i++){
        var random1 = Math.round(Math.random()*(queue.length-1));
        var random2 = Math.round(Math.random()*(queue.length-1));
        var temp = queue[random1];
        queue[random1] = queue[random2];
        queue[random2] = temp;
    }
    showToArray();
}
function random_generation(){
    queue.splice(0,queue.length-1);
    for(var i=0;i<50;i++){
        queue[i] = Math.round(Math.random()*90)+10;
    }
    showToArray();
}
function showChange(a,b){
    var div_node = document.getElementsByClassName('queue_style');
    for(var i=0;i<queue.length;i++){
        if(i==b){
            div_node[a].style.backgroundColor = "#c1fb08";
            div_node[b].style.backgroundColor = "#ce4500";
            // delay(50000);
            // console.log(a+" "+b);

            var temp = div_node[a].style.height;
            div_node[a].style.height = div_node[b].style.height;
            div_node[b].style.height = temp;

        }
        else{
            div_node[i].style.backgroundColor = "#27aae2";
        }
    }
    //showToArray();

}

/*function bubbleSort(){
    //for(var i=0;i<queue.length;i++)
    var i=0;
   var timer =  setInterval(function(){
        var temp = 0,index = i;
        if(i>=queue.length){
            showToArray();
            clearInterval(timer);
        }
        for(var j=i+1;j<queue.length;j++){
            if(queue[i]>queue[j]){
                temp = queue[i];
                index = j;
              // alert(i+" "+queue[i] +" -"+index+" " +queue[index]);
                showChange(i,index);
                queue[i] = queue[j];
                queue[j] = temp;
            }
        }


       i++;
    },400);
}*/
function bubbleSort(){
    //for(var i=0;i<queue.length;i++)
    var i=0;
    var timer =  setInterval(function(){
        var temp = 1000,index = i;
        if(i>=queue.length){
            showToArray();
            clearInterval(timer);

        }
        for(var j=i+1;j<queue.length;j++){
            if(temp>queue[j]){
                temp = queue[j];
                index = j;
                /*// alert(i+" "+queue[i] +" -"+index+" " +queue[index]);
                showChange(i,index);
                queue[i] = queue[j];
                queue[j] = temp;*/
            }
        }
        if(queue[i]>temp){
            //alert(queue[i]+" " +queue[index]+" "+temp);
            queue[index] =queue[i];
            queue[i] =temp;
            showChange(i,index);
        }
        else{showChange(i,i);}
        i++;
    },100);
}
function init(){
    var left_in = document.getElementById('left_in');
    var left_out = document.getElementById('left_out');
    var right_in = document.getElementById('right_in');
    var right_out = document.getElementById('right_out');
    var upset = document.getElementById('upset');
    var random = document.getElementById('random');
    var bubble_sort = document.getElementById('bubble_sort');
    left_in.onclick = function(){leftIn();};
    left_out.onclick = function(){leftOut();};
    right_in.onclick = function(){rightIn();};
    right_out.onclick = function(){rightOut();};
    upset.onclick = function(){upset_generation();};
    random.onclick = function(){random_generation();};
    bubble_sort.onclick = function(){bubbleSort(); };

}
init();