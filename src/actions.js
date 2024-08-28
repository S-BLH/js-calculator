 // src/actions.js
export const ADD_DIGIT = 'ADD_DIGIT';
export const ADD_OPERATOR = 'ADD_OPERATOR';
export const SET_DECIMAL = 'SET_DECIMAL';
export const CALCULATE = 'CALCULATE';
export const CLEAR = 'CLEAR';

export const addDigit = (digit) => ({ type: ADD_DIGIT, payload: digit });
export const addOperator = (operator) => ({ type: ADD_OPERATOR, payload: operator });
export const setDecimal = () => ({ type: SET_DECIMAL });
export const calculate = () => ({ type: CALCULATE });
export const clear = () => ({ type: CLEAR });
