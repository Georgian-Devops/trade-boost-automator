
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PriceChart from '../components/PriceChart';
import TradeForm from '../components/TradeForm';
import PriceTracker from '../components/PriceTracker';
import TokenCard from '../components/TokenCard';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-trader-gray dark:from-trader-black dark:to-trader-darkBlue">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center reveal-animation" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-trader-black dark:text-white">
              Convert USDT to DOG with <span className="text-trader-blue">15% Bonus</span>
            </h1>
            <p className="text-xl text-trader-darkGray dark:text-trader-gray mb-8 max-w-2xl mx-auto text-balance">
              Experience the easiest way to trade cryptocurrencies with real-time price monitoring and automated trading features.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors button-glow text-lg font-medium">
                Start Trading
              </button>
              <button className="px-8 py-3 bg-transparent border border-trader-blue text-trader-blue hover:bg-trader-blue hover:bg-opacity-10 rounded-lg transition-colors text-lg font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trade Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 glass-card rounded-2xl p-6 reveal-animation" style={{ animationDelay: '0.2s' }}>
              <PriceChart symbol="DOG/USDT" timeframe={selectedTimeframe} />
            </div>
            
            <div className="lg:w-[400px] flex items-center justify-center reveal-animation" style={{ animationDelay: '0.3s' }}>
              <TradeForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Live Prices Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-10 text-center reveal-animation" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold mb-4 text-trader-black dark:text-white">Live Market Prices</h2>
            <p className="text-trader-darkGray dark:text-trader-gray max-w-2xl mx-auto">
              Get real-time updates on cryptocurrency prices. Our platform monitors the market continuously to provide you with the most accurate data.
            </p>
          </div>
          
          <div className="reveal-animation" style={{ animationDelay: '0.5s' }}>
            <PriceTracker />
          </div>
        </div>
      </section>
      
      {/* Featured Tokens */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10 reveal-animation" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl font-bold text-trader-black dark:text-white">Featured Tokens</h2>
            <a href="#" className="flex items-center text-trader-blue hover:underline">
              <span>View all tokens</span>
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="reveal-animation" style={{ animationDelay: '0.7s' }}>
              <TokenCard 
                symbol="DOG/USDT"
                name="Dogecoin"
                price={0.1352}
                change24h={15.34}
                icon="DOG"
                description="Trade Dogecoin with a 15% bonus! The fun and friendly internet currency has seen a massive surge in popularity."
              />
            </div>
            
            <div className="reveal-animation" style={{ animationDelay: '0.8s' }}>
              <TokenCard 
                symbol="USDT/USD"
                name="Tether"
                price={1.00}
                change24h={0.01}
                icon="USDT"
                description="Tether (USDT) is a stablecoin pegged to the US Dollar, providing a stable entry point to the cryptocurrency market."
              />
            </div>
            
            <div className="reveal-animation" style={{ animationDelay: '0.9s' }}>
              <TokenCard 
                symbol="BTC/USDT"
                name="Bitcoin"
                price={39284.52}
                change24h={2.45}
                icon="BTC"
                description="Bitcoin is the first and most well-known cryptocurrency, offering a decentralized alternative to traditional currencies."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-trader-blue to-trader-lightBlue rounded-2xl p-10 text-center text-white reveal-animation" style={{ animationDelay: '1s' }}>
            <h2 className="text-3xl font-bold mb-4">Ready to start trading?</h2>
            <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are already taking advantage of our 15% bonus on USDT to DOG conversions.
            </p>
            <button className="px-8 py-3 bg-white text-trader-blue hover:bg-opacity-90 rounded-lg transition-colors font-medium">
              Create Free Account
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t border-trader-gray border-opacity-20 dark:border-opacity-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CT</span>
                </div>
                <span className="text-lg font-bold text-trader-black dark:text-white">
                  CrazeTrader
                </span>
              </div>
              <p className="mt-2 text-sm text-trader-darkGray dark:text-trader-gray">
                Converting USDT to DOG with a 15% bonus
              </p>
            </div>
            
            <div className="flex gap-8 text-sm">
              <div className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
                <a href="#">Trade</a>
              </div>
              <div className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
                <a href="#">Market</a>
              </div>
              <div className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
                <a href="#">Portfolio</a>
              </div>
              <div className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
                <a href="#">About</a>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 text-sm text-trader-darkGray dark:text-trader-gray">
              © 2023 CrazeTrader. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
