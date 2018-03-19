//棋盘格背景类
var Show = {
    unit :30,//单个网格的长宽
    gridX:20,//横向网格数目
    gridY:20,//纵向网格数目
    length :function(){return this.unit*this.gridX;},
    gridNum : function(){return this.gridX*this.gridY;},
    lineNumbers : 0,
    wall : [],
    head:$('#image')[0],
    grid:$('#grid')[0],
    context:$('#grid')[0].getContext("2d"),
    timeFlag: false,//是否在中断中
    //画网格编号和移动头像
    draw : function() {
        var header_number = document.getElementById('header_number');
        if(header_number.getContext){
            var context = header_number.getContext('2d');
            context.font = "14px Arial";
            context.textAlign = "center";
            context.textBaswLine = "middle";
            for(var i=1;i<this.gridX+1;i++){
                context.fillText(i.toString(),i*this.unit-this.unit/2,20);
            }
        }
        var left_number = document.getElementById('left_number');
        if(left_number.getContext){
            var context1 = left_number.getContext('2d');
            context1.font = "14px Arial";
            context1.textAlign = "center";
            context1.textBaswLine = "middle";
            for(i=1;i<this.gridY+1;i++){
                context1.fillText(i.toString(),15,i*this.unit-5);
            }
        }
        this.drawCheckerboard();
        //画头像
        var context3 = grid.getContext('2d');
        context3.drawImage($('#image')[0],this.unit,this.unit,this.unit,this.unit);
    },
    //画网格
    drawCheckerboard:function(){
        var grid = document.getElementById('grid');
        if(grid.getContext){
            var context2 = grid.getContext('2d');
            context2.beginPath();
            context2.strokeStyle = "#aaa";
            context2.lineWidth = 0.3;
            for(i=1;i<this.gridX;i++){
                context2.moveTo(i*this.unit,0);
                context2.lineTo(i*this.unit,this.length());
                context2.moveTo(0,i*this.unit);
                context2.lineTo(this.length()-2,i*this.unit);
            }
            context2.stroke();
        }
        var context3 = grid.getContext('2d');
        context3.fillStyle = "#3678ff";
        var unit = this.unit;
        for(var m=0;m<this.gridX;m++) {
            for(var n=0;n<this.gridY;n++){
                if(this.wall[m][n] == true){
                    context3.fillRect(m*unit, n*unit,unit,unit);
                }
            }
        }
    },
    //清除中央画布，刷新后重新画
    clear:function() {
        this.context.clearRect(0,0,this.grid.offsetWidth,this.grid.offsetHeight);
    },
    //由坐标转为编号
    coordinateToNumber:function(x,y){
        return (x+y*Show.gridX);
    },
    //由编号转为坐标
    numberToCoordinate:function(num){
        return {
            x:(num%Show.gridX),
            y:parseInt(num/Show.gridX)
        };
    },
    //整个页面初始化
    init : function() {
        var i = 0,j=0;
        for(i=0;i<this.gridX;i++){
            this.wall[i] = new Array(this.gridY);
            for(j=0;j<this.gridY;j++){
                this.wall[i][j] = false;
            }
        }
        for(i=0;i<this.gridNum()/3;i++){
            var randomX = parseInt(Math.random()*this.gridX),
                randomY = parseInt(Math.random()*this.gridY);
            this.wall[randomX][randomY] = true;
        }
        this.wall[1][1]=false;
        this.draw();
    }
};
//移动头像类
function Block(optimalPath){
    this.x = 1;
    this.y = 1;
    this.optimalPath = optimalPath;
    this.adjacencyArr = (function(){
        var array = new Array(Show.gridNum());
        for(var i=0;i<Show.gridNum();i++){
            array[i] = new Array(Show.gridNum());
        }
        return array;
    })();
    //移动一格
    this.moveOnce = function(direction){
        var that = this;
        //var $img = this.$img;
        var time1,ms=10,num = 0;
        var xNow= that.x,yNow=that.y;
        var l= 0,t = 0;
        switch(direction){
            case "up":
                l = 0;
                t = -1;
                break;
            case "down":
                l=0;
                t = 1;
                break;
            case "left":
                l = -1;
                t=0;
                break;
            case "right":
                l = 1;
                t = 0;
                break;
            default:
                alert("function moveOnce() input parameter error!");
                break;
        }
        time1 = setInterval(function(){
            Show.timeFlag=true;
            Show.clear();
            Show.drawCheckerboard();
            //console.log(x+"---"+y);
            var x= 0,y= 0;
            x =Math.abs((num+1)*Show.unit/5)* l ;
            y =Math.abs((num+1)*Show.unit/5)* t ;
            //console.log(xNow*Show.unit+x+"---"+yNow*Show.unit+y);
            Show.context.drawImage(Show.head,xNow*Show.unit+x,yNow*Show.unit+y,Show.unit,Show.unit);
            num++;
            if(num>=5){
                num=0;
                Show.timeFlag=false;
                clearInterval(time1);
            }
        },ms,false);
    };
    //移动到（x，y）
    this.moveToXY = function(x,y,distance,string){
        var that = this;
        var path = string.split(' ');
        if(distance<1000){
            for(var i=0;i<path.length;i++){
                var number = Number(path[i]);
                setTimeout(function(number){
                    var goToX = Show.numberToCoordinate(number).x,
                        goToY = Show.numberToCoordinate(number).y;
                    that.moveTo(goToX,goToY);
                },i*50,number);
            }
        }else{
            alert("无法到达！");
        }
    };
    //移动动画
    this.moveTo = function(x,y){
        var that = this;
        var i = 1;
        var xNow = this.x,yNow = this.y;
        while(true){
            if(x-xNow>0){
                if(x-xNow<i) {break;}
                setTimeout(function(){that.moveOnce("right");that.x++; },i*20);
            }else{
                if(xNow-x<i) {break;}
                setTimeout(function(){that.moveOnce("left");that.x--;},i*20);
            }
            i++;
            if(i>=1000) break;
        }
        while(true){
            if(y-yNow>=0){
                if(y-yNow<i-Math.abs(x-xNow)) {break;}
                setTimeout(function(){that.moveOnce("down");that.y++;},i*20);
            }else{
                if(yNow-y<i-Math.abs(x-xNow)) {break;}
                setTimeout(function(){that.moveOnce("up");that.y--;},i*20);
            }
            i++;
            if(i>=1000) break;//防止死循环
        }
    };
    //获取点击的网格坐标
    this.getMousePosition = function(){
        var that = this;
        var checkerboard = document.getElementById('checkerboard');
        checkerboard.addEventListener("mousedown",function(e){

            var left = e.pageX - this.offsetLeft;
            var top = e.pageY - this.offsetTop;
            if(left>Show.length()){left=Show.length();}
            if(left<0){left=0;}
            if(top>Show.length()){top=Show.length()}
            if(top<0){top=0}
            var x = parseInt(left/Show.unit);
            var y = parseInt(top/Show.unit);
            if(!Show.timeFlag && !Show.wall[x][y]){
                var dis,path;
                if(that.optimalPath.name =="Dijkstra"){
                    var dijkstra = strategies.dijkstra;
                    var dij = dijkstra.dijkstra(Show.coordinateToNumber(that.x,that.y));
                    dis = dij.getPathDis(that.x,that.y,x,y).dis;
                    path = dij.getPathDis(that.x,that.y,x,y).path;
                }
                if(that.optimalPath.name =="Floyd"){
                    dis = that.optimalPath.getPathDis(that.x,that.y,x,y).dis;
                    path = that.optimalPath.getPathDis(that.x,that.y,x,y).path;
                }
                that.moveToXY(x,y,dis,path);
            }
            var printInformation = {
                algorithm:that.optimalPath.name,
                clickPoint:("click( " + x + " , " + y + " )  wall?:" + Show.wall[x][y]),
                dist:(function(){
                    if(dis<=10000||dis!=undefined){
                        return dis;
                    }else{
                        return "Infinity";
                    }
                })(),
                road:(function(){
                    if(dis<=10000||dis!=undefined){
                        return path;
                    }else{
                        return "无法到达";
                    }
                })()
            };
            console.log(printInformation);
        },false);
    }
}
//封装Floyd和Dijkstra两种最短路径算法对象
var strategies = {
    //弗洛伊德算法
    "floyd":{
        name : "Floyd",
        //邻接矩阵
        adjacencyArr:(function(){
            var array = new Array(Show.gridNum());
            for(var i=0;i<Show.gridNum();i++){
                array[i] = new Array(Show.gridNum());
            }
            return array;
        })(),
        //存放最短距离的数组
        distArr :[],
        //存放路径的数组
        path:(function(){
            var array = new Array(Show.gridNum());
            for(var i=0;i<Show.gridNum();i++){
                array[i] = new Array(Show.gridNum());
                for(var j=0;j<Show.gridNum();j++){
                    array[i][j] = i+" ";
                }
            }
            return array;
        })(),
        initAdjacencyArr:function(){
            for(var n=0;n<Show.gridY;n++){
                for(var m=0;m<Show.gridX;m++){
                    var id = m + n*Show.gridX;
                    var preRowId = m + (n-1)*Show.gridX;
                    var nextRowId = m + (n+1)*Show.gridX;

                    if(m!=0){
                        this.adjacencyArr[id][id-1] = true;
                        if(Show.wall[m][n]===true) {
                            // console.log(m+" , "+n+"----"+id+" , "+(id-1));
                            this.adjacencyArr[id][id-1] = false;//左
                        }
                    }
                    if(m!=(Show.gridX-1)){
                        this.adjacencyArr[id][id+1] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][id+1] = false;//左
                        }
                    }
                    if(n!=0){
                        this.adjacencyArr[id][preRowId] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][preRowId] = false;//左
                        }
                    }
                    if(n!=(Show.gridY-1)){
                        this.adjacencyArr[id][nextRowId] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][nextRowId] = false;//左
                        }
                    }
                }
            }
            for(var i = 0;i<Show.gridNum();i++){
                for(var j = 0;j<Show.gridNum();j++){
                    if(i==j){
                        this.adjacencyArr[j][i]=true;
                    }
                    if(this.adjacencyArr[i][j]==false){
                        this.adjacencyArr[j][i]=this.adjacencyArr[i][j];
                    }
                    if(this.adjacencyArr[i][j]!=true&&this.adjacencyArr[i][j]!=false){
                        this.adjacencyArr[i][j]=false;
                    }
                }
            }
            //console.log(Show.wall);
            //console.log(this.adjacencyArr);
        },
        //核心算法
        floyd:function(){
            var inf = 99999999;
            this.distArr =new Array(Show.gridNum());
            for(var m=0;m<Show.gridNum();m++){
                this.distArr[m] = new Array(Show.gridNum());
                for(var n=0;n<Show.gridNum();n++) {
                    if(this.adjacencyArr[m][n]==true){
                        this.distArr[m][n] = 1;
                    }else{
                        this.distArr[m][n] = inf;
                    }
                    if(m==n){
                        this.distArr[m][n] = 0;
                    }
                }
            }
            for(var k=0;k<Show.gridNum();k++){
                for(var i=0;i<Show.gridNum();i++){
                    for(var j=0;j<Show.gridNum();j++){
                        if(this.distArr[i][j]>this.distArr[i][k]+this.distArr[k][j]){
                            this.distArr[i][j]=this.distArr[i][k]+this.distArr[k][j];
                            this.path[i][j] = this.path[i][k] + this.path[k][j];
                        }
                    }
                }
            }
            //console.log(this.path);
            return this;
            //console.log(array);
        },
        //生成最短路径和距离
        getPathDis:function(startX,startY,endX,endY){
            var startNumber = Show.coordinateToNumber(startX,startY),
                endNumber = Show.coordinateToNumber(endX,endY);

            var string = this.path[startNumber][endNumber]+endNumber;
            var dis = this.distArr[startNumber][endNumber];
            return{
                dis:dis,
                path:string
            }
        },
        //完成初始化
        init:function(){
            this.initAdjacencyArr();
            this.floyd();
        }
    },
    //迪杰特斯拉算法
    "dijkstra":{
        name:"Dijkstra",
        distArr:[],
        dis:new Array(Show.gridNum()),
        path : new Array(Show.gridNum()),
        adjacencyArr:(function(){
            var array = new Array(Show.gridNum());
            for(var i=0;i<Show.gridNum();i++){
                array[i] = new Array(Show.gridNum());
            }
            return array;
        })(),
        init:function(){
            var m= 0,n= 0,i= 0,j= 0,inf=99999999;
            for( n=0;n<Show.gridY;n++){
                for(m=0;m<Show.gridX;m++){
                    var id = m + n*Show.gridX;
                    var preRowId = m + (n-1)*Show.gridX;
                    var nextRowId = m + (n+1)*Show.gridX;
                    if(m!=0){
                        this.adjacencyArr[id][id-1] = true;
                        if(Show.wall[m][n]===true) {
                            // console.log(m+" , "+n+"----"+id+" , "+(id-1));
                            this.adjacencyArr[id][id-1] = false;//左
                        }
                    }
                    if(m!=(Show.gridX-1)){
                        this.adjacencyArr[id][id+1] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][id+1] = false;//左
                        }
                    }
                    if(n!=0){
                        this.adjacencyArr[id][preRowId] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][preRowId] = false;//左
                        }
                    }
                    if(n!=(Show.gridY-1)){
                        this.adjacencyArr[id][nextRowId] = true;
                        if(Show.wall[m][n]===true) {
                            //console.log(m+" , "+n);
                            this.adjacencyArr[id][nextRowId] = false;//左
                        }
                    }
                }
            }
            for(i = 0;i<Show.gridNum();i++){
                for(j = 0;j<Show.gridNum();j++){
                    if(i==j){
                        this.adjacencyArr[j][i]=true;
                    }
                    if(this.adjacencyArr[i][j]==false){
                        this.adjacencyArr[j][i]=this.adjacencyArr[i][j];
                    }
                    if(this.adjacencyArr[i][j]!=true&&this.adjacencyArr[i][j]!=false){
                        this.adjacencyArr[i][j]=false;
                    }
                }
            }
            this.distArr =new Array(Show.gridNum());
            for(m=0;m<Show.gridNum();m++){
                this.distArr[m] = new Array(Show.gridNum());
                for(n=0;n<Show.gridNum();n++) {
                    if(this.adjacencyArr[m][n]==true){
                        this.distArr[m][n] = 1;
                    }else{
                        this.distArr[m][n] = inf;
                    }
                    if(m==n){
                        this.distArr[m][n] = 0;
                    }
                }
            }
        },
        dijkstra:function(id){
            var i= 0,j= 0,v= 0,min = 0, u=0,inf=99999999;
            var register = new Array(Show.gridNum());
            this.init();
            for(i=0;i<Show.gridNum();i++){
                this.dis[i] = this.distArr[id][i];
                register[i] = false;
            }
            for( n=0;n<Show.gridY;n++){
                for(m=0;m<Show.gridX;m++){
                    var num = Show.coordinateToNumber(m,n);
                    if(Show.wall[m][n]!=true){
                        this.path[num] = " "+num;
                    }else{
                        this.path[num] ="error";
                    }
                }
            }
            /*var arr = [100];
             for(i=0;i<Show.gridNum();i++) {
             arr[i] = this.dis[i];
             }
             console.log(arr);*/
            register[id] = true;
            for(i=0;i<Show.gridNum();i++){
                min = inf;
                for(j=0;j<Show.gridNum();j++){
                    if(register[j]==false&&this.dis[j]<min){
                        min = this.dis[j];
                        u=j;
                    }
                }
                register[u] = true;
                for(v=0;v<Show.gridNum();v++){
                    if(this.distArr[u][v]<inf){
                        if(this.dis[v]>this.dis[u]+this.distArr[u][v]){
                            this.dis[v] = this.dis[u]+this.distArr[u][v];
                            this.path[v] = this.path[u]+" "+v;
                        }
                    }
                }
            }
            //console.log(this.dis);
            //console.log(this.path);
            return this;
        },
        getPathDis:function(startX,startY,endX,endY){
            var endNumber = Show.coordinateToNumber(endX,endY);
            var string = this.path[endNumber].trim();
            var dis = this.dis[endNumber];
            return{
                dis:dis,
                path:string
            }
        }
    }
};
window.onload = function(){
    Show.init();
    var f = strategies.floyd;
    f.init();
    //console.log(f);
    var d = strategies.dijkstra;
    //console.log(d);

    var block = new Block(f);
    block.getMousePosition();
};