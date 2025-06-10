import * as cox from '../module/cox-univariate.js';
import * as pValue from '../module/p-value.js';

function initData() {
    const T1 = [6, 6, 6, 7, 10, 13, 16, 22, 23, 6, 9, 10, 11, 17, 19, 20, 25, 32, 32, 34, 35];
    const E1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const X1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


    const T2 = [1, 1, 2, 2, 3, 4, 4, 5, 5, 8, 8, 8, 8, 11, 11, 12, 12, 15, 17, 22, 23];
    const E2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const X2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const T = T1.concat(T2);
    const E = E1.concat(E2);
    const X = X1.concat(X2);

    return { T: T, E: E, X: X };
}

const { T, E, X } = initData();
const result = cox.coxphFit(T, E, X);
console.debug(result);

const p = pValue.pValue(result.coef, result.se);
console.debug(`p-value: ${p}`); // Output the p-value

