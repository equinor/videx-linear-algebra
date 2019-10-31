import {
  clamp as clampNum,
  step as stepNum,
  lerp,
} from '@equinor/videx-math';

/**
 * Copy the values of one vector to another without creating a new object.
 * @param {Number[]} source Source vector
 * @param {Number[]} target Target vector
 * @returns {Number[]} Target vector as a copy of source
 *
 * @example
 * // Returns [3, 4]
 * copy([3, 4], [2, 2]);
 */
export function copy(source, target) {
  for (let i = 0; i < source.length; i++) {
    target[i] = source[i];
  }
  return target;
}


/**
 * a + b
 *
 * Component-wise addition of two n-dimensional vectors.
 * Target is used to store the results.
 * @param {Number[]} a Left operand
 * @param {Number[]} b Right operand
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Resulting vector
 *
 * @example
 * // Returns [4, 6]
 * add([1, 2], [3, 4], new Array(2));
 */
export function add(a, b, target) {
  if (!target) target = a;
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] + b[i];
  }
  return target;
}

/**
 * v1 + ... + vM
 *
 * Component-wise addition of M n-dimensional vectors. Target is
 * used to store the results.
 * @param {Number[][]} vectors Array of vectors with length n.
 * @param {Number[]} [target=[vectors]] Target for storing the results (Default: vectors[0])
 * @return {Number[]} Resulting vector
 *
 * @example
 * // Returns [9, 12]
 * addAll([ [1, 2], [3, 4], [5, 6] ], new Array(2));
 */
export function addAll(vectors, target) {
  if (target) copy(vectors[0], target);
  else [target] = vectors;
  for (let m = 1; m < vectors.length; m++) {
    for (let n = 0; n < target.length; n++) {
      target[n] += vectors[m][n];
    }
  }
  return target;
}

/**
 * a - b
 *
 * Component-wise subtraction of two n-dimensional vectors.
 * Target is used to store the results.
 * @param {Number[]} a Left operand
 * @param {Number[]} b Right operand
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Resulting vector
 *
 * @example
 * // Returns [2, 2]
 * sub([4, 3], [2, 1], new Array(2));
 */
export function sub(a, b, target) {
  if (!target) target = a;
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] - b[i];
  }
  return target;
}

/**
 * v1 - ... - vM
 *
 * Component-wise subtraction of M n-dimensional vectors from a. Target is
 * used to store the results.
 * @param {Number[]} a Vector with length n.
 * @param {Number[][]} vectors Array of vectors with length n.
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Resulting vector
 *
 * @example
 * // Returns [7, 4]
 * subAll([9, 9], [ [2, 3], [0, 2] ], new Array(2));
 */
export function subAll(a, vectors, target) {
  if (target) copy(a, target);
  else target = a;
  for (let m = 0; m < vectors.length; m++) {
    for (let n = 0; n < target.length; n++) {
      target[n] -= vectors[m][n];
    }
  }
  return target;
}

/**
 * Component-wise scaling of vector.
 * @param {Number[]} a Vector to scale
 * @param {Number} factor Scaling factor
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Resulting vector
 *
 * @example
 * // Returns [2, 4, 6]
 * scale([1, 2, 3], 2, new Array(3));
 */
export function scale(a, factor, target) {
  if (!target) target = a;
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] * factor;
  }
  return target;
}

/**
 * Computes the sum of squares
 * @param {Number[]} a Target vector
 * @return {Number} Sum of squares
 *
 * @example
 * // Returns 14
 * sumsqr([1, 2, 3]);
 */
export function sumsqr(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] ** 2;
  }
  return sum;
}

/**
 * Computes the magnitude of a vector.
 * @param {Number[]} a Target vector
 * @return {Number} Magnitude of vector
 *
 * @example
 * // Returns 5
 * magnitude([3, 4]);
 */
export function magnitude(a) {
  const sq = sumsqr(a);
  if (sq === 0) return sq;
  return Math.sqrt(sq);
}

/**
 * Normalizes a vector
 * @param {Number[]} a Vector to normalize
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Normalized vector
 *
 * @example
 * // Returns [0, 1, 0]
 * magnitude([0, 10, 0], new Array(3));
 */
