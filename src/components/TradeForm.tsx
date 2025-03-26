
import React, { useState, useEffect } from 'react';
import { ArrowDown, AlertCircle, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

const TradeForm = () => {
  const [formData, setFormData] = useState({
    fromAmount: '',
    toAmount: '',
    fromCurrency: 'USDT',
    toCurrency: 'DOG',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dogRate, setDogRate] = useState(0.1352);
  const bonusRate = 1.15; // 15% bonus
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price changes
      const change = (Math.random() - 0.5) * 0.001;
      setDogRate((prev) => parseFloat((prev + change).toFixed(6)));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        fromAmount: value,
        toAmount: value ? calculateToAmount(parseFloat(value)) : '',
      });
    }
  };
  
  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        toAmount: value,
        fromAmount: value ? calculateFromAmount(parseFloat(value)) : '',
      });
    }
  };
  
  const calculateToAmount = (fromAmount: number) => {
    // USDT to DOG with 15% bonus
    return ((fromAmount / dogRate) * bonusRate).toFixed(6);
  };
  
  const calculateFromAmount = (toAmount: number) => {
    // DOG to USDT
    return ((toAmount * dogRate) / bonusRate).toFixed(6);
  };
  
  const swapCurrencies = () => {
    setFormData({
      fromAmount: formData.toAmount,
      toAmount: formData.fromAmount,
      fromCurrency: formData.toCurrency,
      toCurrency: formData.fromCurrency,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fromAmount || parseFloat(formData.fromAmount) <= 0) {
      toast.error('Please enter a valid amount to trade');
      return;
    }
    
    setLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      toast.success('Trade completed successfully!', {
        description: `Converted ${formData.fromAmount} ${formData.fromCurrency} to ${formData.toAmount} ${formData.toCurrency}`,
      });
      
      // Reset form after showing success state
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          ...formData,
          fromAmount: '',
          toAmount: '',
        });
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md bg-white dark:bg-trader-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-trader-gray border-opacity-20 dark:border-opacity-20 animate-scale">
      <h2 className="text-xl font-bold mb-6 text-center text-trader-black dark:text-white">
        Convert USDT to DOG
      </h2>
      
      <div className="mb-4 bg-trader-gray dark:bg-trader-darkGray bg-opacity-30 dark:bg-opacity-30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
            <span className="text-white font-bold text-xs">+</span>
          </div>
          <span className="text-sm font-medium text-trader-blue">15% Bonus on all USDT to DOG trades!</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* From Currency Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-trader-darkGray dark:text-trader-gray mb-2">
            From
          </label>
          <div className="flex items-center bg-trader-gray dark:bg-trader-darkGray bg-opacity-20 dark:bg-opacity-20 rounded-lg p-3">
            <input
              type="text"
              value={formData.fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0.00"
              className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-trader-black dark:text-white"
              disabled={loading || success}
            />
            <div className="flex items-center gap-2 bg-white dark:bg-trader-darkGray dark:bg-opacity-50 px-3 py-1.5 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-trader-blue font-bold text-xs">{formData.fromCurrency.charAt(0)}</span>
              </div>
              <span className="font-medium">{formData.fromCurrency}</span>
            </div>
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center my-2">
          <button
            type="button"
            onClick={swapCurrencies}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-trader-gray dark:bg-trader-darkGray bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-30 dark:hover:bg-opacity-30 transition-colors"
            disabled={loading || success}
          >
            <ArrowDown size={18} className="text-trader-darkGray dark:text-trader-gray" />
          </button>
        </div>
        
        {/* To Currency Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-trader-darkGray dark:text-trader-gray mb-2">
            To
          </label>
          <div className="flex items-center bg-trader-gray dark:bg-trader-darkGray bg-opacity-20 dark:bg-opacity-20 rounded-lg p-3">
            <input
              type="text"
              value={formData.toAmount}
              onChange={handleToAmountChange}
              placeholder="0.00"
              className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-trader-black dark:text-white"
              disabled={loading || success}
            />
            <div className="flex items-center gap-2 bg-white dark:bg-trader-darkGray dark:bg-opacity-50 px-3 py-1.5 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-xs">{formData.toCurrency.charAt(0)}</span>
              </div>
              <span className="font-medium">{formData.toCurrency}</span>
            </div>
          </div>
        </div>
        
        {/* Exchange Rate Info */}
        <div className="flex justify-between items-center mb-6 px-1 text-sm">
          <span className="text-trader-darkGray dark:text-trader-gray">Exchange Rate</span>
          <div className="font-medium">
            <span>1 {formData.fromCurrency} = </span>
            <span className="text-trader-blue">{(1 / dogRate * bonusRate).toFixed(6)} {formData.toCurrency}</span>
            <span className="ml-1 text-trader-green text-xs">(+15%)</span>
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors flex items-center justify-center font-medium button-glow"
          disabled={loading || success || !formData.fromAmount}
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : success ? (
            <div className="flex items-center gap-2">
              <Check size={20} />
              <span>Trade Successful</span>
            </div>
          ) : (
            <span>Trade Now</span>
          )}
        </button>
      </form>
      
      <div className="mt-5 text-xs text-center text-trader-darkGray dark:text-trader-gray">
        <div className="flex items-center justify-center gap-1">
          <AlertCircle size={12} />
          <span>Trading may be subject to market risks.</span>
        </div>
      </div>
    </div>
  );
};

export default TradeForm;
