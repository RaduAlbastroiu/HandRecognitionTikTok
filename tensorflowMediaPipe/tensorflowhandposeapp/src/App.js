import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';
import { handDetector } from './handDetector';
import { downloadCsv } from './downloadFile';
import { testSvm } from './svm/testsvm';

import {
  testRandomForest,
  loadRandomForest,
} from './randomforest/randomForest';

function App() {
  let [handGesture, setHandGesture] = React.useState('None');

  useEffect(() => {
    console.log('mounted');
    //testRandomForest();
    //loadRandomForest();
    let timerId = setInterval(async () => {
      handGesture = await handDetector(false);
      console.log(handGesture);

      // keep most recent hand gesture
      if (handGesture) {
        setHandGesture(handGesture);
      }
    }, 500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{handGesture}</h1>
        <CameraFeed></CameraFeed>
      </header>
    </div>
  );
}

export default App;
