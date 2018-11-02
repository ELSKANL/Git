window.onload = function(){
	new Engine();
}

function Engine(){
	this.init();
}
Engine.prototype.init=function(){
	var _this=this;
	this.bodyMain = QFTools.$("#body_main");
	this.options = QFTools.$("#options");
	this.options.onclick=function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		if(target.nodeName==="LI"){
			_this.diff = target.value;
			_this.bodyMain.removeChild(_this.options);
			_this.startAnimation();
		}
	}
}

Engine.prototype.startAnimation=function(){
	var top=0;
	setInterval(function(){
		top-=10;
		this.bodyMain.style.backgroundPositionY = top + "px";
	}.bind(this),30);
	var logo = QFTools.createDiv("logo");
	var loading = QFTools.createDiv("loading");
	var n=0;
	var timer = setInterval(function(){
		n++;
		loading.style.background="url(images/loading"+(n%3+1)+".png)";
		if(n>5){
			clearInterval(timer);
			document.body.removeChild(loading);
			document.body.removeChild(logo);
			this.startGame();
		}
	}.bind(this),500);
}
Engine.prototype.startGame = function(){
	//创建敌机和战机
	myPlane.init(this.bodyMain).fire(this.diff);
	setInterval(()=>{
		var rand = Math.random().toFixed(2);
		if(rand<0.4) new Enemy(1,this.bodyMain);
		else if(rand<0.6) new Enemy(2,this.bodyMain);
		else if(rand<0.65) new Enemy(3,this.bodyMain);
	},500);
}


var myPlane = {
	aBulltes:[],
	init:function(bodyMain){
		this.bodyMain = bodyMain;
		this.ele = QFTools.createDiv("my-warplain");
		this.ele.style.left = (QFTools.getBody().width-this.ele.offsetWidth)/2+"px";
		this.ele.style.top = QFTools.getBody().height-this.ele.offsetHeight+"px";
		this.move();
		return this;
	},
	move:function(){
		QFTools.on(document.body,"mousemove",function(e){
			e = e || event;
			this.ele.style.top = e.clientY-this.ele.offsetHeight/2+"px";
			var _left = e.clientX-this.ele.offsetWidth/2;
			if(_left < this.bodyMain.offsetLeft) _left=this.bodyMain.offsetLeft;
			if(_left > this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth)
				_left = this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth;
			this.ele.style.left = _left +"px";
		}.bind(this),false);
	},
	fire:function(diff){
		this.duration = 500/diff;
		setInterval(()=>{
			this.aBulltes.push(new Bullet().init(this.ele));
		},this.duration);
	}
}
function Bullet(){

}
Bullet.prototype={
	constructor: Bullet,
	init:function(plane){
		this.ele = QFTools.createDiv("bullet");
		this.ele.style.top=plane.offsetTop-this.ele.offsetHeight+"px";
		this.ele.style.left=plane.offsetLeft+plane.offsetWidth/2-this.ele.offsetWidth/2+"px";
		this.move();
		return this;
	},
	move:function(){
		this.timer = setInterval(()=>{
			this.ele.style.top=this.ele.offsetTop-8+"px";
			if(this.ele.style.top<-40) this.die();
		},30);
	},
	die:function(){
		clearInterval(this.timer);
		this.ele.className="bullet_die";
		setTimeout(()=>{
			this.ele.className="bullet_die2";
			setTimeout(()=>{
				document.body.removeChild(this.ele);
			},100);
		},100);
		for(var i=0;i<myPlane.aBulltes.length;i++){
			if(this===myPlane.aBulltes[i]){
				myPlane.aBulltes.splice(i,1);
			}
		}
	}
}

class Enemy{
	constructor(type,bodyMain){
		this.type = type;
		this.bodyMain = bodyMain;
		this.init();
	}
	init(){
		switch(this.type){
			case 1:
				this.ele = QFTools.createDiv("enemy-small");
				this.speed = 5;
				this.blood = 1;
			break;
			case 2:
				this.ele=QFTools.createDiv("enemy-middle");
				this.speed = 3;
				this.blood = 7;
			break;
			case 3:
				this.ele=QFTools.createDiv("enemy-large");
				this.speed=1;
				this.blood=15;
			break;
		}
		var min = this.bodyMain.offsetLeft;
		var max = this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth;
		var _left = parseInt(Math.random()*(max-min))+min;
		var _top = -this.ele.offsetHeight;
		this.ele.style.top=_top+"px";
		this.ele.style.left=_left+"px";
		this.move();
	}
	move(){
		this.timer = setInterval(()=>{
			this.ele.style.top = this.ele.offsetTop+this.speed+"px";
			if(this.ele.offsetTop>this.bodyMain.offsetHeight) this.die();
			var mLeft = myPlane.ele.offsetLeft,
				mRight = myPlane.ele.offsetWidth+mLeft,
				mTop = myPlane.ele.offsetTop,
				mBottom = myPlane.ele.offsetHeight+mTop,
				eLeft = this.ele.offsetLeft,
				eRight = eLeft + this.ele.offsetWidth,
				eTop = this.ele.offsetTop,
				eBottom = eTop + this.ele.offsetHeight;
			if(!(mLeft>eRight || mTop>eBottom || mRight<eLeft || mBottom<eTop)){
				if(confirm("你死了，重新开始吗？")){
				window.location.reload(true);
				}
			}
			for(var i=0;i<myPlane.aBulltes.length;i++){
					var bLeft = myPlane.aBulltes[i].ele.offsetLeft,
						bRight = bLeft + myPlane.aBulltes[i].ele.offsetWidth,
						bTop = myPlane.aBulltes[i].ele.offsetTop,
						bBottom = bTop + myPlane.aBulltes[i].ele.offsetHeight;
					if(!(eBottom < bTop || bRight < eLeft || bBottom < eTop || eRight < bLeft)){
						console.log(this);
						myPlane.aBulltes[i].die();
						if(--this.blood === 0){
							this.die();
						}
					}
				}
		},30);
	}
	die(){
		document.body.removeChild(this.ele);
		clearInterval(this.timer);
	}
}