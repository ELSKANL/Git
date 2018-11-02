const Bullet = require("./bullet");
const QFTools = require("./tools");

module.exports = {
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
			this.aBulltes.push(new Bullet().init(this));
		},this.duration);
	}
}
