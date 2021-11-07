const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {
  keypad: false,
});

const graphData = (data) => {
  // Columns
  const x = data.map((point) => point[0]);
  const y = data.map((point) => point[1]);

  // Insert data
  calculator.setExpression({
    type: 'table',
    id: 'data_table',
    columns: [
      { latex: 'x_1', values: x },
      { latex: 'y_1', color: Desmos.Colors.GREEN, values: y },
    ],
  });

  // Adjust viewport
  let xmin = Math.min(...x);
  let xmax = Math.max(...x);
  let xrange = xmax - xmin;

  let ymin = Math.min(...y);
  let ymax = Math.max(...y);
  let yrange = ymax - ymin;

  let margin;
  if (yrange > xrange) {
    margin = ((yrange - xrange) / 2) * 2;
  } else {
    margin = xrange * 0.2;
  }
  let viewport = {
    xmin: xmin - margin,
    xmax: xmax + margin,
    ymin: ymin - 0.2 * yrange,
    ymax: ymax + 0.2 * yrange,
  };

  const state = calculator.getState();
  Object.assign(state.graph, {
    viewport,
  });
  calculator.setState(state);
  calculator.setDefaultState(state);
};

const polyToString = (coefs) => {
  let str = '';
  for (let i = coefs.length - 1; i >= 0; i--) {
    if (coefs[i] === 0) continue;

    // Scientific notation
    let coefStr = coefs[i].toString();
    if (coefStr.includes('e')) {
      let eIndex = coefStr.indexOf('e');
      let exponent = coefStr.substr(eIndex + 1);
      let mantissa = coefStr.substr(0, eIndex - 1);
      coefStr = `${mantissa}\\cdot10^{${exponent}}\\cdot `;
    }

    str += coefStr;

    if (i === 0) {
    } else if (i === 1) {
      str += 'x';
    } else {
      str += `x^{${i}}`;
    }
    str += '+';
  }
  return str.substr(0, str.length - 1);
};
