var ContinuousPayment = artifacts.require("./ContinuousPayment.sol");

module.exports = function(deployer) {
  deployer.deploy(ContinuousPayment);
};
