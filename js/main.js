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

  // Reserve a spot for best fit polynomial
  /* calculator.setExpression({
    id: 'best_fit_poly',
    latex: ' ',
  }); */

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

  // Make sure there are more data points than degree
  if (!(data.length > degree)) {
    alert(
      'The number of data points must be more than the degree of the polynomial.'
    );
  }

  // Do some stuff
  let coefs = polyfit(data, degree);
  calculator.setExpression({
    id: 'best_fit_poly',
    latex: polyToString(coefs),
    color: Desmos.Colors.BLUE,
    lineWidth: 5,
  });

  // Text stuff
  coefs = math.round(coefs, 3);
  katex.render(polyToString(coefs), document.querySelector('#best-fit-poly'));

  const { pearson_r, r_squared } = r_values(data, coefs);
  katex.render(
    degree === 1 ? pearson_r.toString() : 'N/A',
    document.querySelector('#pearson-r')
  );
  katex.render(r_squared.toString(), document.querySelector('#r2-value'));
});
