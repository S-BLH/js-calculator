// src/reducer.js

import {
    ADD_DIGIT,
    ADD_OPERATOR,
    SET_DECIMAL,
    CALCULATE,
    CLEAR,
  } from './actions';
  
  const initialState = {
    display: '0',
    expression: '',
  };
  
  // Define operators array at the top
  const operators = ['+', '-', '*', '/'];
  
  const cleanInput = (input) => input
    .replace(/([+\-*/])\s*-/g, '$1 -')
    .replace(/([+\-*/])\s*([+*/])/g, '$2');
  
  const calculateResult = (expression) => {
    try {
      const cleanedExpression = cleanInput(expression);
      // eslint-disable-next-line no-new-func
      return new Function(`return ${cleanedExpression}`)().toString();
    } catch {
      return 'Error';
    }
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DIGIT: {
        const newDigit = action.payload;
        return {
          ...state,
          display: state.display === '0' ? newDigit : state.display + newDigit,
          expression: state.expression === '0' ? newDigit : state.expression + newDigit,
        };
      }
  
      case ADD_OPERATOR: {
        const lastChar = state.expression.slice(-1);
  
        if (operators.includes(lastChar)) {
          if (action.payload === '-') {
            return {
              ...state,
              expression: `${state.expression} ${action.payload}`,
            };
          }
  
          return {
            ...state,
            expression: `${state.expression.slice(0, -1)} ${action.payload} `,
          };
        }
  
        return {
          ...state,
          expression: `${state.expression} ${action.payload} `,
        };
      }
  
      case SET_DECIMAL: {
        const lastNumber = state.expression.split(/[+\-*/]/).pop();
        if (!lastNumber.includes('.')) {
          return {
            ...state,
            display: `${state.display}.`,
            expression: `${state.expression}.`,
          };
        }
        return state;
      }
  
      case CALCULATE: {
        const cleanedExpression = cleanInput(state.expression);
  
        const finalExpression = operators.includes(cleanedExpression.slice(-1))
          ? cleanedExpression.slice(0, -1)
          : cleanedExpression;
  
        const result = calculateResult(finalExpression);
  
        return {
          ...state,
          display: result,
          expression: result,
        };
      }
  
      case CLEAR:
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default reducer;