const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const Marketplace = artifacts.require("Marketplace");
const KaijuLand = artifacts.require("KaijuLand");
const KaijuRouter = artifacts.require("KaijuRouter");
module.exports = async function (deployer) {

    const oldMarket = await Marketplace.deployed();

    await upgradeProxy(oldMarket.address, Marketplace, { deployer });
}