/*
* Create by Alan.  2017.12.27
* 模拟树的添加和删除
* **/
var interval;
var array = new Array();//存放遍历结点的数组
var searchResult = new Array();
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
            //array[array.length-1].searchResult = true;
            searchResult.push(true);
        }else{
            searchResult.push(false);
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
        if(j > array.length ){
            clearInterval(interval);
            initColor(array);
        }
    },500);
}
/*动态背景颜色显示遍历过程*/
function showColor1(array){
    console.log(searchResult);
    var j = 0,searchFlag = false;
    interval = setInterval(function(){
        if(j < array.length){
            if(!searchResult[j]){
                array[j].style.backgroundColor = "#00cc66";
            }else{
               // alert(array[j].searchResult);
                searchFlag = true;
                array[j].style.backgroundColor = "red";
            }
            for(var n=0;n<array.length;n++) {
                if(j!=n &&  !searchResult[n]){
                    array[n].style.backgroundColor = "#fff";
                }
            }
        }
        j++;
        if(j > array.length &&  !searchResult[array.length-1]){
            clearInterval(interval);
            //console.log("OK:"+array.length);
            array[array.length-1].style.backgroundColor = "#fff";
            if(!searchFlag){
                alert("未搜索到！");
            }
        }
    },500);
}
/*将所有颜色变回白色*/
function initColor(array){
    for(var n=0;n<array.length;n++){
        array[n].style.backgroundColor = "#fff";
    }
}
function initAddClickEvent(){
    var node = document.getElementById("page");
    var divs = node.getElementsByTagName("div");
    var div = document.getElementById("parent");
    div.addEventListener("click",function(e){
       if(e.target.nodeName == "DIV"){
           e.target.style.backgroundColor = "#cacaca";
           for(var n=0;n< divs.length;n++){
               divs[n].chooseFlag = false;
               if(divs[n] != e.target){
                   divs[n].style.backgroundColor = "#fff";
               }
               else{
                   //console.log(divs[n]);
                   e.target.chooseFlag = true;
               }
           }
       }
    },false);
}
function deleteNodes(){
    var node = document.getElementById("page");
    var deleteButton = document.getElementById('delete');
    var divs = node.getElementsByTagName("div");
    deleteButton.onclick = function(){
        for(var n=0;n< divs.length;n++){
            if(divs[n].chooseFlag == true){
                if(confirm("确认删除？")){
                    divs[n].chooseFlag = false;
                    divs[n].parentNode.removeChild(divs[n]);

                }
            }
        }
    };
}
/*未完成*/
function addNodes(){
    var node = document.getElementById("page");
    var divs = node.getElementsByTagName("div");
    var addButton =  document.getElementById('addButton');
    addButton.onclick = function(){
        var add = document.getElementById('add').value;
        //console.log(add.length);
        for(var n=0;n< divs.length;n++){
            if(divs[n].chooseFlag == true && add.length > 0){
                divs[n].chooseFlag = false;
                if(confirm("确认添加？")){
                    var newNode = document.createElement("div");
                    newNode.innerHTML = "<p>"+add+"</p>";
                    if(divs[n].children[1] != null){
                        newNode.setAttribute("class",divs[n].children[1].getAttribute("class"));
                    }
                    else{
                        var parentClass = divs[n].getAttribute("class");
                        var newNodeClass;
                        var parentClassNumber =Number(parentClass.charAt(parentClass.length-1));
                        if(parentClassNumber<=4){
                            newNodeClass = "child_"+(parentClassNumber+1);
                        }
                        else{
                            newNodeClass = "child_5";
                        }
                        newNode.setAttribute("class",newNodeClass);
                    }
                    divs[n].appendChild(newNode);
                }
            }
        }
    };
}

/*页面加载完成后运行此函数*/
window.onload = function(){
    var preOrder = document.getElementById("preOrder");
    var search = document.getElementById("search");
    var parent = document.getElementById("parent");
    initAddClickEvent();
    addNodes();
    deleteNodes();
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
        searchResult.splice(0,searchResult.length);//清空数组
        var inputString = document.getElementById("input").value;
        preOrderTraversalSearch(parent,inputString);
        showColor1(array);
    };
};