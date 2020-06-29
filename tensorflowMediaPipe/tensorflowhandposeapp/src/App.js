import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';
import { handDetector } from './handDetector';
import { downloadCsv } from './downloadFile';
import { testSvm } from './svm/testsvm';

import {
  testRandomForest,
  loadRandomForest,
} from './randomforest/randomForest';

function writeCsv() {
  console.log('plm');
  const rows = [
    ['name1', 'city1', 'some other info'],
    ['name2', 'city2', 'more info'],
  ];

  let csvContent = 'data:text/csv;charset=utf-8,';

  rows.forEach(function (rowArray) {
    let row = rowArray.join(',');
    csvContent += row + '\r\n';
  });
}

function App() {
  useEffect(() => {
    console.log('mounted');
    testRandomForest();
    //loadRandomForest();
    //let timerId = setInterval(() => handDetector(true), 250);
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
