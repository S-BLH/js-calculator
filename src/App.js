// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDigit, addOperator, setDecimal, calculate, clear } from './actions';

const App = () => {
  const display = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const handleClick = (value) => {
    if (value === '=') {
      dispatch(calculate());
    } else if (['+', '-', '*', '/'].includes(value)) {
      dispatch(addOperator(value));
    } else if (value === 'AC') {
      dispatch(clear());
    } else if (value === '.') {
      dispatch(setDecimal());
    } else if (!isNaN(value)) {
      dispatch(addDigit(value));
    }
  };

  return (
    <div>
      <div className="calculator">
        <div className="display" id="display">{display}</div>
        <button id="clear" onClick={() => handleClick('AC')}>AC</button>
        <button id="divide" onClick={() => handleClick('/')}>/</button>
        <button id="multiply" onClick={() => handleClick('*')}>x</button>
        <button id="seven" onClick={() => handleClick('7')}>7</button>
        <button id="eight" onClick={() => handleClick('8')}>8</button>
        <button id="nine" onClick={() => handleClick('9')}>9</button>
        <button id="subtract" onClick={() => handleClick('-')}>-</button>
        <button id="four" onClick={() => handleClick('4')}>4</button>
        <button id="five" onClick={() => handleClick('5')}>5</button>
        <button id="six" onClick={() => handleClick('6')}>6</button>
        <button id="add" onClick={() => handleClick('+')}>+</button>
        <button id="one" onClick={() => handleClick('1')}>1</button>
        <button id="two" onClick={() => handleClick('2')}>2</button>
        <button id="three" onClick={() => handleClick('3')}>3</button>
        <button id="equals" onClick={() => handleClick('=')}>=</button>
        <button id="zero" onClick={() => handleClick('0')}>0</button>
        <button id="decimal" onClick={() => handleClick('.')}>.</button>
      </div>
      <div className="footer">
        Designed and Coded By<br />
        Sumita Balouch
      </div>
    </div>
  );
};

export default App;