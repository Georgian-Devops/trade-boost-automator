import React, { useState, useEffect } from 'react';
import { ArrowDown, AlertCircle, Loader2, Check, Copy, ExternalLink, Wallet, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { tronWalletAddress } from '../utils/priceUtils';
import { QRCodeSVG } from 'qrcode.react';

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
  const bonusRate = 1.0299; // 2.99% bonus
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWithdrawalInfo, setShowWithdrawalInfo] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
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
    // USDT to DOG with 2.99% bonus
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
  
  const connectWallet = () => {
    setIsWalletConnected(true);
    toast.success('Wallet connected successfully!');
  };
  
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setShowWithdrawalInfo(false);
    toast.info('Wallet disconnected');
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(tronWalletAddress);
    setIsCopied(true);
    toast.success('Address copied to clipboard!');
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const toggleQrCode = () => {
    setShowQrCode(prev => !prev);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fromAmount || parseFloat(formData.fromAmount) <= 0) {
      toast.error('Please enter a valid amount to trade');
      return;
    }
    
    if (!isWalletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    setLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setShowWithdrawalInfo(true);
      
      toast.success('Trade completed successfully!', {
        description: `${formData.fromAmount} ${formData.fromCurrency} will be automatically deposited to generate ${formData.toAmount} ${formData.toCurrency}`,
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
      
      {!isWalletConnected ? (
        <>
          <div className="mb-4 bg-trader-gray dark:bg-trader-darkGray bg-opacity-30 dark:bg-opacity-30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
                <span className="text-white font-bold text-xs">+</span>
              </div>
              <span className="text-sm font-medium text-trader-blue">2.99% Bonus on all USDT to DOG trades!</span>
            </div>
          </div>
          
          <button 
            onClick={connectWallet}
            className="w-full py-3 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium mb-4"
          >
            <Wallet size={18} />
            <span>Connect Wallet</span>
          </button>
        </>
      ) : (
        <>
          {!showWithdrawalInfo ? (
            <>
              <div className="mb-4 bg-trader-gray dark:bg-trader-darkGray bg-opacity-30 dark:bg-opacity-30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
                    <span className="text-white font-bold text-xs">+</span>
                  </div>
                  <span className="text-sm font-medium text-trader-blue">2.99% Bonus on all USDT to DOG trades!</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
                    <Wallet size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-trader-black dark:text-white">Wallet Connected</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="text-sm text-trader-darkGray dark:text-trader-gray hover:text-trader-blue transition-colors"
                >
                  Disconnect
                </button>
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
                    <span className="ml-1 text-trader-green text-xs">(+2.99%)</span>
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
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
                    <Wallet size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-trader-black dark:text-white">Wallet Connected</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="text-sm text-trader-darkGray dark:text-trader-gray hover:text-trader-blue transition-colors"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="bg-trader-gray dark:bg-trader-darkGray bg-opacity-10 dark:bg-opacity-10 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={16} className="text-trader-green" />
                  <span className="text-sm font-medium text-trader-green">
                    Trade Completed Successfully
                  </span>
                </div>
                
              </div>
              
              <div className="border border-trader-gray border-opacity-20 dark:border-opacity-20 rounded-lg p-4">
                <div className="text-sm text-trader-darkGray dark:text-trader-gray mb-2">
                  Deposit USDT to this address (TRC-20 Network only) to complete your conversion:
                </div>
                
                <div className="bg-trader-gray dark:bg-trader-darkGray bg-opacity-20 dark:bg-opacity-20 rounded-lg p-3 flex items-center justify-between gap-2 break-all">
                  <span className="text-sm font-medium text-trader-black dark:text-white truncate">
                    {tronWalletAddress}
                  </span>
                  <button 
                    onClick={copyAddress}
                    className="shrink-0 text-trader-blue hover:text-trader-darkBlue transition-colors"
                    title="Copy address"
                  >
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-trader-darkGray dark:text-trader-gray">
                    Your {formData.fromAmount} USDT will be automatically converted to {formData.toAmount} DOG with a 2.99% bonus once received.
                  </p>
                  <button
                    onClick={toggleQrCode}
                    className="flex items-center gap-1 text-trader-blue hover:text-trader-darkBlue text-xs transition-colors"
                  >
                    <QrCode size={14} />
                    <span>{showQrCode ? 'Hide QR' : 'Hide QR'}</span>
                  </button>
                </div>
                
                {showQrCode && (
                  <div className="flex flex-col items-center justify-center mt-4 bg-white p-3 rounded-lg">
                    <QRCodeSVG
                      value={tronWalletAddress}
                      size={180}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"H"}
                      includeMargin={false}
                    />
                    <p className="text-xs text-center mt-2 text-trader-darkGray">
                      Scan to deposit {formData.fromAmount} USDT
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-center">
                  <a 
                    href={`https://tronscan.org/#/address/${tronWalletAddress}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-trader-blue hover:text-trader-darkBlue transition-colors flex items-center gap-1"
                  >
                    <span>View on TronScan</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              
              <button
                onClick={() => setShowWithdrawalInfo(false)}
                className="w-full py-3 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium mt-4"
              >
                <span>New Trade</span>
              </button>
            </div>
          )}
        </>
      )}
      
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
