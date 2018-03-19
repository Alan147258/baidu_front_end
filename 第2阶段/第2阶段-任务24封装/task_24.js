/*
* Create by Alan.  2017.12.27
* 模拟树的添加和删除
* **/
function Tree(){
    this.interval = "";
    this.array = new Array();
    this.searchResult = new Array();
}
Tree.prototype.preOrderTraversal = function(current){
    if(current == null){
        return;
    }
    if(current.tagName == "DIV"){
        this.array.push(current);
        for(var i=0;i<current.children.length;i++){
            this.preOrderTraversal(current.children[i]);
        }
    }
};
Tree.prototype.preOrderTraversalSearch = function(current,string){
    if(current == null){
        return;
    }
    if(current.tagName == "DIV"){
        this.array.push(current);
        //console.log(string);
        if(current.children[0].innerText == string){
            //array[array.length-1].searchResult = true;
            this.searchResult.push(true);
        }else{
            this.searchResult.push(false);
        }
        for(var i=0;i<current.children.length;i++){
            this.preOrderTraversalSearch(current.children[i],string);
        }
    }
};
Tree.prototype.showColor = function(){
    var j = 0;
    var that = this;
    this.interval = setInterval(function(){
        if(j < that.array.length){
            that.array[j].style.backgroundColor = "#00cc66";
            for(var n=0;n<that.array.length;n++){
                if( j!=n ){
                    that.array[n].style.backgroundColor = "#fff";
                }
            }
        }
        j++;
        if(j > that.array.length ){
            clearInterval(that.interval);
            that.initColor(that.array);
        }
    },500);
};
Tree.prototype.showColor1 = function(){
    var j = 0,searchFlag = false;
    var that = this;
    this.interval = setInterval(function(){
        if(j < that.array.length){
            if(!that.searchResult[j]){
                that.array[j].style.backgroundColor = "#00cc66";
            }else{
                // alert(array[j].searchResult);
                searchFlag = true;
                that.array[j].style.backgroundColor = "red";
            }
            for(var n=0;n<that.array.length;n++) {
                if(j!=n &&  !that.searchResult[n]){
                    that.array[n].style.backgroundColor = "#fff";
                }
            }
        }
        j++;
        if(j > that.array.length ){
            clearInterval(that.interval);
            //console.log("OK:"+that.array.length);
            if(!that.searchResult[that.array.length-1]){
                that.array[that.array.length-1].style.backgroundColor = "#fff";
            }
            if(!searchFlag){
                alert("未搜索到！");
            }
        }
    },500);
};
Tree.prototype.initColor = function(){
    for(var n=0;n<this.array.length;n++){
        this.array[n].style.backgroundColor = "#fff";
    }
};
Tree.prototype.initAddClickEvent = function(){
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
};
Tree.prototype.deleteNodes = function(){
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
};
Tree.prototype.addNodes = function(){
    var node = document.getElementById("page");
    var divs = node.getElementsByTagName("div");
    var addButton =  document.getElementById('addButton');
    addButton.onclick = function(){
        var add = document.getElementById('add');
        var addString = add.value.trim();
        //console.log(add.length);
        if(addString.length <= 0){
            add.style.border = "1px solid red";
        }
        else{
            add.style.border = "1px solid black";
            for(var n=0;n< divs.length;n++){
                if(divs[n].chooseFlag == true){
                    divs[n].chooseFlag = false;
                    if(confirm("确认添加？")){
                        var newNode = document.createElement("div");
                        newNode.innerHTML = "<p>"+addString+"</p>";
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
        }

    };
};
/*页面加载完成后运行此函数*/
window.onload = function(){
    var preOrder = document.getElementById("preOrder");
    var search = document.getElementById("search");
    var parent = document.getElementById("parent");
    var tree = new Tree();
    tree.initAddClickEvent();
    tree.addNodes();
    tree.deleteNodes();
    preOrder.onclick = function(){
        tree.initColor();
        clearInterval(tree.interval);
        tree.array.splice(0,tree.array.length);//清空数组
        tree.preOrderTraversal(parent);
        tree.showColor();
    };
    search.onclick = function(){
        tree.initColor();
        clearInterval(tree.interval);
        tree.array.splice(0,tree.array.length);//清空数组
        tree.searchResult.splice(0,tree.searchResult.length);//清空数组
        var input = document.getElementById("input");
        var inputString =input.value.trim();

        if(inputString.length >0){
            input.style.border = "1px solid black";
            tree.preOrderTraversalSearch(parent,inputString);
            tree.showColor1();
        }
        else{
            input.style.border = "1px solid red";
        }
    };
};