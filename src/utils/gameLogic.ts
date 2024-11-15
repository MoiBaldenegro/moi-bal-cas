export const getCardColor = (card: string): string => {
  if (card === 'JOKER') return 'text-purple-600';
  return ['♠️', '♣️'].includes(card) ? 'text-black' : 'text-red-600';
};

const cardValues: { [key: string]: number } = {
  'A': 11,
  'K': 10,
  'Q': 10,
  'J': 10,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  'JOKER': 15
};

export interface WinningLine {
  type: 'horizontal' | 'diagonal' | 'v-shape' | 'w-shape';
  positions: [number, number][];
  multiplier: number;
  win: number;
}

const checkLine = (line: string[]): number => {
  const uniqueCards = new Set(line);
  if (uniqueCards.size === 1) return 5; // Five of a kind
  if (uniqueCards.size === 2 && line.includes('JOKER')) return 4; // Four of a kind with Joker
  if (uniqueCards.size === 2) return 3; // Four of a kind
  if (uniqueCards.size === 3 && line.includes('JOKER')) return 2; // Three of a kind with Joker
  if (uniqueCards.size === 3) return 1; // Three of a kind
  return 0;
};

export const checkWinningLines = (grid: string[][], bet: number): { totalWin: number; winningLines: WinningLine[] } => {
  let totalWin = 0;
  const winningLines: WinningLine[] = [];

  // Horizontal lines
  grid.forEach((row, rowIndex) => {
    const win = checkLine(row);
    if (win > 0) {
      const baseValue = Math.max(...row.map(card => cardValues[card]));
      const lineWin = win * baseValue * bet * 3;
      totalWin += lineWin;
      winningLines.push({
        type: 'horizontal',
        positions: row.map((_, colIndex) => [rowIndex, colIndex] as [number, number]),
        multiplier: 3,
        win: lineWin
      });
    }
  });

  // Diagonal lines
  const diagonalPositions1: [number, number][] = [[0,0], [1,1], [2,2], [1,3], [0,4]];
  const diagonalPositions2: [number, number][] = [[2,0], [1,1], [0,2], [1,3], [2,4]];
  
  const diagonal1 = diagonalPositions1.map(([row, col]) => grid[row][col]);
  const diagonal2 = diagonalPositions2.map(([row, col]) => grid[row][col]);
  
  [
    { line: diagonal1, positions: diagonalPositions1 },
    { line: diagonal2, positions: diagonalPositions2 }
  ].forEach(({ line, positions }) => {
    const win = checkLine(line);
    if (win > 0) {
      const baseValue = Math.max(...line.map(card => cardValues[card]));
      const lineWin = win * baseValue * bet * 2;
      totalWin += lineWin;
      winningLines.push({
        type: 'diagonal',
        positions,
        multiplier: 2,
        win: lineWin
      });
    }
  });

  // V-shape
  const vPositions: [number, number][] = [[0,0], [1,1], [2,2], [1,3], [0,4]];
  const vShape = vPositions.map(([row, col]) => grid[row][col]);
  const vWin = checkLine(vShape);
  if (vWin > 0) {
    const baseValue = Math.max(...vShape.map(card => cardValues[card]));
    const lineWin = vWin * baseValue * bet * 4;
    totalWin += lineWin;
    winningLines.push({
      type: 'v-shape',
      positions: vPositions,
      multiplier: 4,
      win: lineWin
    });
  }

  // W-shape
  const wPositions: [number, number][] = [[0,0], [2,1], [0,2], [2,3], [0,4]];
  const wShape = wPositions.map(([row, col]) => grid[row][col]);
  const wWin = checkLine(wShape);
  if (wWin > 0) {
    const baseValue = Math.max(...wShape.map(card => cardValues[card]));
    const lineWin = wWin * baseValue * bet * 5;
    totalWin += lineWin;
    winningLines.push({
      type: 'w-shape',
      positions: wPositions,
      multiplier: 5,
      win: lineWin
    });
  }

  return { totalWin, winningLines };
};