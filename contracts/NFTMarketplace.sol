//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//Security Package to avoid continuous request of buying and selling
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;

    // auto-increment field for
    //  Item Id and No. of Items Transferred
    Counters.Counter private _certIds;
    Counters.Counter private _programIds;
    Counters.Counter private _professionalIds;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    // Data Structure of a Profession
    struct Professional {
        uint256 pid;
        address uid;
        address nftContract;
        uint256 tokenId;
        string name;
        string title;
    }

    // Data Structure of a certificate
    struct Certificate {
        uint256 cid;
        address nftContract;
        uint256 tokenId;
        address uid;
        uint256 pid;
        address publisher;
    }

    // Data Structure of a program
    struct Program {
        uint256 pid;
        address nftContract;
        uint256 tokenId;
        address uid;
        string title;
        string category;
        string year;
    }

    // Mapping the Certificates with respect to their IDs.
    mapping(uint256 => Certificate) private certificateList;

    // Mapping the Programs with respect to their IDs.
    mapping(uint256 => Program) private programList;

    mapping(uint256 => Professional) private professionalList;

    event CertificateItemCreated(
        uint256 indexed cid,
        address indexed nftContract,
        uint256 indexed tokenId,
        address uid,
        uint256 pid,
        address publisher
    );

    event ProgramItemCreated(
        uint256 indexed pid,
        address indexed nftContract,
        uint256 indexed tokenId,
        address uid,
        string title,
        string category,
        string year
    );

    event ProfessionalItemCreated(
        uint256 indexed pid,
        address uid,
        address indexed nftContract,
        uint256 indexed tokenId,
        string name,
        string title
    );

    constructor() {
      owner = payable(msg.sender);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

     /// @notice Function for Creating a Professional, on the Platform
    /// @param nftContract: NFT contract address
    /// @param tokenId: Token Id of the contract.
    function createProfessional(address nftContract, uint256 tokenId, string memory _name, string memory _title)
        public
        nonReentrant
    {
        
        _professionalIds.increment();
        uint256 pid = _professionalIds.current();

        professionalList[pid] = Professional(
            pid,
            msg.sender,
            nftContract,
            tokenId,
            _name,
            _title
        );

        // Triggering the ProfessionalItemCreated event
        emit ProfessionalItemCreated(pid, msg.sender, nftContract, tokenId, _name, _title);
    }


    /// @notice Returns programs
    function fetchProfessionals() public view returns (Professional[] memory) {
        uint256 totalItemCount = _professionalIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            itemCount += 1;
        }

        Professional[] memory items = new Professional[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            uint256 currentId = professionalList[i + 1].pid;
            Professional storage currentItem = professionalList[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }


     /// @notice Function for Creating a Progra, on the Platform
    /// @param nftContract: NFT contract address
    /// @param tokenId: Token Id of the contract.
    function createProgram(address nftContract, uint256 tokenId, string memory _title, string memory _category, string memory _year )
        public
        nonReentrant
    {
        
        _programIds.increment();
        uint256 pid = _programIds.current();

        programList[pid] = Program(
            pid,
            nftContract,
            tokenId,
            msg.sender,
            _title,
            _category,
            _year
        );

        // Triggering the ProgramItemCreated event
        emit ProgramItemCreated(pid, nftContract, tokenId, msg.sender, _title, _category, _year);
    }


    /// @notice Returns programs
    function fetchPrograms() public view returns (Program[] memory) {
        uint256 totalItemCount = _programIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            itemCount += 1;
        }

        Program[] memory items = new Program[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            uint256 currentId = programList[i + 1].pid;
            Program storage currentItem = programList[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    /// @notice Function for Creating a certificate on the Platform
    /// @param nftContract: NFT contract address
    /// @param tokenId: Token Id of the contract.
    function createCertificate(address nftContract, address student_address, uint256 _programId, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _certIds.increment();
        uint256 cid = _certIds.current();

        certificateList[cid] = Certificate(
            cid,
            nftContract,
            tokenId,
            student_address,
            _programId,
            msg.sender
        );

        // Transferring the NFT contract from the Publisher to the Student Address
        IERC721(nftContract).transferFrom(msg.sender, student_address, tokenId);

        // Triggering the CertificateItemCreated event
        emit CertificateItemCreated(
            cid,
            nftContract,
            tokenId,
            student_address,
            _programId,
            msg.sender
        );
    }


    /// @notice Returns certificates of the user
    function fetchProfessionalCertificates(address _student_address) public view returns (Certificate[] memory) {
        uint256 totalItemCount = _certIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateList[i + 1].uid == _student_address) {
                itemCount += 1;
            }
        }

        Certificate[] memory items = new Certificate[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateList[i + 1].uid == _student_address) {
                uint256 currentId = certificateList[i + 1].cid;
                Certificate storage currentItem = certificateList[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice Returns certificates of the program
    function fetchProgramCertificates(uint256 _programId) public view returns (Certificate[] memory) {
        uint256 totalItemCount = _certIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateList[i + 1].pid == _programId) {
                itemCount += 1;
            }
        }

        Certificate[] memory items = new Certificate[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateList[i + 1].pid == _programId) {
                uint256 currentId = certificateList[i + 1].cid;
                Certificate storage currentItem = certificateList[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
