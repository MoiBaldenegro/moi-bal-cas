import React, { useState, useEffect } from 'react';
import { getCardColor } from '../utils/gameLogic';

interface CardProps {
  value: string;
  isSpinning: boolean;
  delay: number;
  finalValue: string;
}

const Card: React.FC<CardProps> = ({ value, isSpinning, delay, finalValue }) => {
  const [rollingCards, setRollingCards] = useState<string[]>([]);
  
  useEffect(() => {
    if (isSpinning) {
      const cards = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'JOKER'];
      const rolls = Array(20).fill(0).map(() => cards[Math.floor(Math.random() * cards.length)]);
      rolls.push(finalValue); // Add final value at the end
      setRollingCards(rolls);
    }
  }, [isSpinning, finalValue]);

  return (
    <div className="relative h-32 overflow-hidden bg-gray-800 rounded-lg">
      <div
        className={`absolute w-full transition-transform duration-200 ${
          isSpinning ? 'animate-slot-roll' : 'transform translate-y-0'
        }`}
        style={{
          animationDelay: `${delay}ms`,
        }}
      >
        {isSpinning ? (
          rollingCards.map((card, index) => (
            <div
              key={index}
              className="h-32 flex items-center justify-center bg-white m-[1px] rounded-lg"
            >
              <span className={`text-2xl font-bold ${getCardColor(card)}`}>
                {card}
              </span>
            </div>
          ))
        ) : (
          <div className="h-32 flex items-center justify-center bg-white rounded-lg">
            <span className={`text-2xl font-bold ${getCardColor(value)}`}>
              {value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;