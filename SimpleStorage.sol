//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SimpleStorage {
    //<-HERE THE DEFAULT VALUE OF UINT WILL BE 0->
    uint256 public num1; //Global Variable (Creates a default getter function)

    //<------STRUCTURES AND ARRAYS------>
    struct People {
        uint256 favNumber;
        string name;
    }
    People public p1 = People({favNumber: 21, name: "Sarthak"});
    People public p2 = People({favNumber: 22, name: "Mike"});

    People[] public people; //Empty dynamic array (people)

    //<------------MAPPING------------>
    mapping(string => uint256) public findFavNumber;

    //<------FUNCTIONS------>
    function store(uint256 newNumber) public {
        num1 = newNumber;
        num1 = num1 + 1;
    }

    // GETTER Function is view function
    function retrieve() public view returns (uint256) {
        return num1;
    }

    //pure functions can't read or write in the blockchain
    function add() public pure returns (int256) {
        return 1 + 1;
    }

    //Inputing objects in an array
    function addPerson(uint256 favNumber, string memory name) public {
        people.push(People(favNumber, name));
        findFavNumber[name] = favNumber; //Saving to mapping
    }
}
