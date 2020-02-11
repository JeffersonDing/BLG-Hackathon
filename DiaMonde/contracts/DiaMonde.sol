pragma solidity^0.4.24;
contract DiaMonde{
struct Diamondedb{
//mine
uint256 mine_date;
uint256 raw_weight;//56.00
string mine_loc;
//Cutting & Polish
string cut_factoryloc;
uint256[3] cut_mesurements;//[15,15,15] mm
string cut_grade;
string polish_grade;
//Manufacture
string man_loc;
string comp_name;
string material;
string product;
//Certificate
uint256[3] cer_measurements;
uint256 cer_weight;
string cer_grade;

}
mapping(bytes32 => Diamondedb)diamonds;

address private minner = 0x7C2C6d9F404bb083a154cc7Da19974668153c85f;//Acc1
address private cutter = 0xaA71B4177E9d00bc15d2E50071d98740cd25Ccf5;//Acc2
address private manufacturer = 0x3e1AbE71Fa0E35EF167544BB51bC3C281BFA89F3;//Acc4
address private certifier = 0x22eF52207C832aB7bBc50dFBcfC1a1C75742Da0F;//Acc5

function isRegistered(bytes32 _hash)external view returns(bool){
  if(diamonds[_hash].mine_date==0){
    return (false);
  }else{
    return (true);
  }
}
function mine(uint256 _mine_date,string _mine_loc,uint256 _raw_weight)external returns(bytes32){
require(msg.sender==minner, "You are not a Minner");
bytes32 hash = sha256(abi.encode(_mine_loc,_mine_date,_raw_weight));
diamonds[hash] = Diamondedb(0,0,'','',[uint256(0),uint256(0),uint256(0)],'','','','','','',[uint256(0),uint256(0),uint256(0)],0,'');
diamonds[hash].mine_date=_mine_date;
diamonds[hash].mine_loc=_mine_loc;
diamonds[hash].raw_weight=_raw_weight;
return (hash);
}
function cut(bytes32 _hash,string _cut_factoryloc,string _cut_grade,string _polish_grade,uint256[3] _cut_mesurements)external {
require(msg.sender==cutter, "You are not registered as a cutting authority");
Diamondedb memory u = diamonds[_hash];
u.cut_factoryloc=_cut_factoryloc;
u.cut_grade=_cut_grade;
u.polish_grade=_polish_grade;
u.cut_mesurements=_cut_mesurements;
store(u,_hash);
}
function manufacture(bytes32 _hash,string _man_loc,string _comp_name,string _material,string _product)external {
require(msg.sender==manufacturer, "You are not registered as a sorting authority");
Diamondedb memory u = diamonds[_hash];
u.man_loc=_man_loc;
u.comp_name=_comp_name;
u.material=_material;
u.product=_product;
store(u,_hash);
}
function certificate(bytes32 _hash, uint256[3] _cer_measurements,uint256 _cer_weight,  string _cer_grade)external {
require(msg.sender==certifier, "You are not registered as a certifing authority");
Diamondedb memory u =diamonds[_hash];
u.cer_measurements=_cer_measurements;
u.cer_weight=_cer_weight;
u.cer_grade=_cer_grade;
store(u,_hash);
}
function store(Diamondedb _x,bytes32 _hash)private{
    diamonds[_hash]=_x;
}

function getmine(bytes32 _hash)external view returns(
uint256 raw_weight,
string mine_loc
){
Diamondedb memory u=diamonds[_hash];
return(
u.raw_weight,
u.mine_loc);
}

function getcut(bytes32 _hash)external view returns(
string cut_factoryloc,
uint256[3] cut_mesurements,
string cut_grade,
string polish_grade
){
  Diamondedb memory u=diamonds[_hash];
  return(
  u.cut_factoryloc,
  u.cut_mesurements,
  u.cut_grade,
  u.polish_grade);
}


function getmanufacture(bytes32 _hash)external view returns(

string man_loc,
string comp_name,
string material,
string product){
  Diamondedb memory u=diamonds[_hash];
  return(
  u.man_loc,
  u.comp_name,
  u.material,
  u.product);
}
function getcer(bytes32 _hash)external view returns(
  uint256[3] cer_measurements,
  uint256 cer_weight,
  string cer_grade

){
  Diamondedb memory u=diamonds[_hash];
  return(
    u.cer_measurements,
    u.cer_weight,
    u.cer_grade
  );
}
}
