import React from 'react';
import './App.css';
import GameBoard from './component/GameBoard';

const App : React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>Pirate Game</p>
      </header>
      <GameBoard />
    </div>
  );
}

export default App;
