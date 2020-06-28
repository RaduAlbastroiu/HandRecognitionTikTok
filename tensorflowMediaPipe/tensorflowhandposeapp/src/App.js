import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';
import { handDetector } from './handDetector';

function App() {
  useEffect(() => {
    console.log('mounted');
    let timerId = setInterval(() => handDetector(), 2500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
        <CameraFeed></CameraFeed>
      </header>
    </div>
  );
}

export default App;
