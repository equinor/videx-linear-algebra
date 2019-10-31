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
  clamp,
  step,
  mix,
  round,
  isZeroVector,
  flatten,
  reshape,
} from '../src/index';

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

test('round', () => {
  expect(round([2.12, 1.15], 1, new Array(2))).toEqual([2.1, 1.2]);
  expect(round([Math.PI, Math.E], 2, new Array(2))).toEqual([3.14, 2.72]);

  // Mutate
  const a = [2.12, 1.15];
  round(a, 1);
  expect(a).toEqual([2.1, 1.2]);
});

test('isZeroVector', () => {
  expect(isZeroVector([0, 0.000023, 0], 0.001)).toBeTruthy();
  expect(isZeroVector([0, 0.000023, 0], 0.00001)).toBeFalsy();
});

test('flatten', () => {
  expect(flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
});

test('reshape', () => {
  expect(reshape([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  expect(reshape([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
});
