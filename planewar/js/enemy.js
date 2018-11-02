const myPlane = require("./myplane");
const Bullet = require("./bullet");
const QFTools = require("./tools");

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

module.exports = Enemy;