const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      gas: "6721975",
      network_id: "*",       // Any network (default: none)
  }
},
compilers: {
    solc: {
       version: "0.4.24",
     }
   },
   settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
     }


};
