require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = '0x39bb4345b618a3f22be9ec19cd3eb42462d2105cc499fa2a32af1ac2fc3a486f';
const infuraId = '';

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rinkeby.infura.io/v3/5c0c38b8c82446f295d37e6861afde13",
      accounts: [privateKey]
    },    
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
    
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};