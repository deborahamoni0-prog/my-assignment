/**
 * Calculate Ethereum gas fee
 * @param {number} gasUsed - Gas units used (e.g. 21000)
 * @param {number} baseFeeGwei - Base fee in Gwei
 * @param {number} priorityFeeGwei - Priority (tip) fee in Gwei
 * @returns {object} Gas fee in Gwei and ETH
 */
function calculateGasFee(gasUsed, baseFeeGwei, priorityFeeGwei) {
  const totalGasPriceGwei = baseFeeGwei + priorityFeeGwei;
  const totalFeeGwei = gasUsed * totalGasPriceGwei;
  const totalFeeETH = totalFeeGwei / 1e9;

  return {
    gasUsed,
    totalGasPriceGwei,
    totalFeeGwei,
    totalFeeETH
  };
}
const gasFee = calculateGasFee(21000, 20, 2);

console.log(gasFee);