export function normalize(a, target) {
  const len = magnitude(a);
  const f = len === 0 ? 0 : 1 / len;
  return scale(a, f, target);
}

/**
 * Get the vector going from b to a.
 * @param {Number[]} a Start coordinates
 * @param {Number[]} b End coordinates
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Vector going from a to b
 *
 * @example
 * // Returns [1, -1]
 * dir([2, 1], [3, 0], new Array(2));
 */
export function dir(a, b, target) {
  if (!target) target = a;
  return sub(b, a, target);
}

/**
 * Calculate the distance between two coordinates.
 * @param {Number[]} a Start coordinates
 * @param {Number[]} b End coordinates
 * @return {Number} Distance between coordinates
 *
 * @example
 * // Returns 5
 * dist([1, 2], [4, 6]);
 */
export function dist(a, b) {
  return magnitude(sub(b, a));
}

/**
 * Calculate the dot product between two vectors.
 * @param {Number[]} a Left operand
 * @param {Number[]} b Right operand
 * @return {Number} Dot product
 *
 * @example
 * // Returns 11
 * dist([1, 2], [3, 4]);
 */
export function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

/**
 * Clamp all values of a vector
 * @param {Number[]} a Values to clamp
 * @param {Number} [min=0] Minimum value (Default: 0)
 * @param {Number} [max=1] Maximum value (Default: 1)
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} Vector with clamped values
 *
 * @example
 * // Returns [1, 1, 2, 2]
 * clamp([0, 1, 2, 3], 1, 2, new Array(4));
 */
export function clamp(a, min, max, target) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  if (!target) target = a;
  for (let i = 0; i < a.length; i++) {
    target[i] = clampNum(a[i], min, max);
  }
  return target;
}


/**
 * GLSL step for all values of a vector
 * @param {Number[]} edges Edges of the step function
 * @param {Number} x Value used to generate the step function
 * @param {Number[]} [target=edges] Target for storing the results (Default: edges)
 * @return {Number[]} results for each value in edges
 *
 * @example
 * // Returns [1, 1, 0, 0]
 * step([0, 1, 2, 3], 1.5, new Array(4));
 */
export function step(edges, x, target) {
  if (!target) target = edges;
  for (let i = 0; i < edges.length; i++) {
    target[i] = stepNum(edges[i], x);
  }
  return target;
}

/**
 * Mix (interpolate) vectors (similar to glsl implementation).
 * @param {Number[]} a Vector to interpolate from
 * @param {Number[]} b Vector to interpolate to
 * @param {Number} t Interpolation parameter, 0 = a and 1 = b
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number[]} The interpolated vector
 *
 * @example
 * // Returns [2, 4]
 * mix([1, 3], [3, 5], 0.5, new Array(2));
 */
export function mix(a, b, t, target) {
  if (!target) target = a;
  for (let i = 0; i < a.length; i++) {
    target[i] = lerp(a[i], b[i], t);
  }
  return target;
}

/**
 * Rounds all values of a vector to a specific amount of digits.
 * @param {Number[]} a Vector to round
 * @param {Number} [digits=1] Number of digits (Default: 1)
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @return {Number} Vector with rounded values
 *
 * @example
 * // Returns [2.1, 1.2]
 * round([2.12, 1.15], 1, new Array(2));
 */
export function round(a, digits, target) {
  if (digits === undefined) digits = 1;
  if (!target) target = a;
  const f = 10 ** digits;
  for (let i = 0; i < a.length; i++) {
    target[i] = Math.round(a[i] * f) / f;
  }
  return target;
}

/**
 * Returns true if all elements of a vector is zero, otherwise returns false.
 * @param {Number[]} a Target vector
 * @param {Number} [epsilon=0] Accepted deviation from 0.00 (Default: 0)
 * @returns {Boolean} Is target zero vector?
 *
 * @example
 * // Returns true
 * isZeroVector([0, 0.000023, 0], 0.001);
 */
export function isZeroVector(a, epsilon) {
  if (epsilon === undefined) epsilon = 0;
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i]) > epsilon) return false;
  }
  return true;
}
