const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const Factory = artifacts.require("Factory");
const KaijuNFT = artifacts.require("KaijuNFT");
const KaijuRouter = artifacts.require("KaijuRouter");
var nfts = [
    "MONSTER",
    "SKILL",
    "LAND"
]
var maxIds = [30, 160, 160];
var maxCount = 2000;
module.exports = async function (deployer) {
    var factory = await Factory.deployed();
    for (var i = 0; i < nfts.length; i++) {
        var _type = nfts[i];
        var oldContract = await factory.getNFTContract(_type);
        var nft;
        if (oldContract == "0x0000000000000000000000000000000000000000") {
            nft = await deployProxy(KaijuNFT, ["KAIJU " + _type, _type, _type], { deployer });
            await factory.setNFTContract(_type, nft.address);
        }
        else {
            nft = await KaijuNFT.at(oldContract);
        }
        // var ids = [];
        // var counts = [];

        // for(var m =1;m<=maxIds[i];m++){
        //     ids.push(m);
        //     counts.push(maxCount);
        // }

        // await nft.setMaxNFTCounts(ids, counts);
        await nft.grantRouter(KaijuRouter.address);
    }

}