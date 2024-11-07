[![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/videx-linear-algebra/badge)](https://scm-compliance-api.radix.equinor.com/repos/equinor/videx-linear-algebra/badge)
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

![Equinor Logo](images/equinor-logo.png)
