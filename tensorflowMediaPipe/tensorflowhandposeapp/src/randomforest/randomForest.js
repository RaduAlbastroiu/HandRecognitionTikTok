import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';
import { downloadFile } from '../downloadFile';
import alldata from './alldata.json';
import model from './model.json';

const Classes = [
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

export function testRandomForest() {
  var trainingSet = alldata.map((rowData) => rowData.slice(1, 10));
  var predictions = alldata
    .map((rowData) => rowData[0])
    .map((clasifier) => Classes.indexOf(clasifier));

  console.log(trainingSet);
  console.log(predictions);

  var options = {
    seed: 3,
    maxFeatures: 0.8,
    replacement: true,
    nEstimators: 25,
  };

  var classifier = new RFClassifier(options);
  classifier.train(trainingSet, predictions);

  let json = classifier.toJSON();
  //console.log(JSON.stringify(json));
  downloadFile(JSON.stringify(json), 'model.json');

  var result = classifier.predict(trainingSet);

  let matching = 0;
  for (let i = 0; i < predictions.length; i++) {
    console.log(result[i] + ' - ' + predictions[i]);

    if (result[i] === predictions[i]) {
      matching += 1;
    }
  }

  let accuracy = (matching / predictions.length) * 100;
  console.log('Accuracy: ' + accuracy + '% out of ' + predictions.length);
}

export function loadRandomForest() {
  var trainingSet = alldata.map((rowData) => rowData.slice(1, 10));
  var predictions = alldata
    .map((rowData) => rowData[0])
    .map((clasifier) => Classes.indexOf(clasifier));

  console.log(trainingSet);
  console.log(predictions);

  let classifier = RFClassifier.load(model);
  var result = classifier.predict(trainingSet);

  let matching = 0;
  for (let i = 0; i < predictions.length; i++) {
    console.log(result[i] + ' - ' + predictions[i]);

    if (result[i] === predictions[i]) {
      matching += 1;
    }
  }

  let accuracy = (matching / predictions.length) * 100;
  console.log('Accuracy: ' + accuracy + '% out of ' + predictions.length);
}

export function predictRandomForest(data) {
  let classifier = RFClassifier.load(model);
  var result = classifier.predict(data);
  console.log('Hand position: ', Classes[result[0]]);
  return result[0];
}
