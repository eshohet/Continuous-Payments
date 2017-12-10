pragma solidity^0.4.2;

contract MyToken {

    mapping (address => uint) public balanceOf;
    string public name;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint value);

    function MyToken(uint initialSupply, string tokenName, uint8 decimalsUnit) {
        balanceOf[msg.sender] = initialSupply;
        name = tokenName;
        decimals = decimalsUnit;
    }

    function transfer(address _to, uint _value) {
        require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[_to] += _value;
        Transfer (msg.sender, _to, _value);
    }
}