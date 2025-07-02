import * as cox from '../modules/cox-univariate.js';
import * as pValue from '../modules/p-value.js';

function initData() {
    const T = [];
    const E = [];
    const X = [];

    // Group 1: no surgery
    const months1 = [70, 40, 19, 47, 34, 78, 11, 18, 24, 17, 11, 14, 40, 7, 18, 22, 24, 45, 18, 8, 8, 2, 48, 4, 3, 23, 12, 7, 11, 15, 16, 12, 10, 5, 4, 4, 1, 12, 0];
    const status1 = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1];
    for (let i = 0; i < months1.length; i++) {
        T.push(months1[i]);
        E.push(status1[i]);  // Event occurred (1 = event, 0 = censored)
        X.push(0);  // Group 1
    }

    // Group 2: with surgery
    const months2 = [10, 20, 45, 27, 68, 69, 65, 22, 12, 24, 1, 58, 25, 62, 22, 35, 16, 39, 19, 9, 10, 46, 14, 15, 43, 38, 44, 18, 14, 23, 15, 31, 9, 19, 10, 22, 56, 6, 79, 40, 18, 23, 19, 48, 77, 9, 26, 17, 52, 22, 3, 27, 10, 32, 4, 5, 59, 9, 24, 21, 58, 46, 23, 28, 23, 55, 26, 20, 20, 52, 50, 50, 13, 0, 11, 33, 8, 15, 19, 9, 7, 42, 28, 13, 21, 34, 9, 28, 18, 31, 18, 16, 23, 22, 11, 10, 2, 22, 21, 21, 20, 28, 1, 18, 9, 12, 12, 17, 17, 17, 17, 12, 15, 15, 15, 13, 5, 2, 8, 35, 7, 33, 1, 9, 4, 12, 10, 26, 12, 0, 7, 10, 20, 19, 19, 17, 3, 15];
    const status2 = [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0];
    for (let i = 0; i < months2.length; i++) {
        T.push(months2[i]);
        E.push(status2[i]);  // Event occurred (1 = event, 0 = censored)
        X.push(1);  // Group 2
    }
    return { T: T, E: E, X: X };
}


console.debug("array length: ", initData().T.length);


const { T, E, X } = initData();
const result = cox.coxphFit(T, E, X);
console.debug(result);

const p = pValue.pValue(result.coef, result.se);
console.debug(`p-value: ${p}`); // Output the p-value

