import {
  clamp as clampNum,
  step as stepNum,
} from '@equinor/videx-math';

/**
 * Interface for arrays and vector-like class structures.
 */
export interface VectorLike {
  /**
   * Length of vector-like object.
   */
  length: number,
  /**
   * Numeric indices.
   */
  [index: number]: number,
}

/**
 * Copy the values of one vector to another without creating a new object.
 * @param source Source vector
 * @param target Target vector
 * @returns Target vector as a copy of source
 *
 * @example
 * copy([3, 4], [2, 2]); // Returns: [3, 4]
 */
export function copy<T extends VectorLike>(source: VectorLike, target: T): T {
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
 * @param a Left operand
 * @param b Right operand
 * @param target Target for storing the results (Default: a)
 * @return Resulting vector
 *
 * @example
 * add([1, 2], [3, 4], new Array(2)); // Returns: [4, 6]
 */
export function add<T extends VectorLike>(a: T, b: VectorLike, target: T = a): T {
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
 * @param vectors Array of vectors with length n.
 * @param target Target for storing the results (Default: vectors[0])
 * @return Resulting vector
 *
 * @example
 * addAll([ [1, 2], [3, 4], [5, 6] ], new Array(2)); // Returns: [9, 12]
 */
export function addAll<T extends VectorLike>(vectors: T[], target: T = vectors[0]): T {
  copy(vectors[0], target);
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
 * @param a Left operand
 * @param b Right operand
 * @param target Target for storing the results (Default: a)
 * @return Resulting vector
 *
 * @example
 * sub([4, 3], [2, 1], new Array(2)); // Returns: [2, 2]
 */
export function sub<T extends VectorLike>(a: T, b: VectorLike, target: T = a): T {
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
 * @param a Vector with length n.
 * @param vectors Array of vectors with length n.
 * @param target Target for storing the results (Default: a)
 * @return Resulting vector
 *
 * @example
 * subAll([9, 9], [ [2, 3], [0, 2] ], new Array(2)); // Returns: [7, 4]
 */
export function subAll<T extends VectorLike>(a: T, vectors: VectorLike[], target: T = a): T {
  copy(a, target);
  for (let m = 0; m < vectors.length; m++) {
    for (let n = 0; n < target.length; n++) {
      target[n] -= vectors[m][n];
    }
  }
  return target;
}

/**
 * Component-wise scaling of vector.
 * @param a Vector to scale
 * @param factor Scaling factor
 * @param target Target for storing the results (Default: a)
 * @return Resulting vector
 *
 * @example
 * scale([1, 2, 3], 2, new Array(3)); // Returns: [2, 4, 6]
 */
export function scale<T extends VectorLike>(a: T, factor: number, target: T = a): T {
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] * factor;
  }
  return target;
}

/**
 * Computes the sum of squares
 * @param a Target vector
 * @return Sum of squares
 *
 * @example
 * sumsqr([1, 2, 3]); // Returns: 14
 */
export function sumsqr(a: VectorLike): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] ** 2;
  }
  return sum;
}

/**
 * Computes the magnitude of a vector.
 * @param a Target vector
 * @return Magnitude of vector
 *
 * @example
 * magnitude([3, 4]); // Returns: 5
 */
export function magnitude(a: VectorLike): number {
  const sq = sumsqr(a);
  if (sq === 0) {
    return sq;
  }
  return Math.sqrt(sq);
}

/**
 * Normalizes a vector
 * @param a Vector to normalize
 * @param target Target for storing the results (Default: a)
 * @return Normalized vector
 *
 * @example
 * magnitude([0, 10, 0], new Array(3)); // Returns: [0, 1, 0]
 */
export function normalize<T extends VectorLike>(a: T, target: T = a): T {
  const len = magnitude(a);
  if (len === 0) {
    return fill(0, target);
  }
  else {
    return scale(a, 1 / len, target);
  }
}

/**
 * Fill an array/vector with given value.
 * @param value Value to fill
 * @param target Target for storing the results
 * @returns Filled vector
 *
 * @example
 * fill(1, new Array(3)); // Returns: [1, 1, 1]
 */
export function fill<T extends VectorLike>(value: number, target: T): T {
  for (let i = 0; i < target.length; i++) {
    target[i] = value;
  }
  return target;
}

/**
 * Get the vector going from b to a.
 * @param a Start coordinates
 * @param b End coordinates
 * @param target Target for storing the results (Default: a)
 * @return Vector going from a to b
 *
 * @example
 * dir([2, 1], [3, 0], new Array(2)); // Returns: [1, -1]
 */
export function dir<T extends VectorLike>(a: T, b: VectorLike, target: T = a): T {
  for (let i = 0; i < a.length; i++) {
    target[i] = b[i] - a[i];
  }
  return target;
}

