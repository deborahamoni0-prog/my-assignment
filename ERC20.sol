//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.28;

contract ERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;

    uint private _totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        //mint tokens to contract creator

        _mint(msg.sender, initialSupply);
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "transfer to zero address");

        uint256 senderBalance = _balances[from];
        require(senderBalance >= amount, "insufficient funds");
        unchecked {
            _balances[from] = senderBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    function _mint(address _account, uint256 _amount) internal {
        require(_account != address(0), "cannot mint to zero address");

        _totalSupply += _amount;
        _balances[_account] += _amount;

        emit Transfer(address(0), _account, _amount);
    }

    function _burn(uint256 amount) internal {
        require(_balances[msg.sender] >= amount, "");
        require(msg.sender != address(0), "cannot call from address 0");

        _balances[msg.sender] -= amount;
        _totalSupply -= amount;

        emit Transfer(msg.sender, address(0), amount);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= amount, "insufficient allowance");

        _allowances[from][msg.sender] = currentAllowance - amount;

        emit Approval(from, msg.sender, _allowances[from][msg.sender]);
        _transfer(from, to, amount);

        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function mint(address account, uint256 amount) external returns (bool) {
        _mint(msg.sender, amount);
        return true;
    }
}
