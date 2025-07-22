// 引入react核心库
import React from 'react';
// 引入ReactDOM
// 18版本之前引入：import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
