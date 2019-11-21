const fs = require("fs");
const Jonbur = artifacts.require("Jonbur");

module.exports = function(deployer) {
  deployer.deploy(Jonbur).then(() => {
    if (Jonbur._json) {
      fs.writeFile("./deployedABI", JSON.stringify(Jonbur._json.abi), err => {
        if (err) throw err;
        console.log("input abi into file success");
      });

      fs.writeFile("./deployedAddress", Jonbur.address, err => {
        if (err) throw err;
        console.log("input address into file success");
      });
    }
  });
};
