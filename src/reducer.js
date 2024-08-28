// src/reducer.js
import { ADD_DIGIT, ADD_OPERATOR, SET_DECIMAL, CALCULATE, CLEAR } from './actions';

const initialState = {
  display: '0',
  expression: ''
};

// Define operators array at the top
const operators = ['+', '-', '*', '/'];

const cleanInput = (input) => {
  // Replace multiple operators with the last one, preserving negative numbers
  return input.replace(/([+\-*/])\s*-/g, '$1 -')
              .replace(/([+\-*/])\s*([+*/])/g, '$2');
};

const calculateResult = (expression) => {
  try {
    // Clean the input before evaluation
    const cleanedExpression = cleanInput(expression);
    // Use Function constructor for safe evaluation
    return new Function('return ' + cleanedExpression)().toString();
  } catch {
    return 'Error';
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGIT:
      // Handle digit addition
      const newDigit = action.payload;
      return {
        ...state,
        display: state.display === '0' ? newDigit : state.display + newDigit,
        expression: state.expression === '0' ? newDigit : state.expression + newDigit
      };

    case ADD_OPERATOR:
      const lastChar = state.expression.slice(-1);

      if (operators.includes(lastChar)) {
        // If the last character is an operator, replace it with the new one
        if (action.payload === '-') {
          // Special handling for negative sign if lastChar is an operator or expression is empty
          return {
            ...state,
            expression: state.expression + ' ' + action.payload
          };
        } else {
          return {
            ...state,
            expression: state.expression.slice(0, -1) + ' ' + action.payload + ' '
          };
        }
      }

      // Append the operator if it's not consecutive
      return {
        ...state,
        expression: state.expression + ' ' + action.payload + ' '
      };

    case SET_DECIMAL:
      // Add decimal point if there isn't one already in the current number
      const lastNumber = state.expression.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes('.')) {
        return {
          ...state,
          display: state.display + '.',
          expression: state.expression + '.'
        };
      }
      return state;

    case CALCULATE:
      // Use the cleanInput function to handle multiple operators and negative numbers
      const cleanedExpression = cleanInput(state.expression);

      // Handle cases where there's a trailing operator
      const finalExpression = operators.includes(cleanedExpression.slice(-1))
        ? cleanedExpression.slice(0, -1)
        : cleanedExpression;

      const result = calculateResult(finalExpression);

      return {
        ...state,
        display: result,
        expression: result
      };

    case CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default reducer;