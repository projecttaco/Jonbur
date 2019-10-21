const Jonbur = artifacts.require("Jonbur");

contract("Jonbur", accounts => {
  it("should put coin into contract.", async () => {
    const jonburInstance = await Jonbur.deployed();

    //0.01eth
    const bal = 1000000000000000000;

    // Deposit eth
    await jonburInstance.deposit(1500000000, "this is jonbur", { from: accounts[0], value: bal });

    // Get stored value
    const amount = await jonburInstance.getMyAmount.call();

    assert.equal(amount, bal, "The coin was not put.");
  });
});