
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TokenCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  description: string;
}

const TokenCard: React.FC<TokenCardProps> = ({ symbol, name, price, change24h, icon, description }) => {
  const isPositive = change24h >= 0;

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover-scale transition-all">
      <div className="flex flex-col h-full">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${icon === 'DOG' ? '#C2A633' : '#26A17B'}20, ${icon === 'DOG' ? '#C2A633' : '#26A17B'}40)` 
                }}
              >
                <span 
                  className="text-xl font-bold"
                  style={{ color: icon === 'DOG' ? '#C2A633' : '#26A17B' }}
                >
                  {icon}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-trader-black dark:text-white">{name}</h3>
                <span className="text-sm text-trader-darkGray dark:text-trader-gray">{symbol}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
              isPositive ? 'bg-green-100 text-trader-green' : 'bg-red-100 text-trader-red'
            }`}>
              {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-trader-darkGray dark:text-trader-gray text-sm">Current Price</span>
            <span className="text-xl font-bold text-trader-black dark:text-white">
              ${price < 1 ? price.toFixed(6) : price.toLocaleString()}
            </span>
          </div>
          
          <p className="text-sm text-trader-darkGray dark:text-trader-gray mb-4">
            {description}
          </p>
        </div>
        
        <div className="mt-auto p-4 pt-2 border-t border-trader-gray border-opacity-10 dark:border-opacity-10">
          <button className="w-full py-2.5 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors button-glow">
            Trade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
