function Plane(index){
    var that = this;
    this.index = index;
    this.speedArr = [1,0.8,0.6,0.4];
    this.energyArr = [100,125,250,375];
    this.speed = (function(){return that.speedArr[index];})();
    this.energyBar = 50;
    this.x = (function(){return Show.width/2 + Show.radius[index];})();
    this.y = (function(){return Show.height/2 ;})();
    this.width=(function(){return $('#plane1').width();})();
    this.height=(function(){return $('#plane1').height();})();
    this.angle = 0;
    this.maxEnergy= (function(){return that.energyArr[index];})();
    this.energy= (function(){return that.maxEnergy;})();
    this.condition = "";//"fly" "stop" "destroyed"
    this.order = "";
    this.palneNameArr = ["民航飞机","升天火箭","绕地卫星","航天飞机"];
    this.planeName = (function(){return that.palneNameArr[index];})();
}
/*飞船准备动画*/
Plane.prototype.readyAnimation = function(){
    var planeImg = Show.planeImgArr[this.index];
    this.condition = "fly";
    Show.context.fillStyle = "#33a3dc";
    Show.context.fillRect(Show.width/2 + Show.radius[this.index]-this.width/2+(this.width-this.energyBar)/2,Show.height/2-this.width/2-10,this.energyBar,5);//能量条
    Show.context.drawImage(planeImg,Show.width/2-this.height/2+Show.radius[this.index],Show.height/2-this.height/2,this.width,this.height);
};
/*飞船飞行动画*/
Plane.prototype.flyAnimation = function(){
    var planeIndex = Number(this.index);
    var ship1 = Show.planeImgArr[planeIndex];
    Show.context.save();//保存当前上下文设置
    this.energy=this.energy>=this.speed?(this.energy-this.speed):0;
    //this.angle = this.angle>=360 ? 0:(this.angle+3.6*this.speed);
    this.angle = this.angle+3.6*this.speed;
    this.x = Show.width/2 + Show.radius[planeIndex]*Math.cos(this.angle*Math.PI/180);
    this.y = Show.height/2 - Show.radius[planeIndex]*Math.sin(this.angle*Math.PI/180);
    Show.context.translate(this.x,this.y);//将绘图原点移到飞机中点
    Show.context.rotate(-this.angle*Math.PI/180);//将飞机图片按中心旋转
    Show.context.translate(-this.width/2,-this.height/2);//设置原点为飞机图片左上角，下面绘图从原点开始绘制
    //以下演示填充矩形。
    if(this.energy>=0.7*this.maxEnergy)
    {
        Show.context.fillStyle = "#33a3dc";
    }else if( this.energy>=0.4*this.maxEnergy){
        Show.context.fillStyle = "#ff0";
    }else{
        Show.context.fillStyle = "#ed1941";
    }
    Show.context.fillRect((this.width-this.energyBar)/2,-10,this.energy/this.maxEnergy*this.energyBar,5);
    Show.context.drawImage(ship1,0,0,this.width,this.height);
    Show.context.restore();//恢复到保存的上下文设置
    if(this.energy<=0){
        this.energy = 0;
        Show.print(this.planeName+" 能量耗尽\n");
        this.condition = "stop";
    }
    //if(this.energy){console.log("飞机 "+this.index+"   "+this.energy);}//控制台输出飞行状态
};
/*飞船停止动画*/
Plane.prototype.suspendAnimation = function(){
    if(this.energy<this.maxEnergy){
        if(this.energy>=this.maxEnergy-2*this.speed){
            Show.print(this.planeName+" 能量充满\n");
        }
        this.energy+=this.speed*2;
    }else{
        this.energy=this.maxEnergy;
    }
    //if(this.energy!=this.maxEnergy){console.log("飞机 "+this.index+" 充能 "+this.energy);}//控制台输出充能状态
    Show.context.save();//保存当前上下文设置
    Show.context.translate(this.x,this.y);//将绘图原点移到飞机中点
    Show.context.rotate(-this.angle*Math.PI/180);//将飞机图片按中心旋转
    Show.context.translate(-this.width/2,-this.height/2);//设置原点为飞机图片左上角，下面绘图从原点开始绘制
    //以下演示填充矩形。
    if(this.energy>=0.7*this.maxEnergy){
        Show.context.fillStyle = "#33a3dc";
    }
    else if(this.energy>=0.4*this.maxEnergy){
        Show.context.fillStyle = "#ff0";
    }
    else{
        Show.context.fillStyle = "#ed1941";
    }
    Show.context.fillRect((this.width-this.energyBar)/2,-10,this.energy/this.maxEnergy*this.energyBar,5);
    Show.context.drawImage(Show.planeImgArr[this.index],0,0,this.width,this.height);
    Show.context.restore();//恢复到保存的上下文设置
};

