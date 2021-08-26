const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const Factory = artifacts.require("Factory");
const KaijuNFT = artifacts.require("KaijuNFT");
module.exports = async function (deployer) {
    var factory = await Factory.deployed();
    var nfts = [
        "LAND",
        "MONSTER",
        "SKILL"
    ]
    var maxIds = [30, 160, 160];
    var maxCount = 2000;

    for (var i = 0; i < nfts.length; i++) {
        var _type = nfts[i];
        var oldContract = await factory.getNFTContract(_type);
        var nft;

        nft = await upgradeProxy(oldContract, KaijuNFT, { deployer });

        await factory.setNFTContract(_type, nft.address);
    }
}