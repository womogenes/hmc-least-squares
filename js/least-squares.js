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
  console.log(mat.toString());

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
  const coefs = math.multiply(math.inv(mat), vec);
  return coefs.toArray();
};
