pragma solidity ^0.8.0;
import "../interfaces/INFT.sol";
import "./KaijuNFT.sol";
import "../libs/StringsHelper.sol";
import "../libs/RoleDefine.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract KaijuLand is KaijuNFT {
    struct LandAttributes {
        uint256 X;
        uint256 Y;
        uint256 ContinentId;
    }
    using SafeMath for uint256;
    using StringsHelper for uint256;
    using StringsHelper for address;
    mapping(uint256 => LandAttributes) public allLandAttributes;
    event MintLand(
        address _to,
        uint256 _id,
        uint256 _rarity,
        uint256 _x,
        uint256 _y,
        uint256 _continentId
    );

    function mintLands(
        address _account,
        uint256[] memory _typeIds,
        uint256[] memory _rarity,
        uint256[] memory _x,
        uint256[] memory _y,
        uint256 _continentId
    ) external onlyRole(RoleDefine.DEFAULT_ADMIN_ROLE) {
        require(_x.length == _rarity.length, "KaijuLand: INVALID X LENGTH");
        require(_x.length == _y.length, "KaijuLand: INVALID Y LENGTH");
        for (uint256 i = 0; i < _rarity.length; i++) {
            mintLand(
                _account,
                _typeIds[i],
                _rarity[i],
                _x[i],
                _y[i],
                _continentId
            );
        }
    }

    function mintLand(
        address account,
        uint256 _typeId,
        uint256 _rarity,
        uint256 _x,
        uint256 _y,
        uint256 _continentId
    )
        public
        onlyRole(RoleDefine.DEFAULT_ADMIN_ROLE)
        lock
        returns (
            bool openResult,
            string memory message,
            uint256 tokenId
        )
    {
        // require(
        //     totalOfType[_typeId] < maxOfType[_typeId],
        //     string(
        //         abi.encodePacked("THIS TYPE IS OVER LIMIT ", maxOfType[_typeId])
        //     )
        // );

        openResult = true;
        message = string(abi.encodePacked("OPEN NFT SUCCESS"));
        totalOfType[_typeId] = totalOfType[_typeId].add(1);
        tokenId = totalSupply().add(1);
        TokenAttributes memory attributes = TokenAttributes(
            tokenId,
            totalOfType[_typeId],
            _typeId,
            _rarity,
            0
        );
        LandAttributes memory landAttribute = LandAttributes(_x, _y, _continentId);
        allTokenAttributes[tokenId] = attributes;
        allLandAttributes[tokenId] = landAttribute;
        tokensOfType[_typeId].push(tokenId);
        _mint(account, tokenId);
        emit MintLand(account, tokenId, _rarity, _x, _y, _continentId);
    }

    function mintNFT(
        address account,
        uint256 _typeId,
        uint256 _rarity,
        uint256 _quality
    )
        external
        virtual
        override
        restrictRouter
        lock
        returns (
            bool openResult,
            string memory message,
            uint256 tokenId
        )
    {}
}
