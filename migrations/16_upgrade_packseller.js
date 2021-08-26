const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const PackSeller = artifacts.require("PackSeller");
const KaijuLand = artifacts.require("KaijuLand");
const KaijuRouter = artifacts.require("KaijuRouter");
module.exports = async function (deployer) {

    const oldPack = await PackSeller.deployed();

    await upgradeProxy(oldPack.address, PackSeller, { deployer });
}