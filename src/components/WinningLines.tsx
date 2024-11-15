import React from 'react';

const WinningLines: React.FC = () => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Winning Lines</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold">Horizontal Lines (3x)</h4>
          <p>Match 3-5 cards in any row</p>
        </div>
        <div>
          <h4 className="font-bold">Diagonal Lines (2x)</h4>
          <p>Match 3-5 cards diagonally</p>
        </div>
        <div>
          <h4 className="font-bold">V-Shape (4x)</h4>
          <p>Match cards in V pattern</p>
        </div>
        <div>
          <h4 className="font-bold">W-Shape (5x)</h4>
          <p>Match cards in W pattern</p>
        </div>
      </div>
    </div>
  );
};

export default WinningLines;