/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

const projectID = "2Enco3F0isU6oqRCudsOLWE0i0f";
const privateKey = "28c79b842a827fd27d66806d4662b259be4b23f4d732564c32ff900122bc0637";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
     url: "https://rpc-mumbai.maticvigil.com",
     accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

