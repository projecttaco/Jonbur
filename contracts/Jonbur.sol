pragma solidity ^0.5.0;

contract Jonbur{
    struct Hodl{
        uint date;
        string comment;
        uint amount;
        bool spent;
        address hodlOwner;
    }
    
    address public owner;
    uint public hodlIndex;
    mapping(uint => Hodl) hodls;
    mapping(address => uint[]) hodlers;
    
    event HodlerAdded(address _addr, string _comment);
    event HodlerRewarded(address _addr);
    
    constructor() public{
        owner = msg.sender;
        hodlIndex = 0;
    }
    
    function getHodlIndexes() view private returns (uint[] memory){
        return hodlers[msg.sender];
    }
    
    function getHodls() view public returns (uint[] memory, uint[] memory, uint[] memory, bool[] memory){
        uint[] memory indexes = getHodlIndexes();
        uint[] memory hodlDate = new uint[](indexes.length);
        uint[] memory hodlAmount = new uint[](indexes.length);
        bool[] memory hodlSpent = new bool[](indexes.length);
        Hodl memory tempHodl;
        for(uint i = 0; i < indexes.length; i++){
            tempHodl = hodls[indexes[i]];
            hodlDate[i] = tempHodl.date;
            hodlAmount[i] = tempHodl.amount;
            hodlSpent[i] = tempHodl.spent;
        }
        return (indexes, hodlDate, hodlAmount, hodlSpent);
    }
    
    function getComment(uint _index) view public returns (string memory){
        return hodls[_index].comment;
    }
    
    function deposit(uint _date, string memory _comment) public payable {
        hodlers[msg.sender].push(hodlIndex);
        hodls[hodlIndex] = Hodl(_date, _comment, msg.value, false, msg.sender);
        hodlIndex++;
        emit HodlerAdded(msg.sender, _comment);
    }
    
    function withdraw(uint _index) public {
        require(hodls[_index].hodlOwner == msg.sender, "Invalid Jonbur");
        require(hodls[_index].spent == false, "Already Rewarded");
        require(hodls[_index].date <= block.timestamp, "Not yet");
        msg.sender.transfer(hodls[_index].amount);
        emit HodlerRewarded(msg.sender);
        hodls[_index].spent = true;
    }
}
