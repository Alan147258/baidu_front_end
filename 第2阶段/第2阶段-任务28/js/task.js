
(function(){
    var $show = $('#show');
    var WIDTH = $show.width();
    var HEIGHT = $show.height();
    //radius: [100,180,260,320],//四个圆的半径




    window.onload = function(){
        Show.draw();
        var fun = new Function();
        fun.ready();
        fun.run();
    };
})();
