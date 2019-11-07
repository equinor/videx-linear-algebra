import {
  clamp as clampNum,
  step as stepNum,
} from '@equinor/videx-math';

/**
 * Copy the values of one vector to another without creating a new object.
 * @param source Source vector
 * @param target Target vector
 * @returns Target vector as a copy of source
 *
 * @example
 * copy([3, 4], [2, 2]); // Returns [3, 4]
 */
export function copy(source: any, target: any): any {
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
 * add([1, 2], [3, 4], new Array(2)); // Returns [4, 6]
 */
export function add(a: any, b: any, target: any = a): any {
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
 * addAll([ [1, 2], [3, 4], [5, 6] ], new Array(2)); // Returns [9, 12]
 */
export function addAll(vectors: any[], target: any = vectors[0]): any {
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
 * sub([4, 3], [2, 1], new Array(2)); // Returns [2, 2]
 */
export function sub(a: any, b: any, target: any = a): any {
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
 * subAll([9, 9], [ [2, 3], [0, 2] ], new Array(2)); // Returns [7, 4]
 */
export function subAll(a: any, vectors: any[], target: any = a): any {
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
 * scale([1, 2, 3], 2, new Array(3)); // Returns [2, 4, 6]
 */
export function scale(a: any, factor: number, target: any = a): any {
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
 * sumsqr([1, 2, 3]); // Returns 14
 */
export function sumsqr(a: any): number {
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
 * magnitude([3, 4]); // Returns 5
 */
export function magnitude(a: any): number {
  const sq = sumsqr(a);
  if (sq === 0) return sq;
  return Math.sqrt(sq);
}

/**
 * Normalizes a vector
 * @param a Vector to normalize
 * @param target Target for storing the results (Default: a)
 * @return Normalized vector
 *
 * @example
 * magnitude([0, 10, 0], new Array(3)); // Returns [0, 1, 0]
 */
export function normalize(a: any, target: any = a): any {
  const len = magnitude(a);
  const f = len === 0 ? 0 : 1 / len;
  return scale(a, f, target);
}

/**
 * Get the vector going from b to a.
 * @param a Start coordinates
 * @param b End coordinates
 * @param target Target for storing the results (Default: a)
 * @return Vector going from a to b
 *
 * @example
 * dir([2, 1], [3, 0], new Array(2)); // Returns [1, -1]
 */
export function dir(a: any, b: any, target: any = a): any {
  return sub(b, a, target);
}

/**
 * Calculate the distance between two coordinates.
 * @param a Start coordinates
 * @param b End coordinates
 * @return Distance between coordinates
 *
 * @example
 * dist([1, 2], [4, 6]); // Returns 5
 */
export function dist(a: any, b: any): number {
  let sq = 0;
  for (let i = 0; i < a.length; i++) {
    sq += (b[i] - a[i]) ** 2;
  }
  if (sq === 0) return sq;
  return Math.sqrt(sq);
}

/**
 * Calculate the dot product between two vectors.
 * @param a Left operand
 * @param b Right operand
 * @return Dot product
 *
 * @example
 * dist([1, 2], [3, 4]); // Returns 11
 */
export function dot(a: any, b: any): number {
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
 * cross([1, 0, 0], [0, 1, 0]); // Returns [0, 0, 1]
 */
export function cross(a: any, b: any, target: any = a): any {
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
 * triple([1, 0, 0], [0, 1, 0], [0, 0, 1]); // Returns 1
 */
export function triple(a: any, b: any, c: any): number {
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
 * clamp([0, 1, 2, 3], 1, 2, new Array(4)); // Returns [1, 1, 2, 2]
 */
export function clamp(a: any, min: number = 0, max: number = 1, target: any = a): any {
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
 * step([0, 1, 2, 3], 1.5, new Array(4)); // Returns [1, 1, 0, 0]
 */
export function step(edges: any, x: number, target: any = edges): any {
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
 * mix([1, 3], [3, 5], 0.5, new Array(2)); // Returns [2, 4]
 */
export function mix(a: any, b: any, t: number, target: any = a): any {
  const n = clamp(t, 0, 1);
  const m = 1 - n;
  for (let i = 0; i < a.length; i++) {
    target[i] = a[i] * m + b[i] * n;
  }
  return target;
}

/**
 * Rounds all values of a vector to a specific amount of digits.
 * @param a Vector to round
 * @param digits Number of digits (Default: 1)
 * @param target Target for storing the results (Default: a)
 * @return Vector with rounded values
 *
 * @example
 * round([2.12, 1.15], 1, new Array(2)); // Returns [2.1, 1.2]
 */
export function round(a: any, digits: number = 1, target: any = a): number {
  const f = 10 ** digits;
  for (let i = 0; i < a.length; i++) {
    target[i] = Math.round(a[i] * f) / f;
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
 * isZeroVector([0, 0.000023, 0], 0.001); // Returns true
 */
export function isZeroVector(a: any, epsilon: number = 0): boolean {
  if (epsilon === undefined) epsilon = 0;
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i]) > epsilon) return false;
  }
  return true;
}

/**
 * Flatten a collection of vectors to a single array.
 * @param vectors Array of vectors
 * @return Single array with all values
 *
 * @example
 * flatten([ [1, 2], [3, 4], [5, 6] ]); // Returns [1, 2, 3, 4, 5, 6]
 */
export function flatten(vectors: number[][]): number[] {
  const output = [];
  for (let m = 0; m < vectors.length; m++) {
    for (let n = 0; n < vectors[m].length; n++) {
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
