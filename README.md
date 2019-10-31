# Videx linear algebra

A library with linear algebra used by Videx. Functions are designed with performance in mind, where a target vector can be used to avoid creating new objects.

- [GitHub Repository](https://github.com/equinor/videx-linear-algebra)
- [Documentation](https://equinor.github.io/videx-linear-algebra)

## Installation
```js
npm install --save @equinor/videx-linear-algebra
```

## Usage

```js
// ES6
import { add, scale, ... } from '@equinor/videx-linear-algebra';

// ObservableHQ
const someVar = require('@equinor/videx-linear-algebra@X.X.X/dist/bundle.umd.js');
const add = someVar.add;
```
Where X.X.X is desired version number.

## Available functions

<table style="width:auto;">
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#add">add</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#clamp">clamp</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#dir">dir</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#dist">dist</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#dot">dot</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#isZeroVector">isZeroVector</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#magnitude">magnitude</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#mix">mix</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#normalize">normalize</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#round">round</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#scale">scale</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#step">step</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#sub">sub</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/global.html#sumsqr">sumsqr</a></td>
  </tr>
</table>

<br/>

![Equinor Logo](images/equinor-logo.png)
