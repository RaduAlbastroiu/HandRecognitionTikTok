/*
 * Fingertips are:
 * node 4  - Thumb
 * node 8  - Index
 * node 12 - Middle
 * node 16 - Ring
 * node 20 - Little
 */

const thumbnailFinger = 4;
const indexFinger = 8;
const middleFinger = 12;
const ringFinger = 16;
const littleFinger = 20;

/*
 * Finger start points are:
 * node 1  - Thumb
 * node 5  - Index
 * node 9  - Middle
 * node 13 - Ring
 * node 17 - Little
 */

const thumbnailStartFinger = 1;
const indexStartFinger = 5;
const middleStartFinger = 9;
const ringStartFinger = 13;
const littleStartFinger = 17;

/*
 * This function should transform from the 63 data points
 * for a single snapshot represented by the x, y, z for
 * each hand point to a better format for machine learning
 * represented by the distance between fingertips of adiacent
 * fingers and the position of a finger up or down which
 * results in only 14 data points (features)
 */

export function handKeyPointsConverter(handKeyPointsData) {
  let convertedFeatures = [];

  handKeyPointsData.forEach((dataRow) => {
    let convertedRow = [];

    // distance
    let fingerTipPoints = getFingerTipPoints(dataRow);

    convertedRow.push(
      getDistance(fingerTipPoints[0], fingerTipPoints[1], true)
    );
    convertedRow.push(
      getDistance(fingerTipPoints[1], fingerTipPoints[2], true)
    );
    convertedRow.push(
      getDistance(fingerTipPoints[2], fingerTipPoints[3], true)
    );
    convertedRow.push(
      getDistance(fingerTipPoints[3], fingerTipPoints[4], true)
    );

    // up
    let fingersUp = getFingersUp(dataRow);
    convertedRow.push(fingersUp);

    // down
    // if a finger is not up then it's down
    //let fingersDown = fingersUp.map((val) => !val);
    //convertedRow.push(fingersDown);

    convertedFeatures.push(convertedRow);
  });

  return convertedFeatures;
}

// the 14 features names
export function getColNamesConverted() {
  return [
    'D1-2',
    'D2-3',
    'D3-4',
    'D4-5',
    'Up1', // thumbnail
    'Up2',
    'Up3',
    'Up4',
    'Up5',
    //'Down1', // thumbnail
    //'Down2',
    //'Down3',
    //'Down4',
    //'Down5',
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

function getDistance(point1, point2, includeZ) {
  let dist =
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2);

  if (includeZ) {
    dist += Math.pow(point2.z - point1.z, 2);
  }

  return Math.sqrt(dist);
}

export function getFingersUp(dataRow) {
  // y of the thumbnail < y of the palm
  let thumbnailUp = dataRow[thumbnailFinger * 3 + 1] < dataRow[1];

  // if the distance between finger tip and finger start is
  // smaller than 50% the palm length, the finger is down
  let palmPoint = { x: dataRow[0], y: dataRow[1], z: dataRow[2] };
  let fingerStartPoints = getFingerStartPoints(dataRow);
  let fingerTipPoints = getFingerTipPoints(dataRow);

  // compare only xoy
  let indexUp =
    getDistance(palmPoint, fingerStartPoints[1], false) / 2 <
    getDistance(fingerStartPoints[1], fingerTipPoints[1], false);

  /*
  console.log('Dist palm to finger start');
  console.log(getDistance(palmPoint, fingerStartPoints[1], false));
  console.log('Dist finger start to finger end');
  console.log(getDistance(fingerStartPoints[1], fingerTipPoints[1], false));
*/

  let middleUp =
    getDistance(palmPoint, fingerStartPoints[2], false) / 2 <
    getDistance(fingerStartPoints[2], fingerTipPoints[2], false);

  let ringUp =
    getDistance(palmPoint, fingerStartPoints[3], false) / 2 <
    getDistance(fingerStartPoints[3], fingerTipPoints[3], false);

  let littleUp =
    getDistance(palmPoint, fingerStartPoints[4], false) / 2 <
    getDistance(fingerStartPoints[4], fingerTipPoints[4], false);

  return [thumbnailUp, indexUp, middleUp, ringUp, littleUp];
}

function getFingerTipPoints(dataRow) {
  return getPoints(dataRow, [
    thumbnailFinger,
    indexFinger,
    middleFinger,
    ringFinger,
    littleFinger,
  ]);
}

function getFingerStartPoints(dataRow) {
  return getPoints(dataRow, [
    thumbnailStartFinger,
    indexStartFinger,
    middleStartFinger,
    ringStartFinger,
    littleStartFinger,
  ]);
}

function getPoints(dataRow, fingerPoints) {
  let points = [];

  fingerPoints.forEach((point) => {
    points.push({
      x: dataRow[point * 3],
      y: dataRow[point * 3 + 1],
      z: dataRow[point * 3 + 2],
    });
  });

  return points;
}
