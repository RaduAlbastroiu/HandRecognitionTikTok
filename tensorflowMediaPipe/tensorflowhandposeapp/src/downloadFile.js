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
  let content = buildFileContent(colNames, rows);
  downloadFile(content, 'data.csv');
}

export function downloadFile(content, name) {
  const element = document.createElement('a');
  const file = new Blob([content], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
  console.log('Exported file');
}
