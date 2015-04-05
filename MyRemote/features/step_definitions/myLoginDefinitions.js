var myLoginDefinitionsWrapper = function(){
	this.World = require("../support/world.js").World; // overwrite default World constructor

	this.Given(/^I am in login page$/,function(callback){
		this.visit()
	});
}