pragma solidity^0.4.2;

contract MyToken {

    mapping (address => uint256) public balanceOf;
    string public name;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function MyToken(uint256 initialSupply, string tokenName, uint8 decimalsUnit) {
        balanceOf[msg.sender] = initialSupply;
        name = tokenName;
        decimals = decimalsUnit;
    }

    function transfer(address _to, uint256 _value) {
        require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[_to] += _value;
        Transfer (msg.sender, _to, _value);
    }
}