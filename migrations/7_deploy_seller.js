const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const KaijuRouter = artifacts.require("KaijuRouter");
const PackSeller = artifacts.require("PackSeller");
const Factory = artifacts.require("Factory");
const KaijuFT = artifacts.require("KaijuFT");
module.exports = async function (deployer) {
    // var prices = ["0","0","50000000000000", "100000000000000","150000000000000","200000000000000"]
    var amounts = [0,0, 1600, 1000, 800, 800];

    var prices = ["0","0","172000000000000000", "242000000000000000","382000000000000000","1042000000000000000"]
    // var amounts = [
    //     0,
    //     0, 4000, 2500, 2000, 1500
    // ]
    var startTime = 1630339200;
    
    var router = await KaijuRouter.deployed();

    var factory = await Factory.deployed();
    var kaijuPack = await KaijuFT.at(await factory.getFTContract("PACK"));
    var seller = await deployProxy(PackSeller, [prices, amounts, kaijuPack.address, startTime, KaijuRouter.address], {deployer});
    await seller.setSellerAddress("0x84F9Ed0B417d68dC997bc62A1Ab325f40B2Aa2e2");
    await router.setSellerAddress(PackSeller.address);
    
    // console.log(PackSeller.address);
    for (var i = 0; i < amounts.length; i++) {
        if (amounts[i] > 0) {
            await kaijuPack.mintByOwner(PackSeller.address,i, amounts[i]);
        }
    }
}