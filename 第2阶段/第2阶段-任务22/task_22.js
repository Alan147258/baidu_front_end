/*
* Create by Alan.  2017.12.27
* 模拟二叉树遍历
* **/
var interval;
var array = new Array();//存放遍历结点的数组
/*前序遍历*/
function preOrderTraversal(current){
    if(current == null){
        return;
    }
    array.push(current);
    for(var i=0;i<current.children.length;i++){
       preOrderTraversal(current.children[i]);
    }
}
/*中序遍历*/
function middleOrderTraversal(current){
    if(current == null){
        return;
    }
    middleOrderTraversal(current.children[0]);
    array.push(current);
    middleOrderTraversal(current.children[1]);
}
/*后序遍历*/
function postOrderTraversal(current){
    if(current == null){
        return;
    }
    postOrderTraversal(current.children[0]);
    postOrderTraversal(current.children[1]);
    array.push(current);
}
/*动态背景颜色显示遍历过程*/
function showColor(array){
    var j = 0;
    interval = setInterval(function(){
        if(j < array.length){
            array[j].style.backgroundColor = "#00cc66";
            for(var n=0;n<array.length;n++){
                if( j!=n ){
                    array[n].style.backgroundColor = "#fff";
                }
            }
        }
        j++;
        //console.log(j);
        if(j >= array.length ){
            clearInterval(interval);
            //console.log("OK:"+array.length);
            initColor(array);
            //return;
        }
    },500);
}
/*将所有颜色变回白色*/
function initColor(array){
    for(var j=0;j<array.length;j++){
        array[j].style.backgroundColor = "#fff";
    }
}
/*页面加载完成后运行此函数*/
window.onload = function(){
    var preOrder = document.getElementById("preOrder");
    var middleOrder = document.getElementById("middleOrder");
    var postOrder = document.getElementById("postOrder");
    var parent = document.getElementById("parent");
    //前序按钮点击事件
    preOrder.onclick = function(){
        clearInterval(interval);
        array.splice(0,array.length);//清空数组
        preOrderTraversal(parent);
        showColor(array);
    };
    //中序按钮点击事件
    middleOrder.onclick = function(){
        clearInterval(interval);
        array.splice(0,array.length);//清空数组
        middleOrderTraversal(parent);
        showColor(array);
    };
    //后序按钮点击事件
    postOrder.onclick = function(){
        clearInterval(interval);
        array.splice(0,array.length);//清空数组
        postOrderTraversal(parent);
        showColor(array);
    };
};