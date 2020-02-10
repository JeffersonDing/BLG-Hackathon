pragma solidity^0.4.24;
contract DiaMonde{
struct Diamondedb{
//mine
uint256 mine_date; //04252020
uint256 raw_weight;//56.00
string mine_loc;
string miner_name;
//sorting
uint256 sort_date;
string sort_factoryloc;
string sort_name;
string sort_cat;
string sort_facility;

//Cutting & Polish
uint256 cut_date;
string cut_factoryloc;
uint256[3] cut_mesurements;//[15,15,15] mm
string cut_name;
string cut_shape;
string cut_grade;
string polish_grade;
//Manufacture
uint256 man_date;
string man_loc;
string comp_name;
string material;
string product;
//Certificate
uint256[3] cer_measurements;
string cer_shape;
uint256 cer_weight;
string cer_polish_grade;
string cer_cut_grade;
string process_hash;

}
mapping(bytes32 => Diamondedb)diamonds;

function mine(uint256 _mine_date,uint _raw_weight,string _mine_loc,string _miner_name)external returns(bytes32){
bytes32 hash = sha256(_miner_name,_mine_loc,_mine_date,_raw_weight);
diamonds[hash] = Diamondedb(0,0,'','',0,'','','','',0,'',[uint256(0),uint256(0),uint256(0)],'','','','',0,'','','','',[uint256(0),uint256(0),uint256(0)],'',0,'','','');
diamonds[hash].mine_date=_mine_date;
diamonds[hash].raw_weight=_raw_weight;
diamonds[hash].mine_loc=_mine_loc;
diamonds[hash].miner_name=_miner_name;
return (hash);
}
function sort(bytes32 _hash,uint256 _sort_date,string _sort_factoryloc,string _sort_name,string _sort_cat)external {
Diamondedb memory u = diamonds[_hash];
u.sort_date=_sort_date;
u.sort_factoryloc=_sort_factoryloc;
u.sort_name=_sort_name;
u.sort_cat=_sort_cat;
u.sort_facility=_sort_cat;
store(u,_hash);
}
function cut(bytes32 _hash,uint256 _cut_date,string _cut_factoryloc,string _cut_name,string _cut_shape,string _cut_grade,string _polish_grade,uint256[3] _cut_mesurements)external {
Diamondedb memory u = diamonds[_hash];
u.cut_date=_cut_date;
u.cut_factoryloc=_cut_factoryloc;
u.sort_name=_cut_name;
u.cut_shape=_cut_shape;
u.cut_grade=_cut_grade;
u.polish_grade=_polish_grade;
u.cut_mesurements=_cut_mesurements;
store(u,_hash);
}
function manufacture(bytes32 _hash,uint256 _man_date,string _man_loc,string _comp_name,string _material,string _product)external {
Diamondedb memory u = diamonds[_hash];
u.man_date=_man_date;
u.man_loc=_man_loc;
u.comp_name=_comp_name;
u.material=_material;
u.product=_product;
store(u,_hash);
}
function certificate(bytes32 _hash, uint256[3] _cer_measurements,uint256 _cer_weight,  string _cer_polish_grade, string _cer_cut_grade, string _process_hash)external {
Diamondedb memory u =diamonds[_hash];
u.cer_measurements=_cer_measurements;
u.cer_weight=_cer_weight;
u.cer_polish_grade=_cer_polish_grade;
u.cer_cut_grade=_cer_cut_grade;
u.process_hash=_process_hash;
store(u,_hash);
}
function store(Diamondedb _x,bytes32 _hash)private{
    diamonds[_hash]=_x;
}

}