/**
 * Calculate the distance between two coordinates.
 * @param a Start coordinates
 * @param b End coordinates
 * @return Distance between coordinates
 *
 * @example
 * dist([1, 2], [4, 6]); // Returns: 5
 */
export function dist(a: VectorLike, b: VectorLike): number {
  let sq = 0;
  for (let i = 0; i < a.length; i++) {
    sq += (b[i] - a[i]) ** 2;
  }
  if (sq === 0) {
    return sq;
  }
  return Math.sqrt(sq);
}

/**
 * Calculate the dot product between two vectors.
 * @param a Left operand
 * @param b Right operand
 * @return Dot product
 *
 * @example
 * dist([1, 2], [3, 4]); // Returns: 11
 */
export function dot(a: VectorLike, b: VectorLike): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

/**
 * a × b
 *
 * Find cross product of vectors. Only defined for 3d vectors.
 * @param a Left operand (3d vector)
 * @param b Right operand (3d vector)
 * @param target Target for storing the results (Default: a)
 * @return Cross product of vectors
 *
 * @example
 * cross([1, 0, 0], [0, 1, 0]); // Returns: [0, 0, 1]
 */
export function cross<T extends VectorLike>(a: T, b: VectorLike, target: T = a): T {
  const y = (a[2] * b[0]) - (a[0] * b[2]);
  const z = (a[0] * b[1]) - (a[1] * b[0]);
  target[0] = (a[1] * b[2]) - (a[2] * b[1]);
  target[1] = y;
  target[2] = z;
  return target;
}

/**
 * a ∙ b × c
 *
 * Find triple product between three vectors. Only defined for 3d vectors.
 * @param a Left operand for dot product (3d vector)
 * @param b Left operand for cross product (3d vector)
 * @param c Right operand for cross product (3d vector)
 * @return Triple product of vectors
 *
 * @example
 * triple([1, 0, 0], [0, 1, 0], [0, 0, 1]); // Returns: 1
 */
export function triple(a: VectorLike, b: VectorLike, c: VectorLike): number {
  return dot(a, cross(b, c));
}

/**
 * Clamp all values of a vector
 * @param a Values to clamp
 * @param min Minimum value (Default: 0)
 * @param max Maximum value (Default: 1)
 * @param target Target for storing the results (Default: a)
 * @return Vector with clamped values
 *
 * @example
 * clamp([0, 1, 2, 3], 1, 2, new Array(4)); // Returns: [1, 1, 2, 2]
 */
export function clamp<T extends VectorLike>(a: T, min: number = 0, max: number = 1, target: T = a): T {
  for (let i = 0; i < a.length; i++) {
    target[i] = clampNum(a[i], min, max);
  }
  return target;
}


/**
 * GLSL step for all values of a vector
 * @param edges Edges of the step function
 * @param x Value used to generate the step function
 * @param target Target for storing the results (Default: edges)
 * @return results for each value in edges
 *
 * @example
 * step([0, 1, 2, 3], 1.5, new Array(4)); // Returns: [1, 1, 0, 0]
 */
export function step<T extends VectorLike>(edges: T, x: number, target: T = edges): T {
  for (let i = 0; i < edges.length; i++) {
    target[i] = stepNum(edges[i], x);
  }
  return target;
}

/**
 * Mix (interpolate) vectors (similar to glsl implementation).
 * @param a Vector to interpolate from
 * @param b Vector to interpolate to
 * @param t Interpolation parameter, 0 = a and 1 = b
 * @param target Target for storing the results (Default: a)
 * @return The interpolated vector
 *
 * @example
 * mix([1, 3], [3, 5], 0.5, new Array(2)); // Returns: [2, 4]
 */
export function mix<T extends VectorLike>(a: T, b: VectorLike, t: number, target: T = a): T {
  const n = clampNum(t, 0, 1);
  const m = 1 - n;
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] * m + b[i] * n;
  }
  return target;
}

/**
 * Modify each component of a vector with given function.
 * @param a Vector to modify
 * @param modifier Function used to modify component
 * @param target Target for storing the results (Default: a)
 * @return Vector with modified values
 *
 * @example
 * modify([1.12, 1.55], Math.round, new Array(2)); // Returns: [1, 2]
 */
export function modify<T extends VectorLike>(a: T, modifier: (_arg0: number, _arg1: number) => number, target: T = a): T {
  for (let i = 0; i < a.length; i++) {
    target[i] = modifier(a[i], i);
  }
  return target;
}

/**
 * Returns true if all elements of a vector is zero, otherwise returns false.
 * @param a Target vector
 * @param epsilon Accepted deviation from 0.00 (Default: 0)
 * @returns Is target zero vector?
 *
 * @example
 * isZeroVector([0, 0.000023, 0], 0.001); // Returns: true
 */
