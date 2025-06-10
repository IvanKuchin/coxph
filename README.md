# coxph

Cox proportional hazards model implementation in JavaScript (Node.js or browser). This package provides a simple univariate Cox proportional hazards model for survival analysis, along with example usage.

## Features
- Univariate Cox proportional hazards model for binary covariates
- p-value calculation
- No dependencies

## Installation

Clone this repository and install dependencies (if any):

```bash
git clone https://github.com/IvanKuchin/coxph
cd coxph
# No dependencies required for core usage
```

## API

### `coxphFit(T, E, X, maxIter = 50, tol = 1e-6)`
- `T`: Array of times
- `E`: Array of event indicators (0 = censored, 1 = event)
- `X`: Array of binary covariate (0 = Group 1, 1 = Group 2)
- Returns: `{ coef, se, hr, coef_lower, coef_upper }`

### `pValue(coef, se)`
- Returns the p-value for the coefficient and its standard error.


## Usage

### Browser Example

You can use the Cox proportional hazards model directly in the browser by including the module files and using ES6 imports. Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CoxPH Browser Example</title>
</head>
<body>
  <script type="module">
    import { coxphFit } from './module/cox-univariate.js';
    import { pValue } from './module/p-value.js';

    // Example data
    const T = [5, 6, 6, 7, 10, 13, 16, 22, 23, 6, 9, 10, 11, 17, 19, 20, 25, 32, 32, 34, 35];
    const E = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const X = Array(T.length).fill(0);

    const result = coxphFit(T, E, X);
    console.log(result);
    const p = pValue(result.coef, result.se);
    console.log(`p-value: ${p}`);
  </script>
</body>
</html>
```

Make sure to serve your project with a local web server (not via `file://`) to allow ES6 module imports.

### 1. Simple Example

This example demonstrates fitting a Cox model to two groups with survival data:

Run with:
```bash
node examples/1_simple.js
```

### 2. Advanced Example

This example simulates two groups (with and without surgery) and fits the Cox model:

Run with:
```bash
node examples/2_advanced.js
```

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

