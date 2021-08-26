const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const Factory = artifacts.require("Factory");
const KaijuLand = artifacts.require("KaijuLand");
const KaijuRouter = artifacts.require("KaijuRouter");
module.exports = async function (deployer) {

    const oldRouter = await KaijuRouter.deployed();

    await upgradeProxy(oldRouter.address, KaijuRouter, { deployer });
}