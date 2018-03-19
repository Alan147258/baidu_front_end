/*构造函数*/
function Block(){
    this.angle = 0;
    this.direction = "down";
    this.unit = 50;
    this.length =500;
    this.lineNumbers = 0;
    this.movingFlag = false;
    this.moveCount = 0;
}
/*画页面*/
Block.prototype.draw =function() {
    var header_number = document.getElementById('header_number');
    if(header_number.getContext){
        var context = header_number.getContext('2d');
        context.font = "16px Arial";
        context.textAlign = "center";
        context.textBaswLine = "middle";
        for(var i=1;i<11;i++){
            context.fillText(i.toString(),i*50-25,20);
        }
    }
    var left_number = document.getElementById('left_number');
    if(left_number.getContext){
        var context1 = left_number.getContext('2d');
        context1.font = "16px Arial";
        context1.textAlign = "center";
        context1.textBaswLine = "middle";
        for(i=1;i<11;i++){
            context1.fillText(i.toString(),15,i*50-18);
        }
    }
    var grid = document.getElementById('grid');
    if(grid.getContext){
        var context2 = grid.getContext('2d');
        context2.beginPath();
        context2.strokeStyle = "#aaa";
        context2.lineWidth = 0.3;
        for(i=1;i<10;i++){
            context2.moveTo(i*50,0);
            context2.lineTo(i*50,498);
            context2.moveTo(0,i*50);
            context2.lineTo(498,i*50);
        }
        context2.stroke();
    }
};
/*初始化*/
Block.prototype.init =function() {
    var img = document.getElementById('img');
    img.style.top = "50px";
    img.style.left = "50px";
    this.draw();
    var order = document.getElementById('order');
    order.value="TAR BOT 1\nTAR BOT 1\nTAR BOT 1\nTAR BOT 4\n" +
        "TAR RIG 1\nTAR RIG 1\nTAR RIG 1\nTAR RIG 4\n" +
        "TAR TOP 7\nTAR LEF 7";
    var string = order.value;
    for(var i=0;i<string.split("\n").length;i++){
        var p = document.createElement('p');
        p.innerText = (i+1).toString();
        document.getElementById('line_number').appendChild(p);
    }
};
/*改变角度*/
Block.prototype.turn =function() {
    var that = this;
    var img = document.getElementById('img');
    document.getElementById('rig').addEventListener("click",function(){
        that.angle+=90;
        img.style.transform = 'rotate('+that.angle+'deg)';
        img.style.transition = "All 0.2s ease-in-out";
        console.log(that.angle);
        that.rotate();
    },false);
    document.getElementById('lef').addEventListener("click",function(){
        that.angle-=90;
        img.style.transform = 'rotate('+that.angle+'deg)';
        img.style.transition = "All 0.2s ease-in-out";
        console.log(that.angle);
        that.rotate();
    },false);
    document.getElementById('bac').addEventListener("click",function(){
        that.angle+=180;
        img.style.transform = 'rotate('+that.angle+'deg)';
        img.style.transition = "All 0.4s ease-in-out";
        console.log(that.angle);
        that.rotate();
    },false);
};
/*从角度判断当前方向*/
Block.prototype.rotate =function() {
    if(this.angle%360 == 0){
        this.direction = "down";
    }
    else if(this.angle%360 == 180||this.angle%360 == -180){
        this.direction = "up";
    }
    else if(this.angle%360 == 270||this.angle%360 == -90){
        this.direction = "right";
    }
    else if(this.angle%360 == 90||this.angle%360 == -270){
        this.direction = "left";
    }
};
/*按当期的方向移动*//*
Block.prototype.go =function() {
    var that = this;
    var img = document.getElementById('img');
    document.getElementById('go').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        //console.log("top:"+top+"  left:"+img.style.left);
        //console.log(that.direction);

        if(that.direction === "up" && top>0){
            img.style.top = (top - that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "down" && top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "left" && left>0){
            img.style.left = (left - that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "right" && left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
};*/
/*直接移动*/
Block.prototype.move =function() {
    var img = document.getElementById('img');
    var that = this;
    document.getElementById('turn_left').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        if(left>0){
            img.style.left = (left - that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_right').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        if(left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_top').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        if(top>0){
            img.style.top = (top - that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_bottom').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        if(top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            //img.style.transition = "All 0.2s ease-in-out";
            //console.log(img.style.transition);
        }
    },false);
};
/*按一个命令移动*/
Block.prototype.moveOnce =function(x,y,commandsNum) {
    //console.log("arguments[0]:"+x+  "  arguments[1]:"+y);
    var that = this;
    if(x!=0){
        setTimeout(function(){
            var img = document.getElementById('img');
            var left = Number(img.style.left.slice(0,img.style.left.length-2));
            if(x<0){
                img.style.transform = 'rotate(90deg)';
                if(left>=-x*50){
                    img.style.left =left+x*50 +"px";
                }
                if(left<-x*50 && left>0){
                    img.style.left = "0px";
                }
            }
            else if(x>0){
                img.style.transform = 'rotate(270deg)';
                if(left<=that.length-that.unit-x*50){
                    img.style.left = Number(img.style.left.slice(0,img.style.left.length-2))+x*50 +"px";
                }
                if(left>that.length-that.unit-x*50 && left<that.length-that.unit){
                    img.style.left = that.length-that.unit+"px";
                }
            }
            that.moveCount++;
            console.log("count: "+that.moveCount);
            if(that.moveCount>=commandsNum){
                that.movingFlag = false;
                that.moveCount=0;
            }
            console.log(commandsNum+  "  Flag: "+that.movingFlag);
        },100);
    }
    if(y!=0){
        setTimeout(function(){
            var img = document.getElementById('img');
            var top = Number(img.style.top.slice(0,img.style.top.length-2));
            if(y<0){
                img.style.transform = 'rotate(180deg)';
                if(top>=-y*50){
                    img.style.top = top+y*50 +"px";
                }
                if(top<-y*50 && top>0){
                    img.style.top = "0px";
                }
            }
            else if(y>0){
                img.style.transform = 'rotate(0deg)';
                if(top <=that.length-that.unit-y*50){
                    img.style.top = Number(img.style.top.slice(0,img.style.top.length-2))+y*50 +"px";
                }
                if(top >that.length-that.unit-y*50 && top <that.length-that.unit){
                    img.style.top  = that.length-that.unit+"px";
                }
            }
            that.moveCount++;
            console.log("count: "+that.moveCount);
            if(that.moveCount>=commandsNum){
                that.movingFlag = false;
                that.moveCount=0;
            }
            console.log(commandsNum+  "  Flag: "+that.movingFlag);
        },100);
    }
  //  }
   // this.movingFlag = false;
};
/*转向加移动*/
Block.prototype.turnMove =function() {
    var img = document.getElementById('img');
    var that = this;
    document.getElementById('move_left').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        img.style.transform = 'rotate(90deg)';
        that.direction = "left";
        setTimeout(function(){if(left>0){img.style.left = (left - that.unit) +"px";img.style.transition = "All 0.2s ease-in-out";}},500);
        /*if(left>0){
            img.style.left = (left - that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }*/
    },false);
    document.getElementById('move_right').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        img.style.transform = 'rotate(270deg)';
        that.direction = "right";
        setTimeout(function(){if(left<that.length-that.unit){img.style.left = (left + that.unit) +"px";img.style.transition = "All 0.2s ease-in-out";}},500);
        /*if(left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }*/
    },false);
    document.getElementById('move_top').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        img.style.transform = 'rotate(180deg)';
        that.direction = "up";
        setTimeout(function(){if(top>0){img.style.top = (top - that.unit) +"px";img.style.transition = "All 0.2s ease-in-out";}},500);
    },false);
    document.getElementById('move_bottom').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        img.style.transform = 'rotate(0deg)';
        that.direction = "down";
        setTimeout(function(){if(top<that.length-that.unit){img.style.top = (top + that.unit) +"px";img.style.transition = "All 0.2s ease-in-out";}},500);
        /*if(top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }*/
    },false);
};
/*添加行号*/
Block.prototype.showLineIndex = function(){
    var that = this;
    var lineNumber = document.getElementById('line_number');
    var order = document.getElementById('order');
    order.addEventListener("input",function(){
        var string = this.value;
        if(that.lineNumbers != string.split("\n").length){
            that.lineNumbers = string.split("\n").length;
            //console.log(string.split("\n").length);
            lineNumber.innerHTML="";
            for(var i=0;i<that.lineNumbers;i++){
                var p = document.createElement('p');
                p.innerText = (i+1).toString();
                lineNumber.appendChild(p);
            }
        }
    },false);
    order.addEventListener("scroll",function(){
        lineNumber.style.top = -this.scrollTop;
        //console.log(this.scrollTop);
    },false);
};
/*解析命令*/
Block.prototype.parseCommand = function(){
    var that = this;
    var go = document.getElementById('go');
    var order = document.getElementById('order');
    go.addEventListener("click",function(){
        if(!that.movingFlag){
            that.movingFlag=true;
            var commands = order.value.split("\n");
            var lineNumber = document.getElementById('line_number');
            for(var i=0;i<commands.length;i++){
                var number = Number(commands[i].slice(8));
                if(commands[i] == "TAR LEF"){
                    setTimeout(function(){that.moveOnce(-1,0,commands.length)},i*200);//i*200控制每一条命令执行的时间间隔，应该大于等于transition的时间
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else if(commands[i] == "TAR TOP"){
                    setTimeout(function(){that.moveOnce(0,-1,commands.length)},i*200);
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else if(commands[i] == "TAR RIG"){
                    setTimeout(function(){that.moveOnce(1,0,commands.length)},i*200);
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                    //console.log("TAR RIG:"+i);
                }
                else if(commands[i] == "TAR BOT"){
                    setTimeout(function(){that.moveOnce(0,1,commands.length)},i*200);
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                    //console.log("TAR BOT:"+i);
                }
                else if(commands[i].indexOf("TAR LEF ")>-1 && !isNaN(number)){
                    setTimeout(function(n){that.moveOnce(-n,0,commands.length)},i*200,Number(commands[i].slice(8)));
                    //console.log(Number(commands[i].slice(8)));
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else if(commands[i].indexOf("TAR TOP ")>-1 && !isNaN(number)){
                    setTimeout(function(n){that.moveOnce(0,-n,commands.length)},i*200,Number(commands[i].slice(8)));
                    //console.log(Number(commands[i].slice(8)));
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else if(commands[i].indexOf("TAR RIG ")>-1 && !isNaN(number)){
                    setTimeout(function(n){that.moveOnce(n,0,commands.length)},i*200,Number(commands[i].slice(8)));
                    //console.log(Number(commands[i].slice(8)));
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else if(commands[i].indexOf("TAR BOT ")>-1 && !isNaN(number)){
                    setTimeout(function(n){that.moveOnce(0,n,commands.length)},i*200,Number(commands[i].slice(8)));
                    //console.log( typeof Number(commands[i].slice(8)));
                    lineNumber.children[i].style.backgroundColor ="#09102b";
                }
                else{
                    lineNumber.children[i].style.backgroundColor ="red";
                }
            }

        }
       // console.log("top:"+img.style.top+"  left:"+img.style.left);
    },false);

};
window.onload = function(){
    var block = new Block();
    block.init();
    block.showLineIndex();
    block.turn();
    block.move();
    block.turnMove();
    block.parseCommand();
};