function writeCsvRow(rowValues) {
  let row = '';
  rowValues.forEach((value) => {
    row += value + ',';
  });
  row = row.substring(0, row.length - 1);
  return row + '\n';
}

function buildFileContent(colNames, rows) {
  let fileContent = writeCsvRow(colNames);
  rows.forEach((row) => {
    fileContent += writeCsvRow(row);
  });
  return fileContent;
}

export function downloadCsv(colNames, rows) {
  const element = document.createElement('a');
  const file = new Blob([buildFileContent(colNames, rows)], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'data.csv';
  document.body.appendChild(element);
  element.click();
  console.log('Exported data');
}
