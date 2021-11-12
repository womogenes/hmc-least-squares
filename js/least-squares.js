// The math!
const polyfit = (data, deg) => {
  // data is an array of pairs
  // deg is an integer
  // Fits a polynomial of given degree to the data using least squares regression

  // Compute power sums
  const power = [];
  for (let i = 0; i <= deg * 2; i++) {
    // Compute the ith power sum
    let P_i = 0;
    for (let point of data) {
      P_i += Math.pow(point[0], i);
    }
    power.push(P_i);
  }

  // Fill in the matrix
  const mat = math.zeros(deg + 1, deg + 1);
  for (let row = 0; row <= deg; row++) {
    for (let col = 0; col <= deg; col++) {
      mat.subset(math.index(row, col), power[row + col]);
    }
  }

  // Now find the vector on the right
  const vec = math.zeros(deg + 1);
  for (let i = 0; i <= deg; i++) {
    let sum = 0;
    for (let point of data) {
      sum += Math.pow(point[0], i) * point[1];
    }
    vec.set([i], sum);
  }

  // Now these are the coefficients
  let coefs = math.multiply(math.inv(mat), vec);
  //coefs = math.round(coefs, 15);
  return coefs.toArray();
};

const r_values = (data, poly) => {
  // Calculate Pearson correlation coefficient for given data
  // https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
  // Also calculates general r^2 value

  if (data.length === 0) return 0;

  let x_mean = math.mean(data.map((point) => point[0]));
  let y_mean = math.mean(data.map((point) => point[1]));

  let num = 0;
  for (let point of data) {
    num += (point[0] - x_mean) * (point[1] - y_mean);
  }

  let x_std = 0;
  for (let point of data) {
    x_std += Math.pow(point[0] - x_mean, 2);
  }
  let y_std = 0;
  for (let point of data) {
    y_std += Math.pow(point[1] - y_mean, 2);
  }

  let pearson_r =
    y_std === 0 || x_std === 0 ? 0 : num / Math.sqrt(x_std * y_std);

  let r_squared = y_std === 0 ? 0 : 1 - error(data, poly) / y_std;

  return { pearson_r, r_squared };
};

const evaluate = (poly, x) => {
  // Evaluate a polynomial at given input
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    s += poly[i] * Math.pow(x, i);
  }
  return s;
};

const error = (data, poly) => {
  // Calculate average squared error between polynomial and data
  if (data.length === 0) return 0;

  let totalError = 0;
  for (let point of data) {
    totalError += Math.pow(evaluate(poly, point[0]) - point[1], 2);
  }
  return totalError;
};
