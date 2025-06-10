// Cox Proportional Hazards for a single binary covariate (Group2_T)
// T: array of times, E: array of events (1=event, 0=censored), X: array of covariate (0/1)

export function coxphFit(T, E, X, maxIter = 50, tol = 1e-6) {
  // Sort by time ascending
  const n = T.length;
  let idx = Array.from({ length: n }, (_, i) => i);
  idx.sort((a, b) => T[a] - T[b]);
  T = idx.map(i => T[i]);
  E = idx.map(i => E[i]);
  X = idx.map(i => X[i]);

  // Newton-Raphson for single covariate
  let beta = 0;
  for (let iter = 0; iter < maxIter; iter++) {
    let score = 0, info = 0;
    for (let i = 0; i < n; i++) {
      if (E[i] === 1) {
        let riskset = 0, risksetX = 0, risksetXX = 0;
        for (let j = i; j < n; j++) {
          const expbx = Math.exp(beta * X[j]);
          riskset += expbx;
          risksetX += expbx * X[j];
          risksetXX += expbx * X[j] * X[j];
        }
        score += X[i] - (risksetX / riskset);
        info += (risksetXX / riskset) - Math.pow(risksetX / riskset, 2);
      }
    }
    const delta = score / info;
    beta += delta;
    if (Math.abs(delta) < tol) break;
  }

  // Standard error
  let info = 0;
  for (let i = 0; i < n; i++) {
    if (E[i] === 1) {
      let riskset = 0, risksetX = 0, risksetXX = 0;
      for (let j = i; j < n; j++) {
        const expbx = Math.exp(beta * X[j]);
        riskset += expbx;
        risksetX += expbx * X[j];
        risksetXX += expbx * X[j] * X[j];
      }
      info += (risksetXX / riskset) - Math.pow(risksetX / riskset, 2);
    }
  }
  const se = 1 / Math.sqrt(info);

  // Hazard ratio
  const hr = Math.exp(beta);

  // Confidence intervals (Wald)
  const z = 1.96;
  const coef_lower = Math.exp(beta - z * se);
  const coef_upper = Math.exp(beta + z * se);

  // const p = wald_stat(beta, se);

  return {
    coef: beta,
    se: se,
    // p: p,
    hr: hr,
    coef_lower: coef_lower,
    coef_upper: coef_upper,
    // For ph, median, etc., more code is needed
  };
}

function wald_stat(coef, se) {
  if (se === 0) return Infinity; // Avoid division by zero
  return coef / se;
}

