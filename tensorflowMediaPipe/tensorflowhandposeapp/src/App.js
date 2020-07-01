import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';
import { handDetector } from './handDetector';
import { downloadCsv } from './downloadFile';
import { testSvm } from './svm/testsvm';

import {
  testRandomForest,
  loadRandomForest,
} from './randomforest/randomForest';

const handGesturesOrder = [
  'Fist',
  'ThumbsUp',
  'ThumbsDown',
  'Palm',
  'Victory',
  'CrossFingers',
  'OK',
  'Call',
  'Vulcan',
];

const handGesturesOrderEmoji = [
  '👊',
  '👍',
  '👎',
  '🖐',
  '✌',
  '🤞',
  '👌',
  '🤙',
  '🖖',
];

let handGestureProgress = 0;
let firstRun = true;

function App() {
  let [handGesture, setHandGesture] = React.useState('');

  useEffect(() => {
    console.log('mounted');
    //testRandomForest();
    //loadRandomForest();

    let timerId = setInterval(async () => {
      let handGest = await handDetector(false);

      if (firstRun) {
        setHandGesture('Start 👊');
        firstRun = false;
      }
      console.log(handGest);

      // keep most recent hand gesture
      if (handGest && handGest === handGesturesOrder[handGestureProgress]) {
        handGestureProgress += 1;
        if (handGestureProgress < 9) {
          setHandGesture(
            handGesturesOrderEmoji[handGestureProgress - 1] +
              ' ✅ ➡ ' +
              handGesturesOrderEmoji[handGestureProgress]
          );
        } else {
          setHandGesture('🎉🔥💯');
        }
      }
    }, 350);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ marginLeft: 250 }}>{handGesture}</h1>
        <CameraFeed></CameraFeed>
      </header>
    </div>
  );
}

export default App;
