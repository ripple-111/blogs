
    var context;//画布上下文
    var boundaryHeight;//画布高，边界值
    var boundaryWidth;//画布宽，边界值
    var starArr = [];
    var meteorArr = [];
    var STAR_COUNT = 500;//星星数，常量
    var METEOR_COUNT = 20;//流星数，常量
    var METEOR_SEPARATE = 300; //流星之间间隔，常量
    var meteorCoordinateArr = [];//存所有流星的坐标数组
    var playMeteorTimeout;
    var playStarsTimeout;

    //初始化画布及context
    export default function init(container) {
        starArr = [];
        meteorArr = [];

        // var canvas = document.createElement("canvas");
        // container.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        boundaryHeight = container.height;
        boundaryWidth =  container.width;

        //获取context
        context =container.getContext("2d");
        context.fillStyle = "black";

        //画星星
        for (var i = 0; i < STAR_COUNT; i++) {
            var star = new Star();
            star.init();
            star.draw();
            starArr.push(star);
        }
        //画流星
        for (var j = 0; j < METEOR_COUNT; j++) {
            var rain = new MeteorRain();
            rain.init(j);
            rain.draw();
            meteorArr.push(rain);
        }

        playStars();//星星动起来
        playMeteor();//流星动起来
    }

    //创建一个星星对象
    var Star = function () {
        this.x = boundaryWidth * Math.random();//横坐标
        this.y = boundaryHeight * Math.random();//纵坐标
        this.color = "";//星星颜色
    };

    Star.prototype = {
        constructor: Star,
        //初始化
        init: function () {
            this.getColor();
        },
        //产生随机颜色
        getColor: function () {
            var _randomNum = Math.random();

            if (_randomNum < 0.5) {
                this.color = "gray";
            }
            else {
                this.color = "white";
            }

        },
        //绘制
        draw: function () {
            context.beginPath();
            //画圆点
            context.arc(this.x, this.y, 0.05, 0, 2 * Math.PI);
            context.strokeStyle = this.color;
            context.stroke(); 
            context.closePath();
        }  
    }

    //星星闪起来
    function playStars() {
        for (var n = 0; n < STAR_COUNT; n++) {  
            starArr[n].getColor();  
            starArr[n].draw();  
        }  

        clearTimeout(playStarsTimeout);
        playStarsTimeout = setTimeout(playStars, 200);
    }


    //创建一个流星对象
    var MeteorRain = function () {
        this.x = -1;//流星的横坐标
        this.y = -1;//流星的纵坐标
        this.length = -1;//流星的长度
        this.angle = 30; //倾斜角度
        this.width = -1;//流星所占宽度，及矩形的宽度
        this.height = -1;//流星所占高度，及矩形的高度
        this.speed = 0.2;//速度
        this.offset_x = -0.5;//横轴移动偏移量
        this.offset_y = -0.5;//纵轴移动偏移量
        this.alpha = 1; //透明度
    };

    MeteorRain.prototype = {
        constructor: MeteorRain,
        //初始化
        init: function (i) {
            this.alpha = 1;//透明度
            this.angle = 30; //流星倾斜角
            this.speed = Math.ceil(Math.random() + 0.5); //流星的速度

            var x = Math.random() * 80 + 180;
            var cos = Math.cos(this.angle * 3.14 / 180);
            var sin = Math.sin(this.angle * 3.14 / 180) ;

            this.length = Math.ceil(x);//流星长度

            this.width = this.length * cos;  //流星所占宽度，及矩形的宽度
            this.height = this.length * sin; //流星所占高度，及矩形的高度
            this.offset_x = this.speed * cos * 3.5;
            this.offset_y = this.speed * sin * 3.5;

            this.getPos(i);
        },
        //计算流星坐标
        countPos: function () {
            //往左下移动,x减少，y增加
            this.x = this.x - this.offset_x;
            this.y = this.y + this.offset_y;
        },
        //获取随机坐标
        getPos: function (i) {
            let  _this = this;
 
            function getCoordinate() {
                _this.x = Math.random() * boundaryWidth; //x坐标
                meteorCoordinateArr[i] = _this.x;
            }

            getCoordinate();

            this.y = 0.2 * boundaryHeight;  //y坐标
        },
        //画流星
        draw: function () {
            context.save();
            context.beginPath();
            context.lineWidth = 2.5; //宽度
            context.globalAlpha = this.alpha; //设置透明度

            //创建横向渐变颜色,起点坐标至终点坐标
            var line = context.createLinearGradient(this.x, this.y, this.x + this.width, this.y - this.height);

            //分段设置颜色
            line.addColorStop(0, "rgba(255, 255, 255, 1)");
            line.addColorStop(1, "rgba(255, 255,255 , 0)");

            if (this.alpha < 0 ) {
                this.alpha = -this.alpha;
            }
            //填充
            context.strokeStyle = line;
            //起点
            context.moveTo(this.x, this.y);
            //终点
            context.lineTo(this.x + this.width, this.y - this.height);

            context.closePath();
            context.stroke();
            context.restore();
        },
        move: function () {

            var x = this.x + this.width - this.offset_x;
            var y = this.y - this.height;

            this.alpha -= 0.002;

            //重新计算位置，往左下移动
            this.countPos();

            if (this.alpha <= 0) {
                this.alpha = 0;
            }
            else if(this.alpha > 1) {
                this.alpha = 1;
            }

            //画一个矩形去清空流星
            context.clearRect(this.x - this.offset_x, y, this.width + this.offset_x, this.height); 
            //重绘
            this.draw(); 
        }
    }    
    //流星动起来
    function playMeteor() {
        for (var n = 0; n < METEOR_COUNT; n++) {  
            var rain = meteorArr[n];

            rain.move();//移动

            if (rain.y > boundaryHeight + 100) {//超出界限后重来
                context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
                meteorCoordinateArr[n] = 0;//清空坐标数组具体流星的坐标
                meteorArr[n] = new MeteorRain(n);
                meteorArr[n].init(n);
            }
        }  

        clearTimeout(playMeteorTimeout);
        playMeteorTimeout = setTimeout(playMeteor, 10);
    } 