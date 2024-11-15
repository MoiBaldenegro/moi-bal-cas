import React, { useState } from 'react';
import { DollarSign, Coins, RotateCcw, Play } from 'lucide-react';
import SlotGrid from './components/SlotGrid';
import WinningLines from './components/WinningLines';
import WinningLineOverlay from './components/WinningLineOverlay';
import { checkWinningLines, WinningLine } from './utils/gameLogic';
import { formatCurrency } from './utils/currency';

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN');
  const [isSpinning, setIsSpinning] = useState(false);
  const [bet, setBet] = useState(10);
  const [grid, setGrid] = useState<string[][]>(Array(3).fill(Array(5).fill('?')));
  const [finalGrid, setFinalGrid] = useState<string[][]>(Array(3).fill(Array(5).fill('?')));
  const [winnings, setWinnings] = useState(0);
  const [showInitial, setShowInitial] = useState(true);
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);

  const exchangeRate = 17.5;

  const handleCurrencySwitch = () => {
    if (currency === 'MXN') {
      setBalance(+(balance / exchangeRate).toFixed(2));
      setBet(+(bet / exchangeRate).toFixed(2));
      setCurrency('USD');
    } else {
      setBalance(+(balance * exchangeRate).toFixed(2));
      setBet(+(bet * exchangeRate).toFixed(2));
      setCurrency('MXN');
    }
  };

  const handleInitialDeposit = (amount: number) => {
    setBalance(amount);
    setShowInitial(false);
  };

  const spin = () => {
    if (balance < bet) return;
    setIsSpinning(true);
    setBalance(prev => prev - bet);
    setWinnings(0);
    setWinningLines([]);

    const cards = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'JOKER'];
    const newGrid = Array(3).fill(0).map(() => 
      Array(5).fill(0).map(() => cards[Math.floor(Math.random() * cards.length)])
    );
    
    setFinalGrid(newGrid);
    
    setTimeout(() => {
      setGrid(newGrid);
      const { totalWin, winningLines } = checkWinningLines(newGrid, bet);
      setWinnings(totalWin);
      setWinningLines(winningLines);
      setBalance(prev => prev + totalWin);
      setIsSpinning(false);
    }, 4000);
  };

  if (showInitial) {
    return (
      <div className="min-h-screen bg-purple-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome to Card Slots</h2>
          <div className="space-y-4">
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              placeholder={`Initial deposit (${currency})`}
              onChange={(e) => handleInitialDeposit(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCurrencySwitch}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {currency === 'MXN' ? <Coins size={20} /> : <DollarSign size={20} />}
                <span>{currency}</span>
              </button>
              <div className="text-xl font-bold">
                {formatCurrency(balance, currency)}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg"
                min={1}
                max={balance}
              />
              <button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-bold ${
                  isSpinning || balance < bet ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSpinning ? <RotateCcw className="animate-spin" /> : <Play />}
                <span>SPIN</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <SlotGrid grid={grid} isSpinning={isSpinning} finalGrid={finalGrid} />
            {winningLines.length > 0 && (
              <WinningLineOverlay winningLines={winningLines} currency={currency} />
            )}
          </div>
          
          {winnings > 0 && (
            <div className="mt-4 text-center text-2xl font-bold text-green-600">
              Won: {formatCurrency(winnings, currency)}!
            </div>
          )}

          <WinningLines />
        </div>
      </div>
    </div>
  );
}

export default App;