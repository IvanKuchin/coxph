import * as cox from '../modules/cox-univariate.js';
import * as pValue from '../modules/p-value.js';

function initData() {
    const T = [];
    const E = [];
    const X = [];

    // Group 1: no surgery
    const deaths1 = [0, 11, 22, 33, 44];
    const months = [1, 2, 3, 4, 5];
    for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < deaths1[i]; j++) {
            T.push(months[i]);
            E.push(1);  // Event occurred (1 = event, 0 = censored)
            X.push(0);  // Group 1
        }
    }

    // Group 2: with surgery
    const deaths2 = [10, 20, 30, 40, 50];
    for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < deaths2[i]; j++) {
            T.push(months[i]);
            E.push(1);  // Event occurred (1 = event, 0 = censored)
            X.push(1);  // Group 2
        }
    }
    return { T: T, E: E, X: X };
}


const { T, E, X } = initData();
const result = cox.coxphFit(T, E, X);
console.debug(result);

const p = pValue.pValue(result.coef, result.se);
console.debug(`p-value: ${p}`); // Output the p-value

