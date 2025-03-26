
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  favorite?: boolean;
}

const PriceTracker: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get crypto prices
    const fetchPrices = () => {
      const mockData: CryptoPrice[] = [
        {
          id: 'bitcoin',
          symbol: 'BTC',
          name: 'Bitcoin',
          price: 39284.52,
          change24h: 2.45,
          volume: 28493000000,
          marketCap: 761230000000,
          favorite: true
        },
        {
          id: 'ethereum',
          symbol: 'ETH',
          name: 'Ethereum',
          price: 2326.78,
          change24h: 1.87,
          volume: 14267000000,
          marketCap: 277820000000
        },
        {
          id: 'dogecoin',
          symbol: 'DOG',
          name: 'Dogecoin',
          price: 0.1352,
          change24h: 15.34,
          volume: 2854000000,
          marketCap: 17634000000,
          favorite: true
        },
        {
          id: 'tether',
          symbol: 'USDT',
          name: 'Tether',
          price: 1.00,
          change24h: 0.01,
          volume: 48762000000,
          marketCap: 83450000000
        },
        {
          id: 'bnb',
          symbol: 'BNB',
          name: 'BNB',
          price: 284.37,
          change24h: -0.89,
          volume: 1287000000,
          marketCap: 46298000000
        },
        {
          id: 'cardano',
          symbol: 'ADA',
          name: 'Cardano',
          price: 0.51,
          change24h: -1.25,
          volume: 875000000,
          marketCap: 16750000000
        }
      ];

      return mockData;
    };

    setLoading(true);
    const data = fetchPrices();
    setCryptos(data);
    setLoading(false);

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCryptos(prev => 
        prev.map(crypto => ({
          ...crypto,
          price: parseFloat((crypto.price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(crypto.price < 1 ? 6 : 2)),
          change24h: parseFloat((crypto.change24h + (Math.random() - 0.5) * 0.5).toFixed(2))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (id: string) => {
    setCryptos(prev => 
      prev.map(crypto => 
        crypto.id === id ? { ...crypto, favorite: !crypto.favorite } : crypto
      )
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-trader-gray border-opacity-20 dark:border-opacity-10 bg-white dark:bg-trader-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg shadow-lg animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-trader-gray border-opacity-20 dark:border-opacity-20">
              <th className="px-6 py-4 text-left text-sm font-medium text-trader-darkGray dark:text-trader-gray">Name</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-trader-darkGray dark:text-trader-gray">Price</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-trader-darkGray dark:text-trader-gray">24h Change</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-trader-darkGray dark:text-trader-gray hidden md:table-cell">Volume (24h)</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-trader-darkGray dark:text-trader-gray hidden lg:table-cell">Market Cap</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-trader-darkGray dark:text-trader-gray">Favorite</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr 
                key={crypto.id} 
                className="border-b border-trader-gray border-opacity-10 dark:border-opacity-10 hover:bg-trader-gray hover:bg-opacity-10 dark:hover:bg-trader-darkGray dark:hover:bg-opacity-10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center mr-3" 
                      style={{ backgroundColor: `${crypto.symbol === 'BTC' ? '#F7931A' : crypto.symbol === 'ETH' ? '#627EEA' : crypto.symbol === 'DOG' ? '#C2A633' : crypto.symbol === 'USDT' ? '#26A17B' : crypto.symbol === 'BNB' ? '#F3BA2F' : '#0033AD'}20` }}>
                      <span className="text-sm font-bold" 
                        style={{ color: crypto.symbol === 'BTC' ? '#F7931A' : crypto.symbol === 'ETH' ? '#627EEA' : crypto.symbol === 'DOG' ? '#C2A633' : crypto.symbol === 'USDT' ? '#26A17B' : crypto.symbol === 'BNB' ? '#F3BA2F' : '#0033AD' }}>
                        {crypto.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-trader-black dark:text-white">{crypto.name}</div>
                      <div className="text-sm text-trader-darkGray dark:text-trader-gray">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-trader-black dark:text-white">
                  ${crypto.price < 1 ? crypto.price.toFixed(6) : crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={`flex items-center justify-end ${crypto.change24h >= 0 ? 'text-trader-green' : 'text-trader-red'}`}>
                    {crypto.change24h >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-trader-darkGray dark:text-trader-gray hidden md:table-cell">
                  {formatNumber(crypto.volume)}
                </td>
                <td className="px-6 py-4 text-right text-trader-darkGray dark:text-trader-gray hidden lg:table-cell">
                  {formatNumber(crypto.marketCap)}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleFavorite(crypto.id)}
                    className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-trader-gray dark:bg-trader-darkGray bg-opacity-20 dark:bg-opacity-20 transition-colors hover:bg-opacity-30 dark:hover:bg-opacity-30"
                  >
                    <Star 
                      size={16} 
                      className={crypto.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-trader-darkGray dark:text-trader-gray'} 
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTracker;
