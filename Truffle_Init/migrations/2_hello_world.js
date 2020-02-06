const hello = artifacts.require("./HelloWorld")

const input = {
	name: "filipp"
}
module.exports = function(deployer){
	deployer.deploy(hello,input.name);
}