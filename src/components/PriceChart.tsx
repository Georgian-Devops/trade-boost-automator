
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';

interface PriceChartProps {
  symbol: string;
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y';
}

const PriceChart: React.FC<PriceChartProps> = ({ symbol, timeframe }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
  const [currentPrice, setCurrentPrice] = useState(0);

  // Generate mock data
  useEffect(() => {
    setLoading(true);
    
    const generateData = () => {
      const points = timeframe === '1D' ? 24 : 
                    timeframe === '1W' ? 7 : 
                    timeframe === '1M' ? 30 : 
                    timeframe === '3M' ? 90 : 365;
      
      const basePrice = symbol === 'DOG/USDT' ? 0.1352 : 1;
      const volatility = symbol === 'DOG/USDT' ? 0.03 : 0.005;
      
      const mockData = [];
      let lastPrice = basePrice;
      
      for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * volatility;
        lastPrice = Math.max(0.001, lastPrice + change);
        
        mockData.push({
          time: i,
          price: parseFloat(lastPrice.toFixed(6)),
        });
      }
      
      setCurrentPrice(mockData[mockData.length - 1].price);
      
      const startPrice = mockData[0].price;
      const endPrice = mockData[mockData.length - 1].price;
      const absoluteChange = endPrice - startPrice;
      const percentageChange = (absoluteChange / startPrice) * 100;
      
      setPriceChange({
        value: parseFloat(absoluteChange.toFixed(6)),
        percentage: parseFloat(percentageChange.toFixed(2))
      });
      
      return mockData;
    };
    
    // Simulate API loading
    setTimeout(() => {
      const newData = generateData();
      setData(newData);
      setLoading(false);
    }, 1000);
  }, [symbol, timeframe]);

  const isPositiveChange = priceChange.value >= 0;
  const changeColor = isPositiveChange ? 'text-trader-green' : 'text-trader-red';
  const gradientId = `colorGradient-${symbol.replace('/', '-')}`;

  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-trader-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <div>
          <h3 className="text-xl font-bold text-trader-black dark:text-white">{symbol}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-medium">${currentPrice.toFixed(6)}</span>
            <div className={`flex items-center ${changeColor}`}>
              {isPositiveChange ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="font-medium ml-1">
                {isPositiveChange ? '+' : ''}{priceChange.value.toFixed(6)} ({isPositiveChange ? '+' : ''}{priceChange.percentage}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 bg-trader-gray dark:bg-trader-darkGray bg-opacity-30 dark:bg-opacity-30 rounded-lg p-1">
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map((period) => (
            <button
              key={period}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-white dark:bg-trader-darkBlue text-trader-blue dark:text-white shadow-sm'
                  : 'text-trader-darkGray dark:text-trader-gray hover:bg-white hover:bg-opacity-50 dark:hover:bg-trader-darkGray dark:hover:bg-opacity-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositiveChange ? "#10B981" : "#EF4444"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositiveChange ? "#10B981" : "#EF4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.4} vertical={false} />
            <XAxis 
              dataKey="time" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            />
            <YAxis 
              domain={['dataMin', 'dataMax']} 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(4)}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderColor: '#E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
              labelFormatter={(value) => `Time: ${value}`}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositiveChange ? "#10B981" : "#EF4444"} 
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
