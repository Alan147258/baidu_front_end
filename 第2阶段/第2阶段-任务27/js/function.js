function Function(){
    that = this;
    this.time ={};
    this.commandArr = ["ready", "start", "suspend", "destroy"];
    this.command = "";//命令 ："ready" "start" " suspend" "destroy"
    this.airport= new Array(4);
    this.speedArr = [1,0.8,0.6,0.4];
    this.energyConsumeArr = [0.3,0.36,0.38,0.4];
    this.chargingSpeed = [0.2,0.28,0.32,0.4];
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
        //console.log(Show.maxPrintRowNum());
        if(orderArr.length-1>=Show.maxPrintRowNum()){
            Show.output.innerText = orderArr.splice(1,orderArr.length).join("\n");
        }
    });
    /*创建飞机*/
    $('#create_plane').bind("click",function(){
        var $power_select = $('#power_select');
        var id = $power_select.get(0).selectedIndex;
        if($.isEmptyObject(that.airport[id])){
            var $energy_id = $('#energy_select').get(0).selectedIndex;

            that.airport[id] = new Plane(id,that.speedArr[id],that.energyConsumeArr[id],that.chargingSpeed[$energy_id]);
            var newPlane = that.airport[id];
            //console.log("飞机 "+planeIndex+"不存在，创建新飞机");
            that.command = "00"+id.toString(2) + "0000";
            Show.print("创建一架 "+newPlane.planeName+"\n");
        }
    });
    /*开始飞行飞机*/
    $li.find('input:eq(0)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = "00"+planeIndex.toString(2) + "0001";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print(newPlane.planeName+" 开始飞行 "+parseInt(newPlane.energy/newPlane.maxEnergy*100)+"%\n");
            //console.log(newPlane.energy);
            newPlane.condition = "fly";
        }
    });
    /*停止飞机*/
    $li.find('input:eq(1)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = "00"+planeIndex.toString(2) + "0010";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print(newPlane.planeName+" 停止飞行\n");
            newPlane.condition = "stop";
        }
    });
    /*销毁飞机*/
    $li.find('input:eq(2)').bind("click",function(){
        var planeIndex = Number(this.name);
        that.command = "00"+planeIndex.toString(2) + "0011";
        var newPlane = that.airport[planeIndex];
        if(!$.isEmptyObject(newPlane)){
            Show.print("摧毁"+newPlane.planeName+"\n");
            newPlane.condition = "destroyed";
            that.airport[planeIndex]={};
        }
    });
};
Function.prototype.adapter = function(string){
    var command = {};
    command.id = parseInt(string.slice(0,4),2);

    command.order = this.commandArr[parseInt(string.slice(4,8),2)];
    //console.log(command.order);
    return command;
};
Function.prototype.run = function(){
    var that = this;
    this.time = setInterval(function(){
        //var planeIndex = Number(that.command.split(" ")[0]);
        var planeIndex = that.adapter(that.command).id;
        if(!$.isEmptyObject(that.airport[planeIndex])){
            that.airport[planeIndex].order = that.adapter(that.command).order;
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
                        /*if(newPlane.condition=="destroyed"){
                            //that.airport[i]={};
                        }*/
                        break;
                    default:
                        break;
                }
                }
            }
    },30,false);
};