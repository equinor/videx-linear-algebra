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
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#add">add</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#addall">addAll</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#clamp">clamp</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#copy">copy</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#cross">cross</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#dir">dir</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#dist">dist</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#dot">dot</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#flatten">flatten</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#iszerovector">isZeroVector</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#magnitude">magnitude</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#mix">mix</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#normalize">normalize</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#reshape">reshape</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#round">round</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#scale">scale</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#step">step</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#sub">sub</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#suball">subAll</a></td>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#sumsqr">sumsqr</a></td>
  </tr>
  <tr>
    <td><a href="https://equinor.github.io/videx-linear-algebra/modules/_index_.html#triple">triple</a></td>
  </tr>
</table>

<br/>

![Equinor Logo](images/equinor-logo.png)
