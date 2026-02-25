// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Staking is Ownable {
  using SafeERC20 for IERC20;

  IERC20 public stakingToken;
  // Token used for rewards
  IERC20 public rewardToken;

  // Reward rate per second (per token staked, scaled by 1e18)
  uint256 public rewardRate;
  // Last update timestamp
  uint256 public lastUpdateTime;
  // Reward per token stored (accumulated)
  uint256 public rewardPerTokenStored;

  // Total amount staked
  uint256 public totalStaked;
  // Mapping from user address to staked amount
  mapping(address => uint256) public stakedAmount;
  // Mapping from user address to reward debt
  mapping(address => uint256) public rewardDebt;
  // Mapping from user address to earned rewards
  mapping(address => uint256) public earnedRewards;
  // Mapping from user address to staking start time
  mapping(address => uint256) public stakingStartTime;
  // Mapping from user address to lock period end time
  mapping(address => uint256) public lockEndTime;

  // Lock period duration (in seconds)
  uint256 public lockPeriod = 30 days;

  uint256 public earlyWithdrawPenalty = 1000;

  address public penaltyRecipient;

  // Pool info
  struct PoolInfo {
    uint256 rewardRate;
    uint256 totalStaked;
    bool active;
  }
  mapping(uint256 => PoolInfo) public pools;
  uint256 public poolCount;

  // Events
  event Staked(address indexed user, uint256 amount, uint256 poolId);
  event Withdrawn(
    address indexed user,
    uint256 amount,
    uint256 reward,
    uint256 penalty
  );
  event RewardClaimed(address indexed user, uint256 reward);
  event RewardRateUpdated(uint256 oldRate, uint256 newRate, uint256 poolId);
  event EmergencyWithdraw(address indexed user, uint256 amount);
  event LockPeriodUpdated(uint256 oldPeriod, uint256 newPeriod);
  event PenaltyUpdated(uint256 oldPenalty, uint256 newPenalty);
  event PoolCreated(uint256 poolId, uint256 rewardRate);
  event PoolActivated(uint256 poolId);
  event PoolDeactivated(uint256 poolId);

  modifier updateReward(address account) {
    rewardPerTokenStored = rewardPerToken();
    lastUpdateTime = block.timestamp;

    if (account != address(0)) {
      earnedRewards[account] = earned(account);
      rewardDebt[account] = rewardPerTokenStored;
    }
    _;
  }

  constructor(
    address _stakingToken,
    address _rewardToken,
    uint256 _rewardRate,
    address _penaltyRecipient
  ) Ownable(msg.sender) {
    require(
      _stakingToken != address(0),
      'Staking: staking token is zero address'
    );
    require(
      _rewardToken != address(0),
      'Staking: reward token is zero address'
    );

    stakingToken = IERC20(_stakingToken);
    rewardToken = IERC20(_rewardToken);
    rewardRate = _rewardRate;
    lastUpdateTime = block.timestamp;
    penaltyRecipient = _penaltyRecipient;

    // Create default pool
    poolCount = 1;
    pools[1] = PoolInfo({
      rewardRate: _rewardRate,
      totalStaked: 0,
      active: true
    });
  }

  function rewardPerToken() public view returns (uint256) {
    if (totalStaked == 0) {
      return rewardPerTokenStored;
    }
    uint256 time = block.timestamp - lastUpdateTime;
    uint256 rewards = (time * rewardRate * 1e18) / totalStaked;
    return rewardPerTokenStored + rewards;
  }

  function earned(address account) public view returns (uint256) {
    uint256 staked = stakedAmount[account];
    if (staked == 0) {
      return earnedRewards[account];
    }
    uint256 currentRewardPerToken = rewardPerToken();
    uint256 rewardDiff = currentRewardPerToken - rewardDebt[account];
    uint256 newRewards = (staked * rewardDiff) / 1e18;
    return earnedRewards[account] + newRewards;
  }

  function stake(uint256 amount) external updateReward(msg.sender) {
    require(amount > 0, 'Staking: cannot stake 0');
    require(pools[1].active, 'Staking: pool not active');

    // Transfer tokens from user to contract
    stakingToken.safeTransferFrom(msg.sender, address(this), amount);

    // Update staking info
    stakedAmount[msg.sender] += amount;
    totalStaked += amount;
    stakingStartTime[msg.sender] = block.timestamp;
    lockEndTime[msg.sender] = block.timestamp + lockPeriod;
    pools[1].totalStaked += amount;

    emit Staked(msg.sender, amount, 1);
  }

  /**
   * @dev Stake with pool ID (for multiple pools)
   * @param amount Amount of tokens to stake
   * @param poolId Pool ID
   */
  function stakeWithPool(
    uint256 amount,
    uint256 poolId
  ) external updateReward(msg.sender) {
    require(amount > 0, 'Staking: cannot stake 0');
    require(poolId > 0 && poolId <= poolCount, 'Staking: invalid pool');
    require(pools[poolId].active, 'Staking: pool not active');

    // Transfer tokens from user to contract
    stakingToken.safeTransferFrom(msg.sender, address(this), amount);

    // Update staking info
    stakedAmount[msg.sender] += amount;
    totalStaked += amount;
    stakingStartTime[msg.sender] = block.timestamp;
    lockEndTime[msg.sender] = block.timestamp + lockPeriod;
    pools[poolId].totalStaked += amount;

    emit Staked(msg.sender, amount, poolId);
  }

  /**
   * @dev Withdraw staked tokens and claim rewards
   */
  function withdraw() external updateReward(msg.sender) {
    _withdraw(msg.sender);
  }

  /**
   * @dev Internal withdraw function
   */
  function _withdraw(address account) internal {
    uint256 amount = stakedAmount[account];
    require(amount > 0, 'Staking: nothing to withdraw');

    // Calculate earned rewards
    uint256 reward = earned(account);
    uint256 penalty = 0;

    // Check if still in lock period
    if (block.timestamp < lockEndTime[account]) {
      // Apply early withdrawal penalty
      penalty = (amount * earlyWithdrawPenalty) / 10000;
      uint256 withdrawable = amount - penalty;

      // Transfer staked tokens (minus penalty)
      stakingToken.safeTransfer(account, withdrawable);
      if (penalty > 0) {
        stakingToken.safeTransfer(penaltyRecipient, penalty);
      }
    } else {
      // Full withdrawal
      stakingToken.safeTransfer(account, amount);
    }

    // Reset staking info
    stakedAmount[account] = 0;
    totalStaked -= amount;
    earnedRewards[account] = 0;
    rewardDebt[account] = 0;
    stakingStartTime[account] = 0;
    lockEndTime[account] = 0;

    // Transfer rewards if any
    if (reward > 0) {
      rewardToken.safeTransfer(account, reward);
      emit RewardClaimed(account, reward);
    }

    emit Withdrawn(account, amount, reward, penalty);
  }

  /**
   * @dev Claim rewards without withdrawing
   */
  function claimRewards() external updateReward(msg.sender) {
    uint256 reward = earned(msg.sender);
    require(reward > 0, 'Staking: no rewards to claim');

    earnedRewards[msg.sender] = 0;
    rewardToken.safeTransfer(msg.sender, reward);

    emit RewardClaimed(msg.sender, reward);
  }

  /**
   * @dev Emergency withdraw (without rewards, immediately)
   */
  function emergencyWithdraw() external {
    uint256 amount = stakedAmount[msg.sender];
    require(amount > 0, 'Staking: nothing to withdraw');

    // Reset earned rewards (lost)
    earnedRewards[msg.sender] = 0;
    rewardDebt[msg.sender] = 0;

    // Reset staking info
    stakedAmount[msg.sender] = 0;
    totalStaked -= amount;
    stakingStartTime[msg.sender] = 0;
    lockEndTime[msg.sender] = 0;

    // Transfer staked tokens
    stakingToken.safeTransfer(msg.sender, amount);

    emit EmergencyWithdraw(msg.sender, amount);
  }

  /**
   * @dev Update reward rate (only owner)
   * @param newRate New reward rate
   */
  function updateRewardRate(
    uint256 newRate
  ) external onlyOwner updateReward(address(0)) {
    uint256 oldRate = rewardRate;
    rewardRate = newRate;

    // Update pool 1
    pools[1].rewardRate = newRate;

    emit RewardRateUpdated(oldRate, newRate, 1);
  }

  /**
   * @dev Update lock period (only owner)
   * @param newPeriod New lock period in seconds
   */
  function updateLockPeriod(uint256 newPeriod) external onlyOwner {
    require(newPeriod > 0, 'Staking: lock period must be > 0');
    uint256 oldPeriod = lockPeriod;
    lockPeriod = newPeriod;
    emit LockPeriodUpdated(oldPeriod, newPeriod);
  }

  /**
   * @dev Update early withdrawal penalty (only owner)
   * @param newPenalty New penalty in basis points
   */
  function updatePenalty(uint256 newPenalty) external onlyOwner {
    require(newPenalty <= 5000, 'Staking: penalty too high (max 50%)');
    uint256 oldPenalty = earlyWithdrawPenalty;
    earlyWithdrawPenalty = newPenalty;
    emit PenaltyUpdated(oldPenalty, newPenalty);
  }

  /**
   * @dev Create a new staking pool (only owner)
   * @param _rewardRate Reward rate for the new pool
   */
  function createPool(
    uint256 _rewardRate
  ) external onlyOwner returns (uint256) {
    poolCount++;
    pools[poolCount] = PoolInfo({
      rewardRate: _rewardRate,
      totalStaked: 0,
      active: true
    });

    emit PoolCreated(poolCount, _rewardRate);
    return poolCount;
  }

  /**
   * @dev Activate a pool (only owner)
   * @param poolId Pool ID to activate
   */
  function activatePool(uint256 poolId) external onlyOwner {
    require(poolId > 0 && poolId <= poolCount, 'Staking: invalid pool');
    pools[poolId].active = true;
    emit PoolActivated(poolId);
  }

  /**
   * @dev Deactivate a pool (only owner)
   * @param poolId Pool ID to deactivate
   */
  function deactivatePool(uint256 poolId) external onlyOwner {
    require(poolId > 0 && poolId <= poolCount, 'Staking: invalid pool');
    pools[poolId].active = false;
    emit PoolDeactivated(poolId);
  }

  /**
   * @dev Update pool reward rate (only owner)
   * @param poolId Pool ID
   * @param newRate New reward rate
   */
  function updatePoolRewardRate(
    uint256 poolId,
    uint256 newRate
  ) external onlyOwner {
    require(poolId > 0 && poolId <= poolCount, 'Staking: invalid pool');
    uint256 oldRate = pools[poolId].rewardRate;
    pools[poolId].rewardRate = newRate;

    if (poolId == 1) {
      rewardRate = newRate;
    }

    emit RewardRateUpdated(oldRate, newRate, poolId);
  }

  /**
   * @dev Get staking info for an account
   * @param account User address
   */
  function getStakingInfo(
    address account
  )
    external
    view
    returns (
      uint256 staked,
      uint256 earnedReward,
      uint256 stakingStart,
      uint256 lockEnd,
      uint256 lockPeriod_
    )
  {
    staked = stakedAmount[account];
    earnedReward = earned(account);
    stakingStart = stakingStartTime[account];
    lockEnd = lockEndTime[account];
    lockPeriod_ = lockPeriod;
  }

  /**
   * @dev Check if user is in lock period
   * @param account User address
   */
  function isInLockPeriod(address account) external view returns (bool) {
    return block.timestamp < lockEndTime[account];
  }
}
