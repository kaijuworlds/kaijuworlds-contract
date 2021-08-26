const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const Factory = artifacts.require("Factory");
const KaijuLand = artifacts.require("KaijuLand");
module.exports = async function (deployer) {

    // const oldLand = await KaijuLand.deployed();

    // await upgradeProxy(oldLand.address, KaijuLand, { deployer });
}