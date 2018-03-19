/*
* Create by Alan.  2017.12.27
* 模拟的树遍历和搜索
* **/
var interval;
var array = new Array();//存放遍历结点的数组
/*前序遍历*/
function preOrderTraversal(current){
    if(current == null){
        return;
    }
    if(current.tagName == "DIV"){
        array.push(current);
        for(var i=0;i<current.children.length;i++){
                preOrderTraversal(current.children[i]);
        }
    }
}
/*前序遍历搜索*/
function preOrderTraversalSearch(current,string){
    if(current == null){
        return;
    }
    if(current.tagName == "DIV"){
        array.push(current);
        //console.log(string);
        if(current.children[0].innerText == string){
            array[array.length-1].searchResult = true;
        }
            for(var i=0;i<current.children.length;i++){
                preOrderTraversalSearch(current.children[i],string);
            }
    }
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
        if(j > array.length ){
            clearInterval(interval);
            //console.log("OK:"+array.length);
            initColor(array);
            //return;
        }
    },500);
}
/*动态背景颜色显示遍历过程*/
function showColor1(array){
    var j = 0,searchFlag = false;
    interval = setInterval(function(){
        if(j < array.length){
            if(!array[j].searchResult){
                array[j].style.backgroundColor = "#00cc66";
            }else{
               // alert(array[j].searchResult);
                searchFlag = true;
                array[j].style.backgroundColor = "red";
            }
            for(var n=0;n<array.length;n++) {
                if(j!=n &&  !array[n].searchResult){
                    array[n].style.backgroundColor = "#fff";
                }
            }
        }
        j++;
        //console.log(j);
        if(j > array.length ){
            clearInterval(interval);
            //console.log("OK:"+array.length);
            array[array.length-1].style.backgroundColor = "#fff";
            if(!searchFlag){
                alert("未搜索到！");
            }
            //return;
        }
    },500);
}
/*将所有颜色变回白色*/
function initColor(array){
    for(var n=0;n<array.length;n++) {
        array[n].style.backgroundColor = "#fff";
    }
}
/*页面加载完成后运行此函数*/
window.onload = function(){
    var preOrder = document.getElementById("preOrder");
    var search = document.getElementById("search");
    var parent = document.getElementById("parent");
    //前序按钮点击事件
    preOrder.onclick = function(){
        initColor(array);
        clearInterval(interval);
        array.splice(0,array.length);//清空数组
        preOrderTraversal(parent);
        showColor(array);
    };
    //后序按钮点击事件
    search.onclick = function(){
        initColor(array);
        clearInterval(interval);
        array.splice(0,array.length);//清空数组
        var inputString = document.getElementById("input").value;
        preOrderTraversalSearch(parent,inputString);
        showColor1(array);
    };
};