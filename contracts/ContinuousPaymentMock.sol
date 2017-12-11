pragma solidity ^0.4.15;

import "./ContinuousPayment.sol";

contract ContinuousPaymentMock is ContinuousPayment{

    uint time;

    function ContinuousPaymentMock(uint _weiPerSecond) ContinuousPayment(_weiPerSecond) {

    }

    function getTime() constant returns(uint) {
        return time;
    }

    function setTime(uint _time) {
        time = _time;
    }
}