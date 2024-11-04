import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cryptocurrency } from '../types/crypto';

interface Order {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  timeframe: number;
  crypto: Cryptocurrency;
  entryPrice: number;
  exitPrice?: number;
  timestamp: number;
  completed: boolean;
  claimed: boolean;
  profit?: number;
}

interface GameState {
  balance: number;
  orders: Order[];
  lastMiningTime: number;
  canClaim: boolean;
  referralCount: number;
}

interface GameContextType {
  balance: number;
  orders: Order[];
  placeOrder: (type: 'buy' | 'sell', amount: number, timeframe: number, crypto: Cryptocurrency) => void;
  claimOrder: (orderId: string) => void;
  miningTimeLeft: number;
  canClaim: boolean;
  startMining: () => void;
  claimMining: () => void;
  referralCode: string;
  referralCount: number;
  hasActiveTimeframeOrder: (timeframe: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const loadState = (): GameState => {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const state = JSON.parse(savedState);
    return {
      ...state,
      orders: state.orders.map((order: Order) => ({
        ...order,
        crypto: order.crypto
      }))
    };
  }
  return {
    balance: 1000,
    orders: [],
    lastMiningTime: 0,
    canClaim: true,
    referralCount: 2
  };
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);
  const [miningTimeLeft, setMiningTimeLeft] = useState(0);
  const [referralCode] = useState('CRYPTO' + Math.random().toString(36).substr(2, 6));

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.lastMiningTime > 0) {
      const timeElapsed = (Date.now() - state.lastMiningTime) / 1000;
      if (timeElapsed < 10800) { // 3 hours in seconds
        setMiningTimeLeft(10800 - Math.floor(timeElapsed));
      } else if (!state.canClaim) {
        setState(prev => ({ ...prev, canClaim: true }));
      }
    }

    let timer: number;
    if (miningTimeLeft > 0) {
      timer = window.setInterval(() => {
        setMiningTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [miningTimeLeft, state.lastMiningTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setState(currentState => {
        const updatedOrders = currentState.orders.map(order => {
          if (!order.completed && Date.now() >= order.timestamp + order.timeframe * 60 * 1000) {
            const isWin = Math.random() > 0.5;
            const profit = isWin ? order.amount : -order.amount;
            const priceChange = isWin ? 0.1 : -0.1; // 10% price change
            const exitPrice = order.entryPrice * (1 + priceChange);
            
            return {
              ...order,
              completed: true,
              claimed: false,
              exitPrice,
              profit
            };
          }
          return order;
        });

        return {
          ...currentState,
          orders: updatedOrders
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hasActiveTimeframeOrder = (timeframe: number) => {
    return state.orders.some(
      order => !order.completed && order.timeframe === timeframe
    );
  };

  const placeOrder = (type: 'buy' | 'sell', amount: number, timeframe: number, crypto: Cryptocurrency) => {
    if (hasActiveTimeframeOrder(timeframe)) {
      return;
    }

    if (amount <= state.balance) {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        amount,
        timeframe,
        crypto,
        entryPrice: crypto.price,
        timestamp: Date.now(),
        completed: false,
        claimed: false
      };

      setState(prev => ({
        ...prev,
        balance: prev.balance - amount,
        orders: [newOrder, ...prev.orders]
      }));
    }
  };

  const claimOrder = (orderId: string) => {
    setState(prev => {
      const order = prev.orders.find(o => o.id === orderId);
      if (order && order.completed && !order.claimed && order.profit !== undefined) {
        const updatedOrders = prev.orders.map(o => 
          o.id === orderId ? { ...o, claimed: true } : o
        );
        
        // If profit is positive, add amount + profit (double the amount)
        // If profit is negative, amount was already deducted when placing the order
        const balanceChange = order.profit > 0 ? order.amount * 2 : 0;
        
        return {
          ...prev,
          balance: prev.balance + balanceChange,
          orders: updatedOrders
        };
      }
      return prev;
    });
  };

  const startMining = () => {
    setMiningTimeLeft(10800); // 3 hours in seconds
    setState(prev => ({
      ...prev,
      lastMiningTime: Date.now(),
      canClaim: false
    }));
  };

  const claimMining = () => {
    const bonus = 200 * (1 + (state.referralCount * 0.05));
    setState(prev => ({
      ...prev,
      balance: prev.balance + bonus,
      canClaim: false,
      lastMiningTime: Date.now()
    }));
  };

  return (
    <GameContext.Provider value={{
      balance: state.balance,
      orders: state.orders,
      placeOrder,
      claimOrder,
      miningTimeLeft,
      canClaim: state.canClaim,
      startMining,
      claimMining,
      referralCode,
      referralCount: state.referralCount,
      hasActiveTimeframeOrder
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}