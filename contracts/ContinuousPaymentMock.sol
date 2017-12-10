pragma solidity ^0.4.15;

import "./ContinuousPayment.sol";

contract ContinuousPaymentMock is ContinuousPayment{

    function ContinuousPaymentMock(uint _weiPerSecond) ContinuousPayment(_weiPerSecond) {

    }

    function setTime(uint _time) {
        time = _time;
    }
}