const myPlane = require("./myplane");
const QFTools = require("./tools");

function Bullet(){

}
Bullet.prototype={
	constructor: Bullet,
	init:function(plane){
		this.plane = plane;
		this.ele = QFTools.createDiv("bullet");
		this.ele.style.top = this.plane.ele.offsetTop - this.ele.offsetHeight + "px";
		this.ele.style.left = this.plane.ele.offsetLeft + this.plane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
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
		for(var i=0;i<this.plane.aBulltes.length;i++){
			if(this===this.plane.aBulltes[i]){
				this.plane.aBulltes.splice(i,1);
			}
		}
	}
}
module.exports = Bullet;