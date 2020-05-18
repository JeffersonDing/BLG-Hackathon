pragma solidity >=0.4.22;
contract simpleStorage{
    uint256 private storeData;
    fallback () payable external {}
    receive() external payable {}
    constructor() public payable{}
    function setData(uint256 a) public{
        storeData=a;
    }
     function acceptEther() payable public {  
    storeData = (address(this).balance);  
 }  

    function getData() public view returns(uint256){
        return storeData;
    }
}
contract Factory{
   fallback () payable external{}
   receive() external payable {}
   constructor() public payable{}
 
    simpleStorage mystorage = new simpleStorage();
    
    function withdraw() public {  
    address(mystorage).transfer(address(this).balance); 
    
 }  
function getSimpleStorageBalance() view public returns(uint256) {  
    return address(mystorage).balance;  
 }  

function getMyBalance() view public returns(uint256) {  
    return address(this).balance;  
 }  
}

