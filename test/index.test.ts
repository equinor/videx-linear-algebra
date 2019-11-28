/* eslint-disable no-undef */
import {
  copy,
  add,
  addAll,
  sub,
  subAll,
  scale,
  sumsqr,
  magnitude,
  normalize,
  dir,
  dist,
  dot,
  cross,
  triple,
  clamp,
  step,
  mix,
  modify,
  isZeroVector,
  reverse,
  flatten,
  reshape,
  VectorLike,
} from '../src/index';

// import Vector2 from '@equinor/videx-vector2';

const Vector2 = require('@equinor/videx-vector2');

function VectorLikeComparison(a: VectorLike, b: VectorLike) {
  for(let i = 0; i < a.length; i++) {
    expect(a[i]).toBe(b[i]);
  }
}

test('copy', () => {
  const a = [3, 4];
  const b = [2, 2];
  copy(a, b);
  expect(a).toEqual([3, 4]);
  expect(b).toEqual([3, 4]);
});

test('add', () => {
  expect(add([1, 2], [3, 4], new Array(2))).toEqual([4, 6]);
  expect(add([1, 2, 3], [3, 4, 5], new Array(3))).toEqual([4, 6, 8]);

  // Vector2
  VectorLikeComparison(
    add(
      new Vector2(1, 2),
      new Vector2(3, 4),
      Vector2.zero,
    ),
    [4, 6],
  );

  // Mutate
  const a = [1, 2];
  add(a, [3, 4]);
  expect(a).toEqual([4, 6]);
});

test('addAll', () => {
  const a = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  expect(addAll(a, new Array(2))).toEqual([9, 12]);

  // Mutate
  const first = a[0];
  addAll(a);
  expect(first).toEqual([9, 12]);
});

test('sub', () => {
  expect(sub([4, 3], [2, 1], new Array(2))).toEqual([2, 2]);
  expect(sub([6, 5, 4], [3, 2, 1], new Array(3))).toEqual([3, 3, 3]);

  // Mutate
  const a = [4, 3];
  sub(a, [2, 1]);
  expect(a).toEqual([2, 2]);
});

test('subAll', () => {
  const a = [9, 9];
  const vectors = [
    [2, 3],
    [0, 2],
  ];
  expect(subAll(a, vectors, new Array(2))).toEqual([7, 4]);

  // Mutate
  subAll(a, vectors);
  expect(a).toEqual([7, 4]);
});

test('scale', () => {
  expect(scale([1, 2, 3], 2, new Array(2))).toEqual([2, 4, 6]); // Multiply
  expect(scale([2, 4, 6], 1 / 2, new Array(2))).toEqual([1, 2, 3]); // Divide

  // Mutate
  const a = [1, 2, 3];
  scale(a, 2);
  expect(a).toEqual([2, 4, 6]);
});

test('sumsqr', () => {
  expect(sumsqr([1, 2, 3])).toEqual(14);
  expect(sumsqr([3, 1])).toEqual(10);
});

test('magnitude', () => {
  expect(magnitude([3, 4])).toEqual(5);
  expect(magnitude([2, 0])).toEqual(2);
});

test('normalize', () => {
  expect(normalize([0, 10, 0], new Array(3))).toEqual([0, 1, 0]);

  // Test for zero length
  expect(normalize([0, 0, 0], new Array(3))).toEqual([0, 0, 0]);

  // Mutate
  const a = [0, 10, 0];
  normalize(a);
  expect(a).toEqual([0, 1, 0]);
});

test('dir', () => {
  expect(dir([2, 1], [3, 0], new Array(2))).toEqual([1, -1]);

  // Mutate
  const a = [2, 1];
  dir(a, [3, 0]);
  expect(a).toEqual([1, -1]);
});

test('dist', () => {
  expect(dist([1, 2], [4, 6])).toEqual(5);
  expect(dist([-3, 0], [3, 0])).toEqual(6);
});

test('dot', () => {
  expect(dot([1, 2], [3, 4])).toEqual(11);
});

test('cross', () => {
  expect(cross([1, 0, 0], [0, 1, 0], new Array(3))).toEqual([0, 0, 1]);

  // Mutate
  const a = [1, 0, 0];
  cross(a, [0, 1, 0]);
  expect(a).toEqual([0, 0, 1]);
});

test('triple', () => {
  expect(triple([1, 0, 0], [0, 1, 0], [0, 0, 1])).toEqual(1);
});

test('clamp', () => {
  expect(clamp([0, 1, 2, 3], 1, 2, new Array(4))).toEqual([1, 1, 2, 2]);
  expect(clamp([4, 11], 0, 10, new Array(2))).toEqual([4, 10]);

  // Mutate
  const a = [0, 1, 2, 3];
  clamp(a, 1, 2);
  expect(a).toEqual([1, 1, 2, 2]);
});

test('step', () => {
  expect(step([0, 1, 2, 3], 1.5, new Array(4))).toEqual([1, 1, 0, 0]);

  // Mutate
  const a = [0, 1, 2, 3];
  step(a, 1.5);
  expect(a).toEqual([1, 1, 0, 0]);
});

test('mix', () => {
  expect(mix([1, 3], [3, 5], 0.5, new Array(2))).toEqual([2, 4]);
  expect(mix([1, 2, 3], [5, 6, 7], 0.25, new Array(3))).toEqual([2, 3, 4]);

  // Mutate
  const a = [1, 3];
  mix(a, [3, 5], 0.5);
  expect(a).toEqual([2, 4]);
});

test('modify', () => {
  expect(
    modify([1.12, 1.55], Math.round, new Array(2)),
  ).toEqual([1, 2]);

  expect(
    modify(
      [0.75, 0.1, 0.3],
      d => 1.0 - d,
      new Array(3),
    ),
  ).toEqual([0.25, 0.9, 0.7]);

  // Using index
  expect(
    modify(
      [0.75, 0.1, 0.3],
      (d, i) => d + i,
      new Array(3),
    ),
  ).toEqual([0.75, 1.1, 2.3]);

  // Mutate
  const a = [1.12, 1.55];
  modify(a, Math.round);
  expect(a).toEqual([1, 2]);
});

test('isZeroVector', () => {
  expect(isZeroVector([0, 0.000023, 0], 0.001)).toBeTruthy();
  expect(isZeroVector([0, 0.000023, 0], 0.00001)).toBeFalsy();
});

test('reverse', () => {
  expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  expect(reverse([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);

  // Vector2
  VectorLikeComparison(
    reverse(
      new Vector2(1, 2)
    ),
    [2, 1],
  );
});

test('flatten', () => {
  expect(flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);

  // Vector2
  VectorLikeComparison(
    flatten([
      new Vector2(1, 2),
      new Vector2(3, 4),
      new Vector2(5, 6),
    ]),
    [1, 2, 3, 4, 5, 6],
  );
});

test('reshape', () => {
  expect(reshape([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  expect(reshape([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
});
