import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';
import { downloadFile } from '../downloadFile';
import alldata from './alldata.csv';

/*
export function testRandomForest() {
  var trainingSet = IrisDataset.getNumbers();
  var predictions = IrisDataset.getClasses().map((elem) =>
    IrisDataset.getDistinctClasses().indexOf(elem)
  );

  var options = {
    seed: 3,
    maxFeatures: 0.8,
    replacement: true,
    nEstimators: 25,
  };

  var classifier = new RFClassifier(options);
  classifier.train(trainingSet, predictions);

  let json = classifier.toJSON();
  console.log(JSON.stringify(json));
  //downloadFile(JSON.stringify(json), 'model.json');

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
*/

export function loadRandomForest() {
  console.log(alldata);
  /*
  var trainingSet = IrisDataset.getNumbers();
  var predictions = IrisDataset.getClasses().map((elem) =>
    IrisDataset.getDistinctClasses().indexOf(elem)
  );

  console.log('FROM LOAD');
  console.log(model);

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
  */
}
