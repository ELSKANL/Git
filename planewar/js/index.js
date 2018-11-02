require("!style-loader!css-loader!../css/dahuiji.css");

const Engine = require("./engine");

window.onload = function(){
	new Engine();
}