export function isZeroVector(a: VectorLike, epsilon: number = 0): boolean {
  if (epsilon === undefined) {
    epsilon = 0;
  }
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i]) > epsilon) {
      return false;
    }
  }
  return true;
}

/**
 * Reverses the components of a vector with an performance of O(n/2).
 * @param vector The vector to reverse
 * @returns Reversed vector
 *
 * @example
 * reverse([1, 2, 3]); // Returns: [3, 2, 1]
 */
export function reverse<T extends VectorLike>(vector: T): T {
  const end = vector.length - 1;
  let temp;
  let tempIdx;
  for (let i = 0; i < Math.ceil(end / 2); i++) {
    tempIdx = end - i;
    temp = vector[tempIdx];
    vector[tempIdx] = vector[i]
    vector[i] = temp;
  }
  return vector;
}

/**
 * Flatten a collection of vectors to a single array.
 * @param vectors Array of vectors
 * @return Single array with all values
 *
 * @example
 * flatten([ [1, 2], [3, 4], [5, 6] ]); // Returns [1, 2, 3, 4, 5, 6]
 */
export function flatten(vectors: VectorLike[]): number[] {
  const output = [];
  for (let m: number = 0; m < vectors.length; m++) {
    for (let n: number = 0; n < vectors[m].length; n++) {
      output.push(vectors[m][n]);
    }
  }
  return output;
}

/**
 * Reshapes an array of values to a collection of vectors with given dimensions.
 * @param array Single array with all values
 * @param dimensions Dimensions per vector
 * @return Array of vectors with given dimensions
 *
 * @example
 * reshape([1, 2, 3, 4, 5, 6], 3); // Returns [ [1, 2, 3], [4, 5, 6] ]
 */
export function reshape(array: number[], dimensions: number): number[][] {
  const output = [];
  for (let i = 0; i < array.length; i += dimensions) {
    const vector = new Array(dimensions);
    for (let n = 0; n < dimensions; n++) {
      vector[n] = array[i + n];
    }
    output.push(vector);
  }
  return output;
}

/**
 * Determines if a point lies within a triangle in 2D space.
 * Inspired by: https://stackoverflow.com/a/9755252/5946596
 * @param {VectorLike} p - The point to check [x, y].
 * @param {VectorLike} a - Vertex A of the triangle [x, y].
 * @param {VectorLike} b - Vertex B of the triangle [x, y].
 * @param {VectorLike} c - Vertex C of the triangle [x, y].
 * @param {number} inwardAdjustment - Scales inward adjustment relative to distance for edge handling (default: 1e-6).
 * @returns {boolean} True if the point is strictly inside the triangle; otherwise, false.
 *
 * @example
 * isPointInTriangle([0.25, 0.25], [0, 0], [1, 0], [0, 1]); // Returns true
 */
export function isPointInTriangle(p: VectorLike, a: VectorLike, b: VectorLike, c: VectorLike, inwardAdjustment: number = 1e-6): boolean {
  // Get center of triangle
  const centerX = (a[0] + b[0] + c[0]) * 0.33333;
  const centerY = (a[1] + b[1] + c[1]) * 0.33333;

  // Adjust p towards center based on inwardAdjustment
  const adjPx = p[0] + (centerX - p[0]) * inwardAdjustment;
  const adjPy = p[1] + (centerY - p[1]) * inwardAdjustment;

  // Get PA vector
  const APx = adjPx - a[0];
  const APy = adjPy - a[1];

  // Calculate 2D scalar cross products for AB and AC
  // Positive Values: Point is right of line
  // Negative Values: Point is left of line
  // Value is Zero:   Point is on the line
  const leftOfAB = (b[0] - a[0]) * APy - (b[1] - a[1]) * APx > 0;
  const leftOfAC = (c[0] - a[0]) * APy - (c[1] - a[1]) * APx > 0;

  if (leftOfAB === leftOfAC) {
    return false;
  }

  // Calculate 2D scalar cross product for BC
  const leftOfBC = (c[0] - b[0]) * (adjPy - b[1]) - (c[1] - b[1]) * (adjPx - b[0]) > 0;

  if (leftOfAB !== leftOfBC) {
    return false;
  }

  return true;
}

/**
 * Wrapper function for isPointInTriangle which allows an array of vectors.
 * @returns {boolean} True if the point is strictly inside the triangle; otherwise, false.
 */
export function isPointInTriangleArray(p: VectorLike, triangle: [VectorLike, VectorLike, VectorLike], tolerance: number = 0.0001): boolean {
  return isPointInTriangle(p, triangle[0], triangle[1], triangle[2], tolerance);
}
