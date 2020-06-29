let svm = require('./libsvm');

let SVM = new svm.SVM();

const options = {
  kernel: 'rbf',
  rbfsigma: 0.5,
};

export function testSvm() {
  SVM.train(
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    [0, 1, 1, 0, 2, 3, 3, 2],
    options
  );

  console.log('TEST SVM');
  console.log(SVM.predict([[0, 0, 0]]));
  console.log(SVM.predict([[0, 1, 0]]));
  console.log(SVM.predict([[1, 0, 0]]));
  console.log(SVM.predict([[1, 1, 0]]));
  console.log(SVM.predict([[0, 0, 1]]));
  console.log(SVM.predict([[0, 1, 1]]));
  console.log(SVM.predict([[1, 0, 1]]));
  console.log(SVM.predict([[1, 1, 1]]));
}
