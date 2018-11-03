const BatchOverFlowToken = artifacts.require("BatchOverFlowToken")
contract('BatchOverFlowToken', function(accounts) {
  describe("init", () => {
    it("should assert true", async () => {
      const token = await BatchOverFlowToken.new()
      assert.isOk(token);
    })
  })

  describe("transfer methods test", () => {
    it("single transfer", async () => {
      const token = await BatchOverFlowToken.new()
      await token.transfer(accounts[1], 100)
      const balance =  await token.balanceOf(accounts[1])
      assert.equal(balance.toNumber(), 100)
    })
    it("batch transfer", async () => {
      const token = await BatchOverFlowToken.new()
      await token.batchTransfer([accounts[1], accounts[2], accounts[3]], 100)
      const balance1 = await token.balanceOf(accounts[1])
      const balance2 = await token.balanceOf(accounts[2])
      const balance3 = await token.balanceOf(accounts[3])
      assert.equal(balance1.toNumber(), 100)
      assert.equal(balance2.toNumber(), 100)
      assert.equal(balance3.toNumber(), 100)
    })
  })
})
