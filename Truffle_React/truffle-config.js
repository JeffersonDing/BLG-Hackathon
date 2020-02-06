const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/build/contracts"),
  networks: {
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
       version: "0.4.24",
    }
  }
};
