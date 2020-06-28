/*
 * This function should transform from the 63 data points
 * for a single snapshot represented by the x, y, z for
 * each hand point to a better format for machine learning
 * represented by the distance between fingertips of adiacent
 * fingers and the position of a finger up or down which
 * results in only 14 data points (features)
 */

export function handKeyPointsConverter(handKeyPointsData) {
  console.log('will do');
}

// the 14 features names
export function getColNamesConverted() {
  return [
    'D1-2',
    'D2-3',
    'D3-4',
    'D4-5',
    'Up1',
    'Up2',
    'Up3',
    'Up4',
    'Up5',
    'Down1',
    'Down2',
    'Down3',
    'Down4',
    'Down5',
  ];
}

export function getColNames63() {
  let colnames = [];
  for (let i = 0; i <= 20; i++) {
    colnames.push(`Key ${i} x`);
    colnames.push(`Key ${i} y`);
    colnames.push(`Key ${i} z`);
  }

  return colnames;
}
