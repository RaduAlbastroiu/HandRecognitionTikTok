/*
 * Fingertips are:
 * node 4  - Thumbnail
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
 * This function should transform from the 63 data points
 * for a single snapshot represented by the x, y, z for
 * each hand point to a better format for machine learning
 * represented by the distance between fingertips of adiacent
 * fingers and the position of a finger up or down which
 * results in only 14 data points (features)
 */

export function handKeyPointsConverter(handKeyPointsData) {
  let convertedFeatures = [
    [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
    [5, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
  ];

  handKeyPointsData.forEach((dataRow) => {
    let convertedRow = [];

    // distance
    let fingerTipPoints = getFingerTipPoints(dataRow);

    convertedRow.push(getDistance(fingerTipPoints[0], fingerTipPoints[1]));
    convertedRow.push(getDistance(fingerTipPoints[1], fingerTipPoints[2]));
    convertedRow.push(getDistance(fingerTipPoints[2], fingerTipPoints[3]));
    convertedRow.push(getDistance(fingerTipPoints[3], fingerTipPoints[4]));

    // up

    // down
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

function getDistance(point1, point2) {
  let dist =
    Math.pow(point2.x - point1.x, 2) +
    Math.pow(point2.y - point1.y, 2) +
    Math.pow(point2.z - point1.z, 2);

  return Math.sqrt(dist);
}

function getFingerTipPoints(dataRow) {
  let pThumbnail = {
    x: dataRow[thumbnailFinger * 3],
    y: dataRow[thumbnailFinger * 3 + 1],
    z: dataRow[thumbnailFinger * 3 + 2],
  };

  let pIndex = {
    x: dataRow[indexFinger * 3],
    y: dataRow[indexFinger * 3 + 1],
    z: dataRow[indexFinger * 3 + 2],
  };

  let pMiddle = {
    x: dataRow[middleFinger * 3],
    y: dataRow[middleFinger * 3 + 1],
    z: dataRow[middleFinger * 3 + 2],
  };

  let pRing = {
    x: dataRow[ringFinger * 3],
    y: dataRow[ringFinger * 3 + 1],
    z: dataRow[ringFinger * 3 + 2],
  };

  let pLittle = {
    x: dataRow[littleFinger * 3],
    y: dataRow[littleFinger * 3 + 1],
    z: dataRow[littleFinger * 3 + 2],
  };

  return [pThumbnail, pIndex, pMiddle, pRing, pLittle];
}

function getFingesUp(dataRow) {}

function getFingerDown(dataRow) {}
