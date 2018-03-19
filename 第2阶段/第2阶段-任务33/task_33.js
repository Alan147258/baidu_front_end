function Block(){
    this.angle = 0;
    this.direction = "down";
    this.unit = 50;
    this.length =500;
}
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

Block.prototype.turn =function() {
    var that = this;
    var img = document.getElementById('img');
    document.getElementById('rig').addEventListener("click",function(){
        that.angle+=90;
        if(that.angle > 360){
            that.angle -= 360;
        }console.log("angle:"+that.angle);
        img.style.transform = 'rotate('+that.angle+'deg)';
        that.rotate();
    },false);
    document.getElementById('lef').addEventListener("click",function(){
        that.angle-=90;
        if(that.angle < 0){
            that.angle = 360 + that.angle;
        }console.log("angle:"+that.angle);
        img.style.transform = 'rotate('+that.angle+'deg)';
        that.rotate();
    },false);
    document.getElementById('bac').addEventListener("click",function(){
        that.angle+=180;
        if(that.angle > 360){
            that.angle -= 360;
        }
        console.log("angle:"+that.angle);
        img.style.transform = 'rotate('+that.angle+'deg)';
        that.rotate();
    },false);
};
Block.prototype.rotate =function() {
    if(this.angle === 0 || this.angle === 360){
        this.direction = "down";
    }
    if(this.angle === 180){
        this.direction = "up";
    }
    if(this.angle === 90){
        this.direction = "left";
    }
    if(this.angle === 270){
        this.direction = "right";
    }
};
Block.prototype.go =function() {
    var that = this;
    var img = document.getElementById('img');
    document.getElementById('go').addEventListener("click",function(){
        var top = Number(img.style.top.slice(0,img.style.top.length-2));
        var left = Number(img.style.left.slice(0,img.style.left.length-2));
        if(that.direction === "up" && top>0){
            img.style.top = (top - that.unit) +"px";
            console.log("top:"+img.style.top);
        }
        if(that.direction === "down" && top<that.length-that.unit){
            img.style.top = (top + that.unit) +"px";
            console.log("top:"+img.style.top);
        }
        if(that.direction === "left" && left>0){
            img.style.left = (left - that.unit) +"px";
        }
        if(that.direction === "right" && left<that.length-that.unit){
            img.style.left = (left + that.unit) +"px";
        }
    },false);
};
window.onload = function(){
    var block = new Block();
    block.drawTop();
    block.drawLeft();
    block.drawGrid();
    block.go();
    block.turn();
};