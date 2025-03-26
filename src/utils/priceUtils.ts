
// Current prices (mock data)
export const currentPrices = {
  BTC: 39284.52,
  ETH: 2326.78,
  DOG: 0.1352,
  USDT: 1.00,
  BNB: 284.37,
  ADA: 0.51,
};

// Get current price for any crypto symbol
export const getCurrentPrice = (symbol: string): number => {
  const uppercaseSymbol = symbol.toUpperCase();
  return currentPrices[uppercaseSymbol as keyof typeof currentPrices] || 0;
};

// Calculate conversion rate between two currencies
export const getConversionRate = (fromSymbol: string, toSymbol: string): number => {
  const fromPrice = getCurrentPrice(fromSymbol);
  const toPrice = getCurrentPrice(toSymbol);
  
  if (!fromPrice || !toPrice) return 0;
  
  return fromPrice / toPrice;
};

// Calculate conversion amount with option for bonus rate
export const calculateConversion = (
  amount: number, 
  fromSymbol: string, 
  toSymbol: string, 
  bonusRate: number = 1
): number => {
  const conversionRate = getConversionRate(fromSymbol, toSymbol);
  return amount * conversionRate * bonusRate;
};

// Format currency based on amount
export const formatCurrency = (amount: number, symbol?: string): string => {
  if (amount >= 1e9) {
    return `${symbol ? symbol : '$'}${(amount / 1e9).toFixed(2)}B`;
  }
  if (amount >= 1e6) {
    return `${symbol ? symbol : '$'}${(amount / 1e6).toFixed(2)}M`;
  }
  if (amount < 0.001) {
    return `${symbol ? symbol : '$'}${amount.toExponential(2)}`;
  }
  if (amount < 1) {
    return `${symbol ? symbol : '$'}${amount.toFixed(6)}`;
  }
  return `${symbol ? symbol : '$'}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Generate random price change within a range
export const generatePriceChange = (basePrice: number, volatilityPercentage: number): number => {
  const changePercentage = (Math.random() - 0.5) * volatilityPercentage;
  return basePrice * (1 + changePercentage / 100);
};

// Mock trading fee calculation
export const calculateTradingFee = (amount: number, feePercentage: number = 0.25): number => {
  return amount * (feePercentage / 100);
};

// Calculate if a trade is profitable based on entry and current price
export const isProfitable = (entryPrice: number, currentPrice: number, isBuyPosition: boolean): boolean => {
  if (isBuyPosition) {
    return currentPrice > entryPrice;
  } else {
    return currentPrice < entryPrice;
  }
};

// Calculate profit/loss percentage
export const calculateProfitLossPercentage = (
  entryPrice: number, 
  currentPrice: number, 
  isBuyPosition: boolean
): number => {
  if (isBuyPosition) {
    return ((currentPrice - entryPrice) / entryPrice) * 100;
  } else {
    return ((entryPrice - currentPrice) / entryPrice) * 100;
  }
};
