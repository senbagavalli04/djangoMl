import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [prediction, setPrediction] = useState('');
  const [move, setMove] = useState('');

  const handleMoveChange = (e) => {
    setMove(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/predict/', { move });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Prediction</h1>
      <form onSubmit={handleSubmit}>
        {/* Repeat for Move 1 to Move 9 */}
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="move-container">
            <label className="move-label">Move {index + 1}:</label>
            <select className="move-select" value={move} onChange={handleMoveChange}>
              <option value="X">X</option>
              <option value="O">O</option>
              <option value="Empty">Empty</option>
            </select>
          </div>
        ))}
        <p><button type="submit" className="predict-button">Predict</button></p>
      </form>
      {prediction && (
        <div className="prediction-container">
          <h2 className="prediction-title">Prediction:</h2>
          <p className="prediction-text">{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
