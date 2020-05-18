const hello = artifacts.require("./HelloWorld")
const owner = web3.eth.accounts[0]
const input = {
	name: "filipp"
}
module.exports = deployer=> {
	deployer.deploy(hello,input.name);
}
