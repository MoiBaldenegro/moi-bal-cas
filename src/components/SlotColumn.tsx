import React, { useState, useEffect } from 'react';
import { getCardColor } from '../utils/gameLogic';

interface SlotColumnProps {
  columnIndex: number;
  isSpinning: boolean;
  finalColumn: string[];
  currentColumn: string[];
  delay: number;
}

const SlotColumn: React.FC<SlotColumnProps> = ({
  columnIndex,
  isSpinning,
  finalColumn,
  currentColumn,
  delay,
}) => {
  const [rollingSequence, setRollingSequence] = useState<string[][]>([]);
  
  useEffect(() => {
    if (isSpinning) {
      const cards = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'JOKER'];
      // Create 30 sets of 3 cards for the rolling effect
      const sequence = Array(30).fill(0).map(() => 
        Array(3).fill(0).map(() => cards[Math.floor(Math.random() * cards.length)])
      );
      // Add the final column state at the end
      sequence.push(finalColumn);
      setRollingSequence(sequence);
    }
  }, [isSpinning, finalColumn]);

  return (
    <div className="flex-1">
      <div className="relative h-[400px] overflow-hidden bg-gray-900 rounded-lg">
        <div
          className={`absolute w-full transition-transform ${
            isSpinning ? 'animate-slot-column' : 'transform translate-y-0'
          }`}
          style={{
            animationDelay: `${delay}ms`,
            animationDuration: '2.5s',
          }}
        >
          {isSpinning ? (
            rollingSequence.map((column, seqIndex) => (
              <div key={seqIndex} className="flex flex-col gap-1 p-1">
                {column.map((card, cardIndex) => (
                  <div
                    key={`${seqIndex}-${cardIndex}`}
                    className="h-[130px] flex items-center justify-center bg-white rounded-lg"
                  >
                    <span className={`text-3xl font-bold ${getCardColor(card)}`}>
                      {card}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-1 p-1">
              {currentColumn.map((card, index) => (
                <div
                  key={index}
                  className="h-[130px] flex items-center justify-center bg-white rounded-lg"
                >
                  <span className={`text-3xl font-bold ${getCardColor(card)}`}>
                    {card}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotColumn;