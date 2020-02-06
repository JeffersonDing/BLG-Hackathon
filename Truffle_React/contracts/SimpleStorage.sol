pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint _x) public {
    storedData = _x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
