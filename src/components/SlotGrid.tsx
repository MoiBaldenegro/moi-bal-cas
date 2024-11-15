import React from 'react';
import SlotColumn from './SlotColumn';

interface SlotGridProps {
  grid: string[][];
  isSpinning: boolean;
  finalGrid: string[][];
}

const SlotGrid: React.FC<SlotGridProps> = ({ grid, isSpinning, finalGrid }) => {
  return (
    <div className="flex gap-2 bg-gray-800 p-4 rounded-lg">
      {[0, 1, 2, 3, 4].map((colIndex) => (
        <SlotColumn
          key={colIndex}
          columnIndex={colIndex}
          isSpinning={isSpinning}
          finalColumn={[finalGrid[0][colIndex], finalGrid[1][colIndex], finalGrid[2][colIndex]]}
          currentColumn={[grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]]}
          delay={colIndex * 300} // Each column starts 300ms after the previous one
        />
      ))}
    </div>
  );
};

export default SlotGrid;