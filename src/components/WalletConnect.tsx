
import { useState } from 'react';
import { Copy, Wallet, ExternalLink, Check } from 'lucide-react';
import { toast } from 'sonner';
import { tronWalletAddress } from '../utils/priceUtils';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const connectWallet = () => {
    // In a real implementation, this would connect to Phantom or other wallets
    // For now, we'll simulate a connection
    setIsConnected(true);
    toast.success('Wallet connected successfully!');
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
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
  
  return (
    <div className="w-full bg-white dark:bg-trader-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-trader-gray border-opacity-20 dark:border-opacity-20">
      <!--<h3 className="text-lg font-bold mb-3 text-trader-black dark:text-white">Wallet Connection11</h3>-->
      
      {!isConnected ? (
        <button 
          onClick={connectWallet}
          className="w-full py-3 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Wallet size={18} />
          <span>Connect Wallet</span>
        </button>
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
          
          <div className="border border-trader-gray border-opacity-20 dark:border-opacity-20 rounded-lg p-4">
            <div className="text-sm text-trader-darkGray dark:text-trader-gray mb-2">Deposit USDT to this address (TRC-20 Network only):</div>
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
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
