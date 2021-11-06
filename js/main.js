const dataInputEl = $('#data-upload');
const dataInputBtn = $('#data-upload-btn');
const degreeInputEl = $('#degree-input');
const formEl = $('#input-form');

let rawFileData;
let data;
let degree;

dataInputEl.on('change', async (e) => {
  const { files } = e.target;

  if (files.length === 0) {
    $('#data-upload-btn').attr('disabled', true);
    return;
  }

  $('#data-upload-btn').attr('disabled', false);
  rawFileData = await files[0].text();

  // Parse the data
  data = [];
  for (let line of rawFileData.split('\n')) {
    const point = line.split('\t').map((el) => parseFloat(el));
    if (point.length !== 2) break;
    data.push(point);
  }

  // Graph the input
  graphData(data);
});

formEl.on('submit', (e) => {
  e.preventDefault();

  // Make sure stuff is good
  if (!rawFileData) return;
  if (!degreeInputEl.val()) return;

  // Get the degree
  degree = parseInt(degreeInputEl.val());

  // Do some stuff
  const coefs = polyfit(data, degree);
  calculator.setExpression({
    id: 'best-fit-poly',
    latex: polyToString(coefs),
  });
});
