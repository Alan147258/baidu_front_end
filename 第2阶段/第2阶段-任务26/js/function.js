function Function(){
    that = this;
    this.time ={};
    this.command = "";//命令 ："ready" "start" " suspend" "destroy"
    this.airport= new Array(4);
}
Function.prototype.ready = function(){
    var that = this;
    var plane = new Plane(1);
    var $li = $('#control').find('li');
    Show.output.value = "";
    /*命令显示输出*/
    Show.output.addEventListener("DOMSubtreeModified",function(){
        var text = Show.output.innerText;
        var orderArr = text.split("\n");
        console.log(Show.maxPrintRowNum());
        if(orderArr.length-1>=Show.maxPrintRowNum()){
            Show.output.innerText = orderArr.splice(1,orderArr.length).join("\n");
        }
    });
    /*创建飞机*/
    $li.find('input:eq(0)').bind("click",function(){
        var planeIndex = Number(this.name);
        if($.isEmptyObject(that.airport[planeIndex])){
            that.airport[planeIndex] = new Plane(planeIndex);
            var newPlane = that.airport[planeIndex];
            //console.log("飞机 "+planeIndex+"不存在，创建新飞机");
            that.command = planeIndex + " ready";
            Show.print("创建一架 "+newPlane.planeName+"\n");
        }
    });
    /*开始飞行飞机*/
    $li.find('input:eq(1)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = planeIndex + " start";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print(newPlane.planeName+" 开始飞行 "+parseInt(newPlane.energy/newPlane.maxEnergy*100)+"%\n");
            //console.log(newPlane.energy);
            newPlane.condition = "fly";
        }
    });
    /*停止飞机*/
    $li.find('input:eq(2)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = planeIndex + " suspend";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print(newPlane.planeName+" 停止飞行\n");
            newPlane.condition = "stop";
        }
    });
    /*销毁飞机*/
    $li.find('input:eq(3)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = planeIndex + " destroy";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print("摧毁"+newPlane.planeName+"\n");
            newPlane.condition = "destroyed";
        }
    });
};
Function.prototype.run = function(){
    var that = this;
    this.time = setInterval(function(){
        var planeIndex = Number(that.command.split(" ")[0]);
        if(!$.isEmptyObject(that.airport[planeIndex])) {
            that.airport[planeIndex].order = that.command.split(" ")[1];
            //console.log(planeId+" "+that.airport[planeId].order);
        }
        Show.clear();
        Show.draw();
        for(var i=0;i<that.airport.length;i++){
            var newPlane = that.airport[i];
            if(!$.isEmptyObject(newPlane)){
                //console.log((that.airport[planeName]));
                switch(newPlane.order){
                    case "ready":
                        newPlane.readyAnimation();
                        break;
                    case "start":
                        if(newPlane.energy>=0&&newPlane.condition=="fly"){
                            newPlane.flyAnimation();
                        }else{
                            newPlane.suspendAnimation();
                        }
                        break;
                    case "suspend":
                        if(newPlane.condition=="stop"){
                            newPlane.suspendAnimation();
                        }
                        break;
                    case "destroy":
                        if(newPlane.condition=="destroyed"){
                            newPlane={};
                        }
                        break;
                    default:
                        break;
                }
                }
            }
    },30,false);
};