pragma solidity ^0.4.24;


import "./ERC20Basic.sol";

contract BatchOverFlowToken is ERC20Basic {

  constructor() public {
    _mint(msg.sender, 10000);
  }


  /**
   * @dev Transfer to multi address.
   * This method send token to multi users that is same amount either.
   * @param _receivers The receivers address list.
   * @param _value send amount.
   */
  function batchTransfer(address[] _receivers, uint256 _value) public returns (bool) {
    uint cnt = _receivers.length;
    uint256 amount = uint256(cnt).mul(_value);
    require(cnt > 0 && cnt <= 20);
    require(_value > 0 && _balances[msg.sender] >= amount);
    _balances[msg.sender] = _balances[msg.sender].sub(amount);

    for (uint i = 0; i < cnt; i++) {
      _balances[_receivers[i]] = _balances[_receivers[i]].add(_value);
      emit Transfer(msg.sender, _receivers[i], _value);
    }
    return true;
  }
}
