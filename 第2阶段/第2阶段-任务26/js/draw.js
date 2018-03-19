/*画图对象*/
var Show = {
    width : $('#show').width(),
    height :$('#show').height(),
    radius: [100,180,260,320],//四个圆的半径
    context: $('#canvas')[0].getContext('2d'),
    planeImgArr:[$('#show').find('.plane:eq(0)')[0],$('#show').find('.plane:eq(1)')[0],
        $('#show').find('.plane:eq(2)')[0],$('#show').find('.plane:eq(3)')[0]],
    $output:$('#order'),
    output:$('#order')[0],
    maxPrintRowNum:function(){
        return parseInt(this.$output.height()/this.$output.css('lineHeight').slice(0,this.$output.css('lineHeight').length-2))
    },
    clear:function() {
        this.context.clearRect(0,0,this.width,this.height);
    },
    draw:function(){
        var draw = $('#canvas');
        var drawing = draw[0];
        if(drawing.getContext){
            var x=this.width/2,y=this.height/2;
            var context = drawing.getContext('2d');
            context.beginPath();

            context.strokeStyle = "#fff";
            context.lineWidth = 0.3;
            context.arc(x,y,this.radius[0],0,2*Math.PI,false);

            context.moveTo(x+this.radius[1],y);
            context.arc(x,y,this.radius[1],0,2*Math.PI,false);

            context.moveTo(x+this.radius[2],y);
            context.arc(x,y,this.radius[2],0,2*Math.PI,false);

            context.moveTo(x+this.radius[3],y);
            context.arc(x,y,this.radius[3],0,2*Math.PI,false);

            var earth = $('#earth')[0];
            context.drawImage(earth,x-earth.width/2,y-earth.height/2,earth.width,earth.height);

            context.stroke();
        }
    },
    print: function(string){
        this.output.innerText += string;
    }
};

