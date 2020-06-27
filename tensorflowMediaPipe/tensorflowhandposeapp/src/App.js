import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';

const handpose = require('@tensorflow-models/handpose');
const test_img = require('./test_img.png');
let number = 0;

async function main() {
  const model = await handpose.load();

  console.log('HERE');

  // provide img / video
  const predictions = await model.estimateHands(
    document.querySelector('video')
  );

  if (predictions.length > 0) {
    number++;
    console.log(number);
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;

      // Log hand keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }
  }
}

function App() {
  useEffect(() => {
    console.log('mounted');
    let timerId = setInterval(() => main(), 50);
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
