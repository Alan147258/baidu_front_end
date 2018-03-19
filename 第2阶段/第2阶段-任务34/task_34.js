/*构造函数*/
function Block(){
    this.angle = 0;
    this.direction = "down";
    this.unit = 50;
    this.length =500;
}
/*画上面*/
Block.prototype.drawTop =function() {
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
};
/*画左侧*/
Block.prototype.drawLeft =function() {
    var left_number = document.getElementById('left_number');
    if(left_number.getContext){
        var context = left_number.getContext('2d');
        context.font = "16px Arial";
        context.textAlign = "center";
        context.textBaswLine = "middle";
        for(var i=1;i<11;i++){
            context.fillText(i.toString(),15,i*50-18);
        }
    }
};
/*画网格*/
Block.prototype.drawGrid =function() {
    var grid = document.getElementById('grid');
    if(grid.getContext){
        var context = grid.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#aaa";
        context.lineWidth = 0.3;
        for(var i=1;i<10;i++){
            context.moveTo(i*50,0);
            context.lineTo(i*50,498);
            context.moveTo(0,i*50);
            context.lineTo(498,i*50);
        }
        context.stroke();
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
/*按当期的方向移动*/
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
            img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "down" && top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "left" && left>0){
            img.style.left = (left - that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
        if(that.direction === "right" && left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
};
/*直接移动*/
Block.prototype.move =function() {
    var img = document.getElementById('img');
    var that = this;
    document.getElementById('turn_left').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        if(left>0){
            img.style.left = (left - that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_right').addEventListener("click",function(){
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        if(left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_top').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        if(top>0){
            img.style.top = (top - that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
    document.getElementById('turn_bottom').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        if(top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            img.style.transition = "All 0.2s ease-in-out";
        }
    },false);
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
window.onload = function(){
    var block = new Block();
    block.drawTop();
    block.drawLeft();
    block.drawGrid();
    var img = document.getElementById('img');
    img.style.top = "0px";
    img.style.left = "0px";
    block.go();
    block.turn();
    block.move();
    block.turnMove();
};