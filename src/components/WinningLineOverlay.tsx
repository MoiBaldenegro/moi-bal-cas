import React from 'react';
import { WinningLine } from '../utils/gameLogic';
import { formatCurrency } from '../utils/currency';

interface WinningLineOverlayProps {
  winningLines: WinningLine[];
  currency: 'MXN' | 'USD';
}

const WinningLineOverlay: React.FC<WinningLineOverlayProps> = ({ winningLines, currency }) => {
  const colors = {
    'horizontal': 'rgba(255, 0, 0, 0.5)',
    'diagonal': 'rgba(0, 255, 0, 0.5)',
    'v-shape': 'rgba(0, 0, 255, 0.5)',
    'w-shape': 'rgba(255, 165, 0, 0.5)'
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {winningLines.map((line, index) => {
          const points = line.positions.map(([row, col]) => {
            const x = (col * 20 + 10) + '%';
            const y = (row * 33.33 + 16.67) + '%';
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={index} className="animate-pulse">
              <polyline
                points={points}
                fill="none"
                stroke={colors[line.type]}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="50%"
                y={`${(index + 1) * 10}%`}
                textAnchor="middle"
                fill="white"
                className="text-lg font-bold stroke-1 stroke-black"
              >
                {line.type.toUpperCase()} WIN: {formatCurrency(line.win, currency)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WinningLineOverlay